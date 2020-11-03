import { computed } from 'vue'
import propsFactory from '@/utils/propsFactory'

// Types
export interface ElevationProps {
  /* Material Design has a maximum elevation of 24
  *  https://material.io/design/environment/elevation.html#default-elevations
  */
  elevation?: number | string | null
  flat?: boolean
}

export const makeElevationProps = propsFactory({
  elevation: {
    type: [Number, String],
    validator(v: any) {
      const value = parseInt(v)

      return (
        !isNaN(value) &&
        value >= 0 &&
        value <= 24
      )
    },
  },
  flat: Boolean,
})

// Effect
export function useElevationClasses(props: ElevationProps) {
  const elevationClasses = computed(() => {
    const { elevation = props.flat ? 0 : undefined } = props

    return (elevation != null && elevation !== '')
      ? { [`elevation-${elevation}`]: true }
      : {}
  })

  return { elevationClasses }
}