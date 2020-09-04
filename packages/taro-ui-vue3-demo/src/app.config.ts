export default {
  pages: [
    'pages/index/index',
    'pages/panel/index',
    // theme
    // 'pages/theme/index'
  ],
  subpackages: [
    // basic
    {
      root: 'pages/basic',
      pages: [
        'icon/index',
        'button/index',
        'color/index',
        'typo/index',
      ]
    },
    {
      root: 'pages/view',
      pages: [
        // view
        'noticebar/index',
        'badge/index',
        'tag/index',
        'avatar/index',
        'article/index',
        'timeline/index',
        'swiper/index',
        'load-more/index',
        'divider/index',
        'countdown/index',
        'steps/index',
        'curtain/index',
      ]
    },
    // action
    {
      root: 'pages/action',
      pages: [
        'toast/index',
        'modal/index',
        'progress/index',
        'action-sheet/index',
        'swipe-action/index',
        'activity-indicator/index',
        'message/index',
      ]
    },
    // navigation
    {
      root: 'pages/navigation',
      pages: [
        'drawer/index',
        'pagination/index',
        'tabs/index',
        'tabbar/index',
        'segmented-control/index',
        'navbar/index',
        'indexes/index',
      ]
    },
    // layout
    {
      root: 'pages/layout',
      pages: [
        'flex/index',
        'grid/index',
        'float-layout/index',
        'card/index',
        'list/index',
        'accordion/index',
      ]
    },
    // form
    {
      root: 'pages/form',
      pages: [
        // form
        'form/index',
        'checkbox/index',
        'input/index',
        'input-number/index',
        'radio/index',
        'textarea/index',
        'switch/index',
        'rate/index',
        'picker/index',
        'picker-view/index',
        'slider/index',
        'search-bar/index',
        'image-picker/index',
        'range/index',
      ]
    },
    // advanced
    {
      root: 'pages/advanced',
      pages: ['calendar/index']
    }
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'Taro UI Vue3',
    navigationBarTextStyle: 'black'
  }
}
