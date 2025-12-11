import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      strict: false
    },
    hmr: {
      overlay: true
    },
    watch: {
      usePolling: false
    }
  },
  publicDir: 'public',
  build: {
    // Garantir que os arquivos sejam gerados com hash único para evitar cache
    emptyOutDir: true, // Limpar diretório de saída antes de build
    rollupOptions: {
      output: {
        // Forçar novos nomes de arquivo a cada build
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  },
  // Desabilitar cache durante build para garantir que mudanças sejam detectadas
  optimizeDeps: {
    force: true
  }
})

