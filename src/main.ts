import { createApp } from 'vue'
import App from './App.vue'
// declare module 'vue-router' {
//   interface RouteMeta {
//     frontmatter: any
//   }
// }

// const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
//   if (savedPosition)
//     return savedPosition
//   else
//     return { top: 0 }
// }
// console.log(scrollBehavior);

createApp(App).mount('#app')
