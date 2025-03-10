import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import type { Plugin } from 'vite'
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import injectScriptPlugin from './vite-plugin/vite-plugin-inject-script';


// יצירת פלאגין מותאם אישית לטיפול בבקשות פרה-פלייט
function privateNetworkSupport(): Plugin {
  return {
    name: 'private-network-support',
    configureServer(server) {
      server.middlewares.use((req: any, res: any, next: any) => {
        const method = req.method || ''
        if (method.toUpperCase() === 'OPTIONS') {
          res.setHeader('Access-Control-Allow-Private-Network', 'true')
        }
        next()
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    svelte({}),
    cssInjectedByJsPlugin(),
    privateNetworkSupport(),
    injectScriptPlugin(),
  ],


  build: {
    outDir: 'dist',
    /* cssCodeSplit: false, */

    lib: {
      entry: 'src/main.ts',
      formats: ['es'],
      fileName: 'main'
    },

    rollupOptions: {
      output: {

      }
    }
  },

  server: {
     port: 443,

    host: '0.0.0.0', //'dev-server.dev',
    https: {
      key: 'dev-cert/dev-server.dev-key.pem',
      cert: 'dev-cert/dev-server.dev.pem'
    },
    cors: {
      origin: ['https://gingim.net', 'https://www.googleapis.com'],
      credentials: true
    },
    headers: {
      'Access-Control-Allow-Private-Network': 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
      'Access-Control-Allow-Credentials': 'true'
    }
  },
  



  // הוספת תמיכה בקבצים מתיקיית temp
  //publicDir: 'temp'
})
