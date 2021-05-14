const pOrP = process.env.TARO_ENV === 'alipay' || process.env.TARO_ENV === 'swan'

const subpackages = [
  {
    root: 'pages/basic',
    pages: [
      // basic
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
  {
    root: 'pages/action',
    pages: [
      // action
      'toast/index',
      'modal/index',
      'progress/index',
      'action-sheet/index',
      'swipe-action/index',
      'activity-indicator/index',
      'message/index',
    ]
  },
  {
    root: 'pages/navigation',
    pages: [
      // navigation
      'drawer/index',
      'pagination/index',
      'tabs/index',
      'tabbar/index',
      'segmented-control/index',
      'navbar/index',
      'indexes/index',
    ]
  },
  {
    root: 'pages/layout',
    pages: [
      // layout
      'flex/index',
      'grid/index',
      'float-layout/index',
      'card/index',
      'list/index',
      'accordion/index',
    ]
  },
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
  {
    root: 'pages/advanced',
    pages: [
      // advanced
      'calendar/index',
      'virtual-scroll/index',
      'skeleton/index',
    ]
  },
]

export default {
  pages: [
    'pages/index/index',
    'pages/panel/index',
    // theme
    // 'pages/theme/index'
  ],
  [`sub${pOrP ? 'P' : 'p'}ackages`]: subpackages,
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'Taro UI Vue3',
    navigationBarTextStyle: 'black'
  }
}