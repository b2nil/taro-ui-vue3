export {
  ref,
  isRef,
  unref,
  Ref,
  toRef,
  toRefs,
  inject,
  InjectionKey,
  provide,
  watch,
  watchEffect,
  reactive,
  computed,
  defineComponent,
  getCurrentInstance,
  onMounted,
  onUnmounted,
  onActivated,
  onBeforeMount,
  onBeforeUnmount,
  onDeactivated,
  ComputedRef,
  toRaw,
  UnwrapRef, // Plugin,
} from "@vue/composition-api"

export { VueContructor as App } from "vue"

import { Ref, set, computed } from "@vue/composition-api"
import Vue, { PluginFunction } from "vue"
import { unwrap } from "./utils/common"

export type Plugin = PluginFunction<any>

export const vueDelete = (x: any, o: any) => Vue.delete(x, o)
export const vueSet = set

// Fake readonly

export function readonly<T extends object>(
  target: T
): T extends Ref ? DeepReadonly<T> : DeepReadonly<Ref<T>> {
  return computed(() => unwrap(target)) as any
}

// Fake DeepReadonly
export type DeepReadonly<T> = Readonly<T>

declare module "vue" {
  interface VueContructor {
    provide(key: any, value: any): void
  }
}