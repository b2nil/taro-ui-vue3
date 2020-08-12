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

export const View = isWeb ? 'view' : TaroView
export const Icon = isWeb ? 'icon' : TaroIcon
export const Progress = isWeb ? 'progress' : TaroProgress
export const Text = isWeb ? 'text' : TaroText
export const Button = isWeb ? 'button' : TaroButton
export const Checkbox = isWeb ? 'checkbox' : TaroCheckBox
export const CheckboxGroup = isWeb ? 'checkbox-group' : TaroCheckBoxGroup
export const Form = isWeb ? 'form' : TaroForm
export const Input = isWeb ? 'input' : TaroInput
export const Label = isWeb ? 'label' : TaroLabel
export const OpenData = isWeb ? 'open-data' : TaroOpenData
export const Picker = isWeb ? 'picker' : TaroPicker
export const PickerView = isWeb ? 'picker-view' : TaroPickerView
export const PickerViewColumn = isWeb ? 'picker-view-column' : TaroPickerViewColumn
export const Radio = isWeb ? 'radio' : TaroRadio
export const RadioGroup = isWeb ? 'radio-group' : TaroRadioGroup 
export const Slider = isWeb ? 'slider' : TaroSlider
export const Switch = isWeb ? 'switch' : TaroSwitch
export const Textarea = isWeb ? 'textarea' : TaroTextarea
export const ScrollView = isWeb ? 'scroll-view' : TaroScrollView
export const Swiper = isWeb ? 'swiper' : TaroSwiper
export const SwiperItem = isWeb ? 'swiper-item' : TaroSwiperItem
export const Image = isWeb ? 'img' : TaroImage
