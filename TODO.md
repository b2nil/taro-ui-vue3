# TODOs

## 组件更新
- [x] accordion
- [x] action-sheet // [Vue warn]: Non-function value encountered for default slot. Prefer function slots for better performance.
   - [x]  body
      - [x]  item
   - [x]  footer
   - [x]  header
- [x]  activity-indicator
- [x]  avatar
- [x]  badge
- [x]  button
- [x]  calendar     // Bugs： - 滑动时日期和月份更新失效，- 选择日期失效
   - [x]  body
   - [x]  common
   - [x]  controller
   - [x]  ui
       - [x]  date-list
       - [x]  day-list
- [x]  card  // VM457:1 TypeError: Cannot read property 'bum' of null
``` when navigate back to prev page
VM457:1 TypeError: Cannot read property 'bum' of null
    at unmountComponent (runtime-core.esm-bundler.js:4632)
    at unmount (runtime-core.esm-bundler.js:4549)
    at unmountChildren (runtime-core.esm-bundler.js:4681)
    at unmount (runtime-core.esm-bundler.js:4564)
    at unmountComponent (runtime-core.esm-bundler.js:4646)
    at unmount (runtime-core.esm-bundler.js:4549)
    at unmountChildren (runtime-core.esm-bundler.js:4681)
    at unmount (runtime-core.esm-bundler.js:4567)
    at patchKeyedChildren (runtime-core.esm-bundler.js:4370)
    at patchChildren (runtime-core.esm-bundler.js:4261)
```
- [x]  checkbox
- [x]  countdown
   - [x]  item
- [x]  curtain
- [x]  divider
- [x]  drawer
- [x]  fab
- [x]  flex
   - [x]  item
- [x]  float-layout
- [x]  form
- [x]  grid
- [x]  icon
- [x]  image-picker
- [x]  indexes
- [x]  input
- [x]  input-number
- [x]  list
   - [x]  item
- [x]  load-more
- [x]  loading
- [x]  message
- [x]  modal
   - [x]  action
   - [x]  content
   - [x]  header
- [x]  nav-bar
- [x]  noticebar
- [x]  pagination
- [x]  progress
- [x]  radio
- [x]  range
- []  rate
- []  search-bar
- []  segmented-control
- []  slider
- []  steps
- []  swipe-action
   - []  options
- []  switch
- []  tab-bar
- []  tabs
- []  tabs-pane
- []  tag
- []  textarea
- []  timeline
- [x]  toast // RangeError: Maximum call stack size exceeded
```
VM457:1 RangeError: Maximum call stack size exceeded
    at Object.set (<anonymous>)
    at Object.set (reactivity.esm-bundler.js:251)
    at clearTimer (toast.ts:43)
    at handleChange (toast.ts:88)
    at toast.ts:34
    at callWithErrorHandling (runtime-core.esm-bundler.js:154)
    at getter (runtime-core.esm-bundler.js:4871)
    at reactiveEffect (reactivity.esm-bundler.js:42)
    at Array.job (runtime-core.esm-bundler.js:4913)
    at flushPostFlushCbs (runtime-core.esm-bundler.js:282)
```

## 简化 Props 类型以及默认值声明
### 实现
- 探索利用 Taro UI 的既有 types，自动声明 Prop type
- 通过传入 Prop 的默认值进行声明
- 利用泛型写自动声明类型 factory function
```typescript
// Composition Function
interface FooProps {
  foo: number
  bar?: string[]
  fooBar?: number | string
  forBarBuzz?: boolean
  onClick?: CommonEventFunction
}
export const genFooProps<FooProps> = (defaults: Partial<FooProps> = { foo: 1 }) => {
   // automate the process of declaring type and default one by one
   return {
      foo: {
        type: Number, // as typeof FooProps.foo
        default: defaults.foo,
      },
      bar: {
        type: Array, // as typeof FooProps.bar
        default: () => defaults.bar,
      },
   } as Partial<FooProps>
}

export function useFoo (props: FooProps) {
  return { ... }
}

// Usage
export default createComponent({
	props: {
		...FooProps({
			foo: 10
		}),
   },
  setup (props: FooProps, context) {
		useFoo(props)
	}
})
```
### 或者 直接使用第三方库 vue-types : 
```typescript
// 充分利用现有的 Taro ui 类型
interface FooProps {
  foo: number
  bar?: string[]
  fooBar?: number | string
  forBarBuzz?: boolean
  onClick?: CommonEventFunction
}
export default defineComponent({
   props: {
      foo: VueTypes.number.isRequired.def(0),
      bar: VueTypes.arrayOf(String).def([] as string[]),
      fooBar: VueTypes.oneOfType([Number, String]).def(''),
      fooBarBuzz: Boolean  // if `required` and `default` is not necessary
      onClick: VueTypes.func<CommonEventFunction>().def((e: CommonEvent) => {}),
   },
   setup(props: FooProps, conetext) {
      // ...
   }
})
   
```

## Event Handling
- 使用 Vue 模板时，回调函数如果需要传入参数，可以采用以下方式：
   1. `:onClick="handleClick.bind(this, 'value')"`
   2. `@click="handleClick('value', $event)"`
```vue
<template>
   <AtButton :onClick="handleClick.bind(this, 'value')"/> //OK
   <AtButton @click="handleClick('value', $event)"/>      //OK
   <AtInput @click="handleChange.bind(this, 'value')"/>  //cannot trigger event
</template>
```