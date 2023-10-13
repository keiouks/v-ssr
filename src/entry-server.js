import { bootstrap } from './main.js'
import { renderToString } from 'vue/server-renderer'

export async function render(url) {
  const { app } = bootstrap();
  const ctx = {
    url
  }
  const html = await renderToString(app, ctx);
  return html
}