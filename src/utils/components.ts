import { getEnvs } from './common'
import {
    View as TaroView,
    Icon as TaroIcon,
    Progress as TaroProgress,
    Text as TaroText,
    Button as TaroButton,
    Checkbox as TaroCheckBox,
    CheckboxGroup as TaroCheckBoxGroup,
    Form as TaroForm,
    Input as TaroInput,
    Label as TaroLabel,
    OpenData as TaroOpenData,
    Picker as TaroPicker,
    PickerView as TaroPickerView,
    PickerViewColumn as TaroPickerViewColumn,
    Radio as TaroRadio,
    RadioGroup as TaroRadioGroup,
    Slider as TaroSlider,
    Switch as TaroSwitch,
    Textarea as TaroTextarea,
    ScrollView as TaroScrollView,
    Swiper as TaroSwiper,
    SwiperItem as TaroSwiperItem,
    Image as TaroImage
} from "@tarojs/components";

const isWeb = getEnvs().isWEB

export const View = isWeb ? 'taro-view-core' : TaroView
export const Icon = isWeb ? 'taro-icon-core' : TaroIcon
export const Progress = isWeb ? 'taro-progress-core' : TaroProgress
export const Text = isWeb ? 'taro-text-core' : TaroText
export const Button = isWeb ? 'taro-button-core' : TaroButton
export const Checkbox = isWeb ? 'taro-checkbox-core' : TaroCheckBox
export const CheckboxGroup = isWeb ? 'taro-checkbox-group-core' : TaroCheckBoxGroup
export const Form = isWeb ? 'taro-form-core' : TaroForm
export const Input = isWeb ? 'taro-input-core' : TaroInput
export const Label = isWeb ? 'taro-label-core' : TaroLabel
export const OpenData = isWeb ? 'taro-open-data-core' : TaroOpenData
export const Picker = isWeb ? 'taro-picker-core' : TaroPicker
export const PickerView = isWeb ? 'taro-picker-view-core' : TaroPickerView
export const PickerViewColumn = isWeb ? 'taro-picker-view-column-core' : TaroPickerViewColumn
export const Radio = isWeb ? 'taro-radio-core' : TaroRadio
export const RadioGroup = isWeb ? 'taro-radio-group-core' : TaroRadioGroup 
export const Slider = isWeb ? 'taro-slider-core' : TaroSlider
export const Switch = isWeb ? 'taro-switch-core' : TaroSwitch
export const Textarea = isWeb ? 'taro-textarea-core' : TaroTextarea
export const ScrollView = isWeb ? 'taro-scroll-view-core' : TaroScrollView
export const Swiper = isWeb ? 'taro-swiper-core' : TaroSwiper
export const SwiperItem = isWeb ? 'taro-swiper-item-core' : TaroSwiperItem
export const Image = isWeb ? 'taro-image-core' : TaroImage