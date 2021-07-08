export default (ctx, options) => {
  const componentMap = {
    'accordion': ['view', 'text', 'slot'],
    'action-sheet': ['view', 'slot'],
    'action-sheet-item': ['view', 'slot'],
    'activity-indicator': ['view', 'text'],
    'avatar': ['view', 'open-data', 'image', 'text'],
    'badge': ['view', 'slot'],
    'button': ['view', 'button', 'form', 'slot'],
    'calendar': ['view', 'swiper', 'swiper-item', 'picker', 'text'],
    'card': ['view', 'image', 'slot', 'text'],
    'checkbox': ['view', 'text'],
    'countdown': ['view', 'text'],
    'curtain': ['view', 'slot'],
    'divider': ['view', 'slot'],
    'drawer': ['view', 'slot', 'image', 'switch'],
    'fab': ['view', 'slot'],
    'flex': ['view', 'slot'],
    'flex-item': ['view', 'slot'],
    'float-layout': ['view', 'text', 'scroll-view', 'slot'],
    'form': ['form', 'slot'],
    'grid': ['view', 'image', 'text'],
    'icon': ['text'],
    'image-picker': ['view', 'image'],
    'indexes': ['view', 'scroll-view', 'slot', 'image', 'switch', 'text'],
    'input': ['view', 'label', 'input', 'text', 'slot'],
    'input-number': ['view', 'text', 'input'],
    'list': ['view', 'slot'],
    'list-item': ['view', 'image', 'switch'],
    'load-more': ['view', 'text', 'button', 'form', 'slot'],
    'loading': ['view'],
    'message': ['view'],
    'modal-action': ['view', 'slot'],
    'modal-content': ['scroll-view', 'slot'],
    'modal-header': ['view', 'slot'],
    'modal': ['view', 'text', 'button', 'slot', 'scroll-view'],
    'nav-bar': ['view', 'text', 'slot'],
    'noticebar': ['view', 'text', 'slot'],
    'pagination': ['view', 'text', 'button', 'form', 'slot'],
    'progress': ['view', 'text'],
    'radio': ['view', 'text'],
    'range': ['view'],
    'rate': ['view', 'text'],
    'search-bar': ['view', 'text', 'input'],
    'segmented-control': ['view'],
    'skeleton': ['view'],
    'slider': ['view', 'slider'],
    'steps': ['view', 'text'],
    'swipe-action': ['view', 'slot', 'text'],
    'switch': ['view', 'switch'],
    'tab-bar': ['view', 'text', 'image', 'slot'],
    'tabs': ['view', 'scroll-view', 'text', 'slot'],
    'tabs-pane': ['view', 'slot'],
    'tag': ['view', 'slot'],
    'textarea': ['view', 'textarea'],
    'timeline': ['view', 'text'],
    'toast': ['view', 'image', 'text'],
    'virtual-scroll': ['view', 'slot', 'scroll-view'],
  }

  // 收集使用到的小程序组件
  ctx.onParseCreateElement(({ nodeName, componentConfig }) => {
    const includes = componentConfig.includes
    if (nodeName.startsWith('at-')) {
      const key = nodeName.substring(3)
      const tags = componentMap[key]
      for (const tag of tags) {
        if (!includes.has(tag))
          includes.add(tag)
      }
    }
  })
}