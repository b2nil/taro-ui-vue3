
module.exports = {
  title: 'Taro UI Vue3 | b2nil',
  description: "A Taro UI Library Rewritten in Vue 3.0",
  base: process.env.NODE_ENV !== 'production' ? '/' : '/taro-ui-vue3/',
  head: [
    [
      'link',
      {
        'rel': 'icon',
        'href': '/taro-ui-vue3/_assets/favicon.png'
      }
    ],
    [
      'meta',
      {
        name: "keywords",
        content: "Taro-UI, Taro-UI-Vue3, UIKIT, Taro, 前端开发, 全栈开发, IOS开发, Android开发"
      },
    ],
    [
      'meta',
      {
        'http-equiv': 'Content-Type',
        content: 'text/html;charset=utf-8',
      },
    ],
    [
      'meta',
      {
        name: 'viewport',
        content:
          'width=device-width, maximum-scale=1.0, minimum-scale=1.0, initial-scale=1.0, user-scalable=no, viewport-fit=cover',
      },
    ],
    [
      'meta',
      {
        name: 'referrer',
        content: 'no-referrer',
      },
    ],
  ],

  themeConfig: {
    logo: "/_assets/taro-ui-vue3-logo.png",
    repo: "b2nil/taro-ui-vue3",
    repoLabel: "GitHub",
    docsDir: "website",
    docsBranch: "gh-pages",
    editLinks: true,
    editLinkText: 'Edit this page on GitHub',
    lastUpdated: 'Last Updated',
    prevLink: true,
    nextLink: true,
    algolia: {

    },
    // nav item: { text, link, activeMatch }
    nav: [],
    // sidebar
    sidebar: []
  },
};