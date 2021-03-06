import { resolve } from 'path'
import { defineConfig } from 'vite'
import fs from 'fs-extra'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages';
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import Markdown from 'vite-plugin-md'
import Prism from 'markdown-it-prism'
import matter from 'gray-matter'
import AutoImport from 'unplugin-auto-import/vite'
// import anchor from 'markdown-it-anchor'
import Unocss from 'unocss/vite'
import { presetAttributify, presetUno } from 'unocss'
import presetIcons from '@unocss/preset-icons'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      { find: '/~/', replacement: `${resolve(__dirname, 'src')}/` },
    ],
  },
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      '@vueuse/core',
      '@iconify/iconify',
      'dayjs',
      'dayjs/plugin/localizedFormat',
    ],
  },
  plugins: [
    Unocss({
      theme: {
        fontFamily: {
          sans: '"Inter", Inter var,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
        },
      },
      presets: [
        presetIcons({
          extraProperties: {
            display: 'inline-block',
            height: '1.2em',
            width: '1.2em',
            'vertical-align': 'text-bottom'
          }
        }),
        presetAttributify(),
        presetUno(),
      ],
    }),

    vue({
        include: [/\.vue$/, /\.md$/],
    }),

    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
        '@vueuse/head',
      ],
    }),

    Components({
      extensions: ['vue', 'md'],
      dts: true,
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: IconsResolver({
        componentPrefix: '',
      }),
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

    Markdown({
      wrapperComponent: 'post',
      wrapperClasses: 'prose m-auto',
      headEnabled: true,
      markdownItOptions: {
        quotes: '""\'\'',
      },
      markdownItSetup(md) {
        md.use(Prism)
        // md.use(anchor, {
        //   permalink: anchor.permalink.linkInsideHeader({
        //     symbol: '#',
        //     renderAttrs: () => ({ 'aria-hidden': 'true' }),
        //   }),
        // })
      }
    }),

    Icons({
      defaultClass: 'inline',
      defaultStyle: 'vertical-align: sub;',
    }),
  ],
})
