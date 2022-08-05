import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import electron from 'vite-plugin-electron'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import pkg from './package.json'
import { rmSync } from 'fs'
import { join } from 'path'

rmSync('dist', { recursive: true, force: true })

export default defineConfig({
  plugins: [
    vue(),
    electron({
      main: {
        entry: 'basic/app.js',
        vite: withDebug({
          build: {
            outDir: 'dist/basic',
          },
        }),
      },
      preload: {
        input: {
          index: join(__dirname, 'basic/preload/index.js'),
        },
        vite: {
          build: {
            sourcemap: 'inline',
            outDir: 'dist/basic/preload',
          },
        },
      },
      renderer: {},
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  server: {
    host: pkg.env.VITE_DEV_SERVER_HOST,
    port: pkg.env.VITE_DEV_SERVER_PORT,
  },
})

function withDebug(config) {
  if (process.env.VSCODE_DEBUG) {
    if (!config.build) config.build = {}
    config.build.sourcemap = true
    config.plugins = (config.plugins || []).concat({
      name: 'electron-vite-debug',
      configResolved() {
        const index = config.plugins.findIndex(p => p.name === 'electron-main-watcher');
        (config.plugins).splice(index, 1)
      },
    })
  }
  return config
}
