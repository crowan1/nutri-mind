import { capitalize, formatDuration } from '../../utils/Format'

export default function RecipeCard({
    recipe = {},
    badgeText = "Anti-gaspi",
    ownedIngredients = 4, // faudra update ça quand l'inventaire de chaque user sera set up
    totalIngredients = 6, // pareil
    onViewClick = () => { },
    imageSrc = ""
}) {
    const { name, duration, peopleNb, difficulty, description, tags } = recipe;

    const percentage = totalIngredients > 0
        ? Math.round((ownedIngredients / totalIngredients) * 100)
        : 0;

    return (
        <div className="w-[320px] bg-white rounded-3xl p-5 shadow-sm border border-line font-sans flex flex-col justify-between transition-all hover:shadow-md">
            {/* Zone supérieure (Header / Badge / Image) */}
            <div className="relative min-h-[140px] mb-4 rounded-2xl overflow-hidden bg-mint">
                {imageSrc && (
                    <img
                        src={imageSrc}
                        alt={name}
                        className="w-full h-full object-cover absolute inset-0"
                    />
                )}
                {/* Badge Anti-gaspi */}
                <div className="absolute top-0 left-0">
                    <span className="inline-block bg-brand text-white text-xs font-medium px-3.5 py-1.5 rounded-full shadow-sm">
                        {badgeText}
                    </span>
                </div>
            </div>

            {/* Contenu principal */}
            <div className="flex-1">
                {/* Titre */}
                <h2 className="text-xl font-semibold text-ink mb-3 tracking-tight">
                    {name}
                </h2>

                {/* Métadonnées : Temps, Portions, Difficulté */}
                <div className="flex items-center gap-6 text-xs font-medium text-muted mb-3">
                    <span>{formatDuration(duration)}</span>
                    <span>{peopleNb} pers.</span>
                    <span>{capitalize(difficulty)}</span>
                </div>

                {description && (
                    <p className="text-xs text-muted leading-relaxed mb-4">
                        {description}
                    </p>
                )}

                <div className="flex flex-wrap gap-1.5 mb-5">
                    {tags && tags.length > 0 && tags.map((tag) => (
                        <span
                            key={tag.id}
                            className="inline-block bg-mint text-ink text-xs px-3 py-1 rounded-full border border-line font-medium"
                        >
                            {capitalize(tag.name)}
                        </span>
                    ))}
                </div>

            </div>

            {/* Séparateur & Pied de carte */}
            <div className="pt-3 border-t border-line flex items-end justify-between">
                {/* Section Ingrédients & Barre de progression */}
                <div className="flex flex-col gap-1.5 flex-1 pr-4">
                    <p className="text-xs text-muted">
                        <span className="text-brand font-bold">{ownedIngredients}/{totalIngredients}</span> ingrédients chez vous
                    </p>

                    {/* Barre de progression */}
                    <div className="w-32 h-1.5 bg-brand-soft rounded-full overflow-hidden">
                        <div
                            className="h-full bg-brand rounded-full transition-all duration-300"
                            style={{ width: `${percentage}%` }}
                        />
                    </div>
                </div>

                {/* Bouton Voir */}
                <button
                    onClick={onViewClick}
                    className="text-brand font-medium text-sm hover:underline focus:outline-none"
                >
                    Voir
                </button>
            </div>
        </div>
    );
}
