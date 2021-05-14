import type { App } from 'vue'

import AtAccordion from '@taro-ui-vue3/accordion'
import AtActionSheet from '@taro-ui-vue3/action-sheet'
import AtActionSheetItem from '@taro-ui-vue3/action-sheet/body/item'
import AtActivityIndicator from '@taro-ui-vue3/activity-indicator'
import AtAvatar from '@taro-ui-vue3/avatar'
import AtBadge from '@taro-ui-vue3/badge'
import AtButton from '@taro-ui-vue3/button'
import AtCalendar from '@taro-ui-vue3/calendar'
import AtCard from '@taro-ui-vue3/card'
import AtCheckbox from '@taro-ui-vue3/checkbox'
import AtCountdown from '@taro-ui-vue3/countdown'
import AtCurtain from '@taro-ui-vue3/curtain'
import AtDivider from '@taro-ui-vue3/divider'
import AtDrawer from '@taro-ui-vue3/drawer'
import AtFab from '@taro-ui-vue3/fab'
import AtFlex from '@taro-ui-vue3/flex'
import AtFlexItem from '@taro-ui-vue3/flex/item'
import AtFloatLayout from '@taro-ui-vue3/float-layout'
import AtForm from '@taro-ui-vue3/form'
import AtGrid from '@taro-ui-vue3/grid'
import AtIcon from '@taro-ui-vue3/icon'
import AtImagePicker from '@taro-ui-vue3/image-picker'
import AtIndexes from '@taro-ui-vue3/indexes'
import AtInput from '@taro-ui-vue3/input'
import AtInputNumber from '@taro-ui-vue3/input-number'
import AtList from '@taro-ui-vue3/list'
import AtListItem from '@taro-ui-vue3/list/item'
import AtLoadMore from '@taro-ui-vue3/load-more'
import AtLoading from '@taro-ui-vue3/loading'
import AtMessage from '@taro-ui-vue3/message'
import AtModal from '@taro-ui-vue3/modal'
import AtModalAction from '@taro-ui-vue3/modal/action'
import AtModalContent from '@taro-ui-vue3/modal/content'
import AtModalHeader from '@taro-ui-vue3/modal/header'
import AtNavBar from '@taro-ui-vue3/nav-bar'
import AtNoticebar from '@taro-ui-vue3/noticebar'
import AtPagination from '@taro-ui-vue3/pagination'
import AtProgress from '@taro-ui-vue3/progress'
import AtRadio from '@taro-ui-vue3/radio'
import AtRange from '@taro-ui-vue3/range'
import AtRate from '@taro-ui-vue3/rate'
import AtSearchBar from '@taro-ui-vue3/search-bar'
import AtSegmentedControl from '@taro-ui-vue3/segmented-control'
import AtSkeleton from '@taro-ui-vue3/skeleton'
import AtSlider from '@taro-ui-vue3/slider'
import AtSteps from '@taro-ui-vue3/steps'
import AtSwipeAction from '@taro-ui-vue3/swipe-action'
import AtSwitch from '@taro-ui-vue3/switch'
import AtTabBar from '@taro-ui-vue3/tab-bar'
import AtTabs from '@taro-ui-vue3/tabs'
import AtTabsPane from '@taro-ui-vue3/tabs/pane'
import AtTag from '@taro-ui-vue3/tag'
import AtTextarea from '@taro-ui-vue3/textarea'
import AtTimeline from '@taro-ui-vue3/timeline'
import AtToast from '@taro-ui-vue3/toast'
import AtVirtualScroll from '@taro-ui-vue3/virtual-scroll'

const allComponents = {
  AtAccordion,
  AtActionSheet,
  AtActionSheetItem,
  AtActivityIndicator,
  AtAvatar,
  AtBadge,
  AtButton,
  AtCalendar,
  AtCard,
  AtCheckbox,
  AtCountdown,
  AtCurtain,
  AtDivider,
  AtDrawer,
  AtFab,
  AtFlex,
  AtFlexItem,
  AtFloatLayout,
  AtForm,
  AtGrid,
  AtIcon,
  AtImagePicker,
  AtIndexes,
  AtInput,
  AtInputNumber,
  AtList,
  AtListItem,
  AtLoadMore,
  AtLoading,
  AtMessage,
  AtModal,
  AtModalAction,
  AtModalContent,
  AtModalHeader,
  AtNavBar,
  AtNoticebar,
  AtPagination,
  AtProgress,
  AtRadio,
  AtRange,
  AtRate,
  AtSearchBar,
  AtSegmentedControl,
  AtSkeleton,
  AtSlider,
  AtSteps,
  AtSwipeAction,
  AtSwitch,
  AtTabBar,
  AtTabs,
  AtTabsPane,
  AtTag,
  AtTextarea,
  AtTimeline,
  AtToast,
  AtVirtualScroll
}

export const createUI = (components: Record<string, any> = allComponents) => {
  const install = (app: App) => {
    for (const key in components) {
      const component = components[key]
      app.component(key, component)
    }
  }

  return { install }
}

export {
  AtAccordion,
  AtActionSheet,
  AtActionSheetItem,
  AtActivityIndicator,
  AtAvatar,
  AtBadge,
  AtButton,
  AtCalendar,
  AtCard,
  AtCheckbox,
  AtCountdown,
  AtCurtain,
  AtDivider,
  AtDrawer,
  AtFab,
  AtFlex,
  AtFlexItem,
  AtFloatLayout,
  AtForm,
  AtGrid,
  AtIcon,
  AtImagePicker,
  AtIndexes,
  AtInput,
  AtInputNumber,
  AtList,
  AtListItem,
  AtLoadMore,
  AtLoading,
  AtMessage,
  AtModal,
  AtModalAction,
  AtModalContent,
  AtModalHeader,
  AtNavBar,
  AtNoticebar,
  AtPagination,
  AtProgress,
  AtRadio,
  AtRange,
  AtRate,
  AtSearchBar,
  AtSegmentedControl,
  AtSkeleton,
  AtSlider,
  AtSteps,
  AtSwipeAction,
  AtSwitch,
  AtTabBar,
  AtTabs,
  AtTabsPane,
  AtTag,
  AtTextarea,
  AtTimeline,
  AtToast,
  AtVirtualScroll
}
