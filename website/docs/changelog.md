
# 更新日志

----

项目遵循 [Semantic Versioning 2.0.0](http://semver.org/lang/zh-CN/) 语义化版本规范

### v1.0.0-alpha.17 (2020-12-7)
* `AtCheckbox`, `AtRate`, `AtSwitch`, `AtRadio`, `AtInput`, `AtInputNumber`, `AtTextarea`, `AtSearchBar` 等表单组件支持 v-model 语法
* `AtRate` 新增 `icon` 和 `color` 属性，支持自定义图标(`'star' | 'heart'`)和图标颜色 (229d93e)

### v1.0.0-alpha.16 (2020-12-4)
* 修复 `AtSlider` 当 step < 1 时 value 精度不准确的问题 ([taro-ui #758](https://github.com/NervJS/taro-ui/issues/758)) (91c1612)
* 修复 `taro-ui-vue3/lib` `@/utils` 和 `@/composables` 的引用路径问题 ([#63](https://github.com/b2nil/taro-ui-vue3/issues/63)) (b88d600)
* 将 `dayjs` 和 `lodash` 依赖切换为兼容 es module 的依赖 (39fac1e, ca8192a)
* 打包文件移除了 `umd` 格式，仅提供 `esm` 和 `cjs` 格式

### v1.0.0-alpha.15 (2020-11-20)
* 修复 `AtFlex` 样式失效问题 ([#7](https://github.com/b2nil/taro-ui-vue3/issues/7)) (c40d5a8, a4f2185)
* 修复 `AtButton` `onGetAuthorize` 笔误 ([#61](https://github.com/b2nil/taro-ui-vue3/issues/61)) (1dff28f)
* 修复 `AtLoadMore` `AtButton` 点击事件 (45bfaed)


### v1.0.0-alpha.14 (2020-11-14)
* 新增 `AtSkeleton` 骨架组件 (4caf076)
* 移除 `AtVirtualScroll`  viewport 属性，并修复可视区域的计算逻辑 (d76edcd)
* 修复 `AtInput` `style` 属性冲突以及 `maxlength` 属性失效 (25fcb4f, 36c9b97)


### v1.0.0-alpha.13 (2020-10-30)
* 修复 `AtSwipeAction` `could not find width of null` 的错误 ([#51](https://github.com/b2nil/taro-ui-vue3/issues/51)) (3050c68)
* 修复 `AtCurtain` `Invalid VNode type: undefined` 的错误 ([#53](https://github.com/b2nil/taro-ui-vue3/issues/53)) (1510079)
* 修复 `AtCalendar` 页面重新渲染后无法切换月份 ([#55](https://github.com/b2nil/taro-ui-vue3/issues/55)) (e4271f2)
* 修复 `AtButton` `onGetUserInfo` 等事件失效的问题 ([#56](https://github.com/b2nil/taro-ui-vue3/issues/56)) (fcefbbf)
* 优化组件依赖的样式的引入方式，按需引用时，一个组件只需引入一个样式文件即可，([#54](https://github.com/b2nil/taro-ui-vue3/issues/54)) (d8fdd9f)


### v1.0.0-alpha.12 (2020-10-24)
* 修复 `pxTransform` 未处理 h5 样式转换的问题 ([#47](https://github.com/b2nil/taro-ui-vue3/issues/47))
* 修复 `AtDivider` `height`, `fontSize` 传入 `string` 时类型校验失败 ([#48](https://github.com/b2nil/taro-ui-vue3/issues/48))
* 修复 `AtVirtualScroll` 初始视图未跳转至 scrollIntoItem 对应的列表行 ([#49](https://github.com/b2nil/taro-ui-vue3/issues/49))
* `AtVirtualScroll` 增加 `header` 和 `footer` 插槽

### v1.0.0-alpha.11 (2020-10-22)

* 修复 `AtVirtualScroll` 滚动时发生抖动 ([#44](https://github.com/b2nil/taro-ui-vue3/issues/44)) (4677951)
* 新增 `AtVirtualScroll` `viewport` 属性 (e09a78c)


### v1.0.0-alpha.10 (2020-10-21)
* 新增 `AtVirtualScroll` 虚拟列表组件 (2c523d)


### v1.0.0-alpha.9 (2020-10-19)
* 修复 `AtListItem` `className` 和 `customStyle` 未定义的问题
* 修复 H5 中 `AtIndexes` 点击字母索引跳转失效 ([#38](https://github.com/b2nil/taro-ui-vue3/issues/38))
* 修复 H5 中 `AtSearchBar` 点击搜索按钮后，不能彻底清空搜索内容 ([#41](https://github.com/b2nil/taro-ui-vue3/issues/41))
* 构建配置：修复 H5 使用 Taro.xxx 接口的组件报错：Taro__default.default.xxx is not a function h5 (Thanks to @ljquan ) ([#40](https://github.com/b2nil/taro-ui-vue3/issues/40))
* 增强: 小程序以及 H5 `AtSearchBar` 的 `onActionClick` 事件默认清空搜索内容

### v1.0.0-alpha.8 (2020-10-14)
* 修复 `AtTabs` 不能正常显示 Slot 内容 ([#35](https://github.com/b2nil/taro-ui-vue3/issues/35))
* 移除 types 与 React 相关的依赖

### v1.0.0-alpha.7 (2020-10-08)
* 修复 `AtCurtain` `closeBtnPosition` 默认类型错误
* 导出 `AtFlex` 和 `AtFlexItem`
* 更新与 H5 相关的 Readme、Config 等内容


### v1.0.0-alpha.6 (2020-09-25)
* 采用函数式插槽（`function slots`）， 避免编译至 h5 时出现 `non-funtion value encountered with default slot` 的警告
* 修复 `AtCalendar` Demo 跳转示例当月不能跳转的问题


### v1.0.0-alpha.5 (2020-09-23)
* 导出 `AtFlex` 和 `AtFlexItem`
* 修复 `AtTabs` Alipay 小程序 Tab Item 标题换行
* 修复 `AtInput`， `AtSearchBar` H5 和 Alipay 端不能彻底清除 input 的值 ([#30](https://github.com/b2nil/taro-ui-vue3/issues/30))
* 修复 `AtAccordion` H5 端展开和收起动画异常 ([#29](https://github.com/b2nil/taro-ui-vue3/issues/29))


### v1.0.0-alpha.4 (2020-09-20)

* 修复 `AtCalendar` 小程序端日期列表显示不全 ([#23](https://github.com/b2nil/taro-ui-vue3/issues/23))
* 修复 `AtCalendar` Alipay 小程序滑动时不能更新月份 ([#22](https://github.com/b2nil/taro-ui-vue3/issues/22))
* 修复 `AtInput` 各小程序端 `clear` 清除输入内容的逻辑
* 修复 `AtInput` placeholder 显示样式
* 修复 `AtSearchBar` 字节小程序端 input value 清除失效
* 修复 `AtActionSheetFooter` 的 `onClick` 属性类型
* 修复 Demo Pages Alipay 小程序端分包路径错误

### v1.0.0-alpha.3 (2020-09-17)

* 修复 `Accordion` 展开和收起动画异常 ([#12](https://github.com/b2nil/taro-ui-vue3/issues/12))
* 修复 `AtIndexes` 的 `onSrollIntoView` 事件不能跳转至目标区域 ([#8](https://github.com/b2nil/taro-ui-vue3/issues/8))
* 增加 `AtIndexes` 索引列表选中样式


### v1.0.0-alpha.2 (2020-09-16)

* 移除 `classnames` 依赖
* 使用 `class` 和 `style` 替代 Taro UI 组件的 `className` 和 `customStyle` 属性

### v1.0.0-alpha.1 (2020-09-07)

* **Taro UI Vue3** 发布第一个版本，包含 **50+** 组件
