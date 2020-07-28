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
- [x]  card
- []  checkbox
- []  countdown
   - []  item
- []  curtain
- []  divider
- []  drawer
- [x]  fab
- []  flex
   - []  item
- []  float-layout
- [x]  form
- []  grid
- [x]  icon
- []  image-picker
- []  indexes
- [x]  input //- ontouchend clear not working, - keyboard not showing
- []  input-number
- [x]  list
   - [x]  item
- []  load-more
- [x]  loading
- []  message
- []  modal
   - []  action
   - []  content
   - []  header
- []  nav-bar
- []  noticebar
- []  pagination
- []  progress
- []  radio
- []  range
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
- [x]  toast

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