export {
  ref,
  isRef,
  unref,
  inject,
  provide,
  watch,
  reactive,
  computed,
  readonly,
  toRaw,
  toRef,
  toRefs,
  getCurrentInstance,
  onMounted,
  onUnmounted,
  onActivated,
  onBeforeMount,
  onBeforeUnmount,
  onDeactivated,
  defineComponent,
  PropType,
  Ref,
  InjectionKey,
  ComputedRef,
  UnwrapRef,
  Plugin,
  App,
  DeepReadonly,
} from "@vue/runtime-core"

const NO_OP = () => { }

export const vueDelete: (o: object, p: string) => void = NO_OP
export const vueSet: (o: object, p: string, v: any) => void = NO_OP
