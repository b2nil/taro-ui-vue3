import { mount, shallowMount } from '@vue/test-utils'
import { VNode, Slot } from '@vue/runtime-core'

export const sleep = async (timeout: number): Promise<null> =>
  new Promise((resolve) => setTimeout(resolve, timeout))

export interface Slots {
  default: Array<string | VNode> | Slot
  [x: string]: Array<string | VNode> | Slot
}

export function mountFactory(
  comp: any,
  components?: Record<string, object>,
  props?: Record<string, any>,
  slots?: Slots
) {
  return mount<any>(comp, {
    global: {
      components
    },
    props,
    slots,
  })
}

export function shallowMountFactory(
  comp: any,
  components?: Record<string, object>,
  props?: Record<string, any>,
  slots?: Slots
) {
  return shallowMount<any>(comp, {
    global: {
      components
    },
    props,
    slots,
  })
}
