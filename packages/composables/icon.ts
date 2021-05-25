import { computed, CSSProperties } from 'vue'
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
        )
      }
    }

    return {
      "at-icon": Boolean(icon),
      [`at-icon-${icon?.value}`]: Boolean(icon && icon.value)
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

    const style = Boolean(icon?.style) ? icon!.style : {}

    return {
      ...(style as CSSProperties),
      color: Boolean(icon && icon.color)
        ? icon!.color
        : defaultColor,
      fontSize: size
    }
  })

  return {
    iconStyle
  }
}