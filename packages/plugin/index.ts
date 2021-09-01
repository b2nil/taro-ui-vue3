import { toKebabCase } from '@tarojs/shared'
import type { IPluginContext } from '@tarojs/service'

interface UserOptions {
  [key: string]: string[]
}

module.exports = function (ctx: IPluginContext, rawOptions?: UserOptions) {
  const tuv3Map = {
    'at-accordion': ['view', 'text'],
    'at-action-sheet': ['view'],
    'at-action-sheet-item': ['view'],
    'at-activity-indicator': ['view', 'text'],
    'at-avatar': ['view', 'open-data', 'image', 'text'],
    'at-badge': ['view'],
    'at-button': ['view', 'button', 'form'],
    'at-calendar': ['view', 'swiper', 'swiper-item', 'picker', 'text'],
    'at-card': ['view', 'image', 'text'],
    'at-checkbox': ['view', 'text'],
    'at-countdown': ['view', 'text'],
    'at-curtain': ['view'],
    'at-divider': ['view'],
    'at-drawer': ['view', 'image', 'switch'],
    'at-fab': ['view'],
    'at-flex': ['view'],
    'at-flex-item': ['view'],
    'at-float-layout': ['view', 'text', 'scroll-view'],
    'at-form': ['form'],
    'at-grid': ['view', 'image', 'text'],
    'at-icon': ['text'],
    'at-image-picker': ['view', 'image'],
    'at-indexes': ['view', 'scroll-view', 'image', 'switch', 'text'],
    'at-input': ['view', 'label', 'input', 'text'],
    'at-input-number': ['view', 'text', 'input'],
    'at-list': ['view'],
    'at-list-item': ['view', 'image', 'switch'],
    'at-load-more': ['view', 'text', 'button', 'form'],
    'at-loading': ['view'],
    'at-message': ['view'],
    'at-modal-action': ['view'],
    'at-modal-content': ['scroll-view'],
    'at-modal-header': ['view'],
    'at-modal': ['view', 'text', 'button', 'scroll-view'],
    'at-nav-bar': ['view', 'text'],
    'at-noticebar': ['view', 'text'],
    'at-pagination': ['view', 'text', 'button', 'form'],
    'at-progress': ['view', 'text'],
    'at-radio': ['view', 'text'],
    'at-range': ['view'],
    'at-rate': ['view', 'text'],
    'at-search-bar': ['view', 'text', 'input'],
    'at-segmented-control': ['view'],
    'at-skeleton': ['view'],
    'at-slider': ['view', 'slider'],
    'at-steps': ['view', 'text'],
    'at-swipe-action': ['view', 'text'],
    'at-switch': ['view', 'switch'],
    'at-tab-bar': ['view', 'text', 'image'],
    'at-tabs': ['view', 'scroll-view', 'text'],
    'at-tabs-pane': ['view'],
    'at-tag': ['view'],
    'at-textarea': ['view', 'textarea'],
    'at-timeline': ['view', 'text'],
    'at-toast': ['view', 'image', 'text'],
    'at-virtual-scroll': ['view', 'scroll-view'],
  }

  const { componentConfig } = require('@tarojs/mini-runner/dist/template/component.js')

  const mergedMap = Boolean(rawOptions)
    ? { ...tuv3Map, ...rawOptions }
    : tuv3Map

  // 收集使用到的小程序组件
  function collectTags (node) {
    if (node.type === 1 && node.tagType === 1) {
      const normalizedTag = toKebabCase(node.tag)
      const tags = mergedMap[normalizedTag] || mergedMap[node.tag]
      const includes = componentConfig.includes
      if (tags) {
        for (const tag of tags) {
          if (!includes.has(tag))
            includes.add(tag)
        }
      }
    }
  }

  ctx.modifyWebpackChain(({ chain }) => {
    chain.module
      .rule('vue')
      .test(/\.vue$/)
      .use('vueLoader')
      .loader('vue-loader')
      .tap((options) => {
        options.compilerOptions.nodeTransforms = [
          ...options.compilerOptions?.nodeTransforms,
          collectTags
        ]

        return options
      })
  })
}