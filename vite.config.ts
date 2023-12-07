/* eslint-disable no-param-reassign */
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Layouts from 'vite-plugin-vue-layouts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      exclude: ['**/components/**.vue'],
      importMode(filepath) {
        const lazyLoadPages = ['/login.vue', '/index.vue', '/charts.vue']
        if (lazyLoadPages.includes(filepath.split('src/pages')[1])) return 'async'
        return 'sync'
      }
    }),
    vue(),
    Layouts(),
    AutoImport({
      imports: ['vue', VueRouterAutoImports, { 'vue-router/auto': ['useLink'] }, '@vueuse/core'],
      dts: true,
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true
      },
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          customCollections: ['menu']
        })
      ]
    }),
    Icons({
      compiler: 'vue3',
      customCollections: {
        menu: FileSystemIconLoader('./src/assets/icons/svg')
      },
      iconCustomizer(collection, _icon, props) {
        if (collection === 'menu') {
          props.width = '20px'
          props.height = '20px'
        }
        if (collection === 'fa6-brands') {
          props.width = '1.5em'
          props.height = '1.5em'
        }
      }
    })
  ],
  optimizeDeps: {
    include: [
      'monaco-editor/esm/vs/editor/editor.worker',
      'monaco-editor/esm/vs/language/json/json.worker',
      'monaco-editor/esm/vs/language/css/css.worker',
      'monaco-editor/esm/vs/language/html/html.worker',
      'monaco-editor/esm/vs/language/typescript/ts.worker'
    ]
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/index.scss";`
      }
    }
  },
  esbuild: {
    drop: ['console', 'debugger']
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/monaco-editor')) {
            return 'monaco-editor'
          }
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
