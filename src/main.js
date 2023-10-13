import App from './App.vue'
import { createSSRApp } from 'vue'

export function bootstrap() {
  const app = createSSRApp(App)
  return { app }
}