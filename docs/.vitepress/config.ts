import { defineConfig } from 'vitepress'

const isProd = process.env.NODE_ENV === 'production'
const repoBase = isProd ? '/form-cook/' : '/'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "form-cook",
  description: "基于 Vue3 的低代码可视化表单设计器,数据驱动，可视化界面搭建，提高开发者对表单的开发效率，让表单实现更简单。",
  base: repoBase,
  head: [
    ['link', { rel: 'icon', href: `${repoBase}favicon.ico` }],
  ],
  themeConfig: {
    logo: '/logo_fc.png',
    // https://vitepress.dev/reference/default-theme-config
    // nav: [
    //   // { text: 'Home', link: '/' },
    //   // { text: 'Examples', link: '/markdown-examples' }
    // ],

    // sidebar: [
    //   {
    //     text: 'Examples',
    //     items: [
    //       { text: 'Markdown Examples', link: '/markdown-examples' },
    //       { text: 'Runtime API Examples', link: '/api-examples' }
    //     ]
    //   }
    // ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/is-zhou/form-cook' }
    ]
  }
})
