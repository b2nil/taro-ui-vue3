
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

  logo: "/taro-ui-vue3/_assets/taro-ui-vue3-logo.png",
  // nav: "", //NavItem
  // sidebar: "", // SideBarConfig | MultiSideBarConfig
  // search: "", // SearchConfig

  /**
  * GitHub repository following the format <user>/<project>.
  */
  repo: "b2nil/taro-ui-vue3",
  /**
   * Customize the header label. Defaults to GitHub/Gitlab/Bitbucket depending
   * on the provided repo
   */
  repoLabel: "GitHub",

  /**
   * If your docs are in a different repository from your main project
   *
   * @example `"vuejs/docs-next"`
   */
  // docsRepo?: string
  /**
   * If your docs are not at the root of the repo.
   *
   * @example `"docs"`
   */
  docsDir: "docs",

  /**
   * If your docs are in a different branch. Defaults to `master`
   * @example `"next"`
   */
  docsBranch: "gh-pages",

  /**
   * Enable links to edit pages at the bottom of the page
   */
  editLinks: true,

  /**
   * Custom text for edit link. Defaults to "Edit this page"
   */
  editLinkText: "内容有误？ 编辑本页",

  lastUpdated: true,
  prevLink: true,
  nextLink: true,

  themeConfig: {
    // docs: components
  },
};