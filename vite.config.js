import { defineConfig, loadEnv } from 'vite'
import process from 'node:process'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [react()],
    envDir: './environments',
    define: {
      'process.env': {
        ...env
      }
    }
  }
})