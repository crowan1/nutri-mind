<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class PasswordResetTest extends TestCase
{
    use RefreshDatabase;

    // The whole flow used to die on BadMethodCallException: the User model was
    // missing Notifiable, and the password broker reaches for notify(). Nothing
    // covered this route, so the suite stayed green while the feature was dead.
    public function test_a_reset_link_is_sent_to_a_known_address(): void
    {
        Notification::fake();
        $user = User::factory()->create();

        $this->postJson('/api/forgot-password', ['email' => $user->email])
            ->assertOk();

        Notification::assertSentTo($user, ResetPassword::class);
    }

    // Faking a notification never renders it, which is how the broken reset
    // URL survived the test above: building the mail is the only thing that
    // reaches createUrlUsing.
    public function test_the_mail_links_back_into_the_spa(): void
    {
        Notification::fake();
        config(['app.frontend_url' => 'http://front.test']);
        $user = User::factory()->create(['email' => 'lien@example.test']);

        $this->postJson('/api/forgot-password', ['email' => $user->email])->assertOk();

        Notification::assertSentTo($user, ResetPassword::class, function ($notification) use ($user) {
            $url = $notification->toMail($user)->actionUrl;

            return str_starts_with($url, 'http://front.test/reset-password?token=')
                && str_contains($url, 'email=lien%40example.test');
        });
    }

    public function test_an_unknown_address_is_refused(): void
    {
        Notification::fake();

        $this->postJson('/api/forgot-password', ['email' => 'inconnu@example.test'])
            ->assertStatus(422);

        Notification::assertNothingSent();
    }

    public function test_the_password_can_be_reset_with_the_emailed_token(): void
    {
        Notification::fake();
        $user = User::factory()->create();

        $this->postJson('/api/forgot-password', ['email' => $user->email])->assertOk();

        $token = null;
        Notification::assertSentTo($user, ResetPassword::class, function ($notification) use (&$token) {
            $token = $notification->token;

            return true;
        });

        $this->postJson('/api/reset-password', [
            'token' => $token,
            'email' => $user->email,
            'password' => 'Nouveau!2026pass',
            'password_confirmation' => 'Nouveau!2026pass',
        ])->assertOk();

        $this->assertTrue(Hash::check('Nouveau!2026pass', $user->fresh()->password));
    }

    public function test_a_forged_token_is_refused(): void
    {
        $user = User::factory()->create();

        $this->postJson('/api/reset-password', [
            'token' => 'jeton-invente',
            'email' => $user->email,
            'password' => 'Nouveau!2026pass',
            'password_confirmation' => 'Nouveau!2026pass',
        ])->assertStatus(422);
    }
}
