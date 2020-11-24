import { AllowedComponentProps, CSSProperties } from 'vue'

export interface AtComponent extends AllowedComponentProps {
  class?: string,
  style?: CSSProperties
}

export interface AtIconBaseProps2 extends AtComponent {
  value: string

  color?: string
}

export interface AtIconBaseProps extends AtComponent {
  value: string

  color?: string

  prefixClass?: string

  size?: number | string
}

export type Classes = Record<string, boolean | undefined>
export type Dictionary<T> = Record<string, T>
export type Styles = Dictionary<string | boolean | number | undefined>

export default AtComponent
