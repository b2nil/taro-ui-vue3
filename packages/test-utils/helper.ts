import { mount, shallowMount, DOMWrapper, VueWrapper } from '@vue/test-utils'
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

export function genMountFn(
  comp: any,
  components?: Record<string, object>,
  useShallowMount?: boolean
) {
  return (props = {}, slots?: Slots) => {
    return useShallowMount
      ? shallowMountFactory(comp, components, props, slots)
      : mountFactory(comp, components, props, slots)
  }
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

export interface Dimension {
  top?: number
  bottom?: number
  left?: number
  right?: number
  width?: number
  height?: number
}

export function genDelayedSelectorSpy(
  utils: any,
  dimensions: Dimension
): jest.SpyInstance {
  return jest
    .spyOn(utils, 'delayQuerySelector')
    .mockImplementation((_, sel: string, delay?: number) => {
      return new Promise((resolve) => {
        resolve([dimensions])
      })
    })
}

export async function triggerTouchEvents(
  el: DOMWrapper<Element>,
  touchstartDetails: any,
  touchendDetails: any
) {
  const startDetails = {
    touches: [touchstartDetails],
    changedTouches: [touchstartDetails]
  }

  const endDetails = {
    touches: [touchendDetails],
    changedTouches: [touchendDetails]
  }

  await el.trigger('touchstart', startDetails)
  await el.trigger('touchmove', endDetails)
  await el.trigger('touchend', endDetails)
}

export function testPropClassAndStyle(
  mountFn: (props?: {}, slots?: Slots | undefined) => VueWrapper<any>
) {

  it.concurrent('should render prop class', async () => {
    const wrapper = mountFn({ class: 'test' })
    expect(
      wrapper.classes()
    ).toContain('test')
  })

  it.concurrent('should render prop style', async () => {
    const wrapper = mountFn({ style: { color: 'red' } })
    expect(
      wrapper.attributes('style')
    ).toContain('color: red;')
  })
}

export function hexToRGBA(hex: string, opacity = 1) {
  hex = hex.replace('#', '')
  const rgb = hex
    .match(new RegExp('(.{' + hex.length / 3 + '})', 'g'))!
    .map((l) => parseInt(hex.length % 2 ? l + l : l, 16))

  const rgba = rgb.concat(isFinite(opacity) ? opacity : 1)

  return opacity === 1
    ? `rgb(${rgb.join(', ')})`
    : `rgba(${rgba.join(', ')})`
}