
const sideBarItems = [
  {
    "title": "综述",
    "name": "Docs",
    "items": [
      {
        "title": "介绍",
        "name": "Introduction"
      },
      {
        "title": "快速上手",
        "name": "Quickstart"
      },
      {
        "title": "自定义主题",
        "name": "CustomizeTheme"
      },
      {
        "title": "常见问题",
        "name": "Questions"
      },
      {
        "title": "更新日志",
        "name": "Changelog"
      },
      {
        "title": "设计资源",
        "name": "Resource"
      }
    ]
  },
  {
    "title": "组件",
    "name": "Docs",
    "groups": [
      {
        "title": "基础组件",
        "items": [
          {
            "title": "颜色",
            "name": "Color"
          },
          {
            "title": "图标",
            "name": "Icon"
          },
          {
            "title": "按钮",
            "name": "Button"
          },
          {
            "title": "浮动按钮",
            "name": "Fab"
          }
        ]
      },
      {
        "title": "视图组件",
        "items": [
          {
            "title": "头像",
            "name": "Avatar"
          },
          {
            "title": "文章样式",
            "name": "Article"
          },
          {
            "title": "徽标",
            "name": "Badge"
          },
          {
            "title": "倒计时",
            "name": "Countdown"
          },
          {
            "title": "幕帘",
            "name": "Curtain"
          },
          {
            "title": "页面提示",
            "name": "LoadMore"
          },
          {
            "title": "通告栏",
            "name": "Noticebar"
          },
          {
            "title": "标签",
            "name": "Tag"
          },
          {
            "title": "时间轴",
            "name": "Timeline"
          },
          {
            "title": "滑动视图容器",
            "name": "Swiper"
          },
          {
            "title": "分隔符",
            "name": "Divider"
          },
          {
            "title": "步骤条",
            "name": "Steps"
          }
        ]
      },
      {
        "title": "操作反馈",
        "items": [
          {
            "title": "动作面板",
            "name": "ActionSheet"
          },
          {
            "title": "活动指示器",
            "name": "ActivityIndicator"
          },
          {
            "title": "模态框",
            "name": "Modal"
          },
          {
            "title": "进度条",
            "name": "Progress"
          },
          {
            "title": "轻提示",
            "name": "Toast"
          },
          {
            "title": "滑动操作",
            "name": "SwipeAction"
          },
          {
            "title": "消息通知",
            "name": "Message"
          }
        ]
      },
      {
        "title": "表单组件",
        "items": [
          {
            "title": "表单",
            "name": "Form"
          },
          {
            "title": "输入框",
            "name": "Input"
          },
          {
            "title": "数字输入框",
            "name": "InputNumber"
          },
          {
            "title": "单选按钮",
            "name": "Radio"
          },
          {
            "title": "多选框",
            "name": "Checkbox"
          },
          {
            "title": "评分",
            "name": "Rate"
          },
          {
            "title": "开关",
            "name": "Switch"
          },
          {
            "title": "多行文本框",
            "name": "Textarea"
          },
          {
            "title": "选择器",
            "name": "Picker"
          },
          {
            "title": "搜索栏",
            "name": "SearchBar"
          },
          {
            "title": "滑动条",
            "name": "Slider"
          },
          {
            "title": "图片选择器",
            "name": "ImagePicker"
          },
          {
            "title": "范围选择器",
            "name": "Range"
          }
        ]
      },
      {
        "title": "布局组件",
        "items": [
          {
            "title": "弹性布局",
            "name": "Flex"
          },
          {
            "title": "栅格布局",
            "name": "Grid"
          },
          {
            "title": "列表",
            "name": "List"
          },
          {
            "title": "卡片",
            "name": "Card"
          },
          {
            "title": "浮动弹层",
            "name": "FloatLayout"
          },
          {
            "title": "手风琴",
            "name": "Accordion"
          }
        ]
      },
      {
        "title": "导航组件",
        "items": [
          {
            "title": "导航栏",
            "name": "NavBar"
          },
          {
            "title": "标签栏",
            "name": "TabBar"
          },
          {
            "title": "标签页",
            "name": "Tabs"
          },
          {
            "title": "分段器",
            "name": "SegmentedControl"
          },
          {
            "title": "分页器",
            "name": "Pagination"
          },
          {
            "title": "抽屉",
            "name": "Drawer"
          },
          {
            "title": "索引选择器",
            "name": "Indexes"
          }
        ]
      },
      {
        "title": "高阶组件",
        "items": [
          {
            "title": "日历",
            "name": "Calendar"
          },
          {
            "title": "虚拟列表",
            "name": "VirtualScroll"
          },
          {
            "title": "骨架",
            "name": "Skeleton"
          }
        ]
      }
    ]
  }
]


module.exports = {
  title: 'Taro UI Vue3 | b2nil',
  description: "A Taro UI Library Rewritten in Vue 3.0",
  base: process.env.NODE_ENV !== 'production' ? '/' : '/taro-ui-vue3/',
  head: [
    [
      'link',
      {
        'rel': 'icon',
        'href': '/taro-ui-vue3/assets/favicon.png'
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
    logo: "/assets/taro-ui-vue3-logo.png",
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
    sidebar: sideBarItems
  },
};