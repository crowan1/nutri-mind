import { fileURLToPath } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// A Windows drive mounted into Linux, which is what WSL exposes under /mnt/c
// through 9p, forwards no inotify event. Vite's watcher waits for
// notifications that never come, so HMR stays silent and the dev server has to
// be restarted to see an edit. Polling reads the files instead, at the cost of
// some CPU, and is the only thing that works there.
//
// Every other setup watches natively and is left alone: Windows, macOS, Linux,
// and WSL with the repository inside its own filesystem. VITE_POLL=1 forces
// polling on for a case this test misses, a Docker bind mount for instance.
const projectDirectory = fileURLToPath(new URL('.', import.meta.url))
const onMountedWindowsDrive = process.platform === 'linux' && projectDirectory.startsWith('/mnt/')
const shouldPoll = Boolean(process.env.VITE_POLL) || onMountedWindowsDrive

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    watch: shouldPoll ? { usePolling: true, interval: 300 } : undefined,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
      '/sanctum': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
    },
  },
})
