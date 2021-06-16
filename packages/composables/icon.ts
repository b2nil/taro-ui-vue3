import { computed, CSSProperties } from 'vue'
import { cssStringToObject } from '@taro-ui-vue3/utils'
import type { AtIconBaseProps } from '@taro-ui-vue3/types/base'

export function useIconClasses(
  icon?: AtIconBaseProps,
  allowPrefixClass?: boolean
) {
  const iconClasses = computed(() => {
    if (allowPrefixClass) {
      return {
        [`${icon?.prefixClass || "at-icon"}`]: Boolean(icon),
        [`${icon?.prefixClass || "at-icon"}-${icon?.value}`]: Boolean(
          icon && icon.value
        ),
        [`${icon?.class}`]: Boolean(icon?.class)
      }
    }

    return {
      "at-icon": Boolean(icon),
      [`at-icon-${icon?.value}`]: Boolean(icon && icon.value),
      [`${icon?.class}`]: Boolean(icon?.class)
    }
  })

  return {
    iconClasses
  }
}

export function useIconStyle(
  icon?: AtIconBaseProps,
  defaultColor: string = "",
  defaultSize?: number,
  pxTransform?: Function
) {
  const iconStyle = computed(() => {
    let size: string

    if (Boolean(icon && icon.size)) {
      size = pxTransform
        ? pxTransform(icon!.size)
        : `${icon!.size}px`
    } else {
      size = Boolean(defaultSize) ? `${defaultSize}px` : ""
    }

    const style = Boolean(icon?.style)
      ? typeof icon!.style === 'string'
        ? cssStringToObject(icon!.style)
        : icon!.style
      : {}

    return {
      color: Boolean(icon && icon.color)
        ? icon!.color
        : defaultColor,
      fontSize: size,
      ...(style as CSSProperties)
    }
  })

  return {
    iconStyle
  }
}