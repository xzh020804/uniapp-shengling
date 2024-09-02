import App from './App'

import './utils/utils'

import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

import { createSSRApp } from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	const pinia = createPinia()
	pinia.use(
		createPersistedState({
			Storage: {
				setItem(key, value) {
					uni.setStorageSync((key, value))
				},
				getItem(key) {
					return uni.getStorageSync(key)
				},
			},
		})
	)
	app.use(pinia)
	return {
		app,
	}
}
