import { resolve } from 'path'
import { defineConfig } from 'vite'
import fs from 'fs-extra'
import Components from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages';
import matter from 'gray-matter'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
        include: [/\.vue$/, /\.md$/],
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        // '@vueuse/core',
        // '@vueuse/head',
      ],
    }),
    Components({
      extensions: ['vue', 'md'],
      dts: true,
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    }),
    Pages({
      extensions: ['vue', 'md'],
      pagesDir: 'pages',
      extendRoute(route) {
        const path = resolve(__dirname, route.component.slice(1))

        if (!path.includes('projects.md')) {
          const md = fs.readFileSync(path, 'utf-8')
          const { data } = matter(md)
          route.meta = Object.assign(route.meta || {}, { frontmatter: data })
        }
        
        return route
      },
    }),
  ],
})
