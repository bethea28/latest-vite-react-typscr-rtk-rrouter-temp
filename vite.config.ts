import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Ensure Vite resolves d3 correctly
      'd3': 'd3/dist/d3.min.js', // Point to the d3 dist minified version
    },
  },
  optimizeDeps: {
    include: [
      'd3-selection',
      'd3-scale',
      'd3-axis',
      'd3-array', // Include all parts of D3 that you're using
    ],
  },
})
