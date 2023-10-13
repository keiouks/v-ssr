import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolve = (p) => path.resolve(__dirname, p);

async function createServer() {
  const isProd = process.env.NODE_ENV === 'production';

  const template = fs.readFileSync(resolve(`${isProd ? 'dist/client/' : ''}index.html`), 'utf-8');

  const app = express();

  let vite;
  if (!isProd) {
    vite = await (await import('vite')).createServer({
      server: { middlewareMode: true },
      appType: 'custom'
    });
    app.use(vite.middlewares);
  } else {
    app.use('/assets', express.static(resolve('dist/client/assets')));
  }


  app.get('/', async (req, res) => {
    try {
      const url = req.originalUrl;
      let render;
      if (!isProd) {
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule('/src/entry-server.js')).render;
      } else {
        render = (await import('./dist/server/entry-server.js')).render;
      }
    
      let html = await render(url);
      html = template.replace('<!--app-html-->', html);
  
      res.status(200).set({
        'Content-Type': 'text/html'
      }).end(html);
    } catch(e) {
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  })

  app.listen(3004, () => {
    console.log('localhost:3004');
  });
}

createServer();