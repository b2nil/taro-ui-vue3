import { AllowedComponentProps } from '@vue/runtime-core'

export interface AtComponent extends AllowedComponentProps {

}

export interface AtIconBaseProps2 extends AtComponent {
  value: string;

  color?: string;
}

export interface AtIconBaseProps extends AtComponent {
  value: string;

  color?: string;

  prefixClass?: string;

  size?: number | string;
}

export default AtComponent
