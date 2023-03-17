import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		cors: false,
		proxy: {
			'/api': {
				target: 'http://localhost:8000',
				changeOrigin: true,
				secure: false,
				ws: true,
			},
			'/assets': {
				target: 'http://localhost:8000',
				changeOrigin: true,
				secure: false,
				ws: true,
			},
			'/uploads': {
				target: 'http://localhost:8000',
				changeOrigin: true,
				secure: false,
				ws: true,
			},
		},
	},
})
