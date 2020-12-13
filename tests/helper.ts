import { mount } from '@vue/test-utils'
import { VNode } from '@vue/runtime-core'

export const sleep = async (timeout: number): Promise<null> =>
  new Promise((resolve) => setTimeout(resolve, timeout))

export interface Slots {
  default: Array<string | VNode>
  [x: string]: Array<string | VNode>
}

export function mountFactory(
  comp: any,
  components: Record<string, object> = {},
  props: Record<string, any> = {},
  slots: Slots = { default: [] }
) {
  return mount<any>(comp, {
    global: {
      components
    },
    props,
    slots,
  })
}
