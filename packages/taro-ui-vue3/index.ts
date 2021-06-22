import type { App } from 'vue'

import AtAccordion from '@taro-ui-vue3/accordion/index.vue'
import AtActionSheet from '@taro-ui-vue3/action-sheet/index.vue'
import AtActionSheetItem from '@taro-ui-vue3/action-sheet/body/item/index.vue'
import AtActivityIndicator from '@taro-ui-vue3/activity-indicator/index.vue'
import AtAvatar from '@taro-ui-vue3/avatar/index.vue'
import AtBadge from '@taro-ui-vue3/badge/index.vue'
import AtButton from '@taro-ui-vue3/button/index.vue'
import AtCalendar from '@taro-ui-vue3/calendar/index.vue'
import AtCard from '@taro-ui-vue3/card/index.vue'
import AtCheckbox from '@taro-ui-vue3/checkbox/index.vue'
import AtCountdown from '@taro-ui-vue3/countdown/index.vue'
import AtCurtain from '@taro-ui-vue3/curtain/index.vue'
import AtDivider from '@taro-ui-vue3/divider/index.vue'
import AtDrawer from '@taro-ui-vue3/drawer/index.vue'
import AtFab from '@taro-ui-vue3/fab/index.vue'
import AtFlex from '@taro-ui-vue3/flex/index.vue'
import AtFlexItem from '@taro-ui-vue3/flex/item/index.vue'
import AtFloatLayout from '@taro-ui-vue3/float-layout/index.vue'
import AtForm from '@taro-ui-vue3/form/index.vue'
import AtGrid from '@taro-ui-vue3/grid/index.vue'
import AtIcon from '@taro-ui-vue3/icon/index.vue'
import AtImagePicker from '@taro-ui-vue3/image-picker/index.vue'
import AtIndexes from '@taro-ui-vue3/indexes/index.vue'
import AtInput from '@taro-ui-vue3/input/index.vue'
import AtInputNumber from '@taro-ui-vue3/input-number/index.vue'
import AtList from '@taro-ui-vue3/list/index.vue'
import AtListItem from '@taro-ui-vue3/list/item/index.vue'
import AtLoadMore from '@taro-ui-vue3/load-more/index.vue'
import AtLoading from '@taro-ui-vue3/loading/index.vue'
import AtMessage from '@taro-ui-vue3/message/index.vue'
import AtModal from '@taro-ui-vue3/modal/index.vue'
import AtModalAction from '@taro-ui-vue3/modal/action/index.vue'
import AtModalContent from '@taro-ui-vue3/modal/content/index.vue'
import AtModalHeader from '@taro-ui-vue3/modal/header/index.vue'
import AtNavBar from '@taro-ui-vue3/nav-bar/index.vue'
import AtNoticebar from '@taro-ui-vue3/noticebar/index.vue'
import AtPagination from '@taro-ui-vue3/pagination/index.vue'
import AtProgress from '@taro-ui-vue3/progress/index.vue'
import AtRadio from '@taro-ui-vue3/radio/index.vue'
import AtRate from '@taro-ui-vue3/rate/index.vue'
import AtRange from '@taro-ui-vue3/range/index.vue'
import AtSearchBar from '@taro-ui-vue3/search-bar/index.vue'
import AtSegmentedControl from '@taro-ui-vue3/segmented-control/index.vue'
import AtSkeleton from '@taro-ui-vue3/skeleton/index.vue'
import AtSlider from '@taro-ui-vue3/slider/index.vue'
import AtSteps from '@taro-ui-vue3/steps/index.vue'
import AtSwipeAction from '@taro-ui-vue3/swipe-action/index.vue'
import AtSwitch from '@taro-ui-vue3/switch/index.vue'
import AtTabBar from '@taro-ui-vue3/tab-bar/index.vue'
import AtTabs from '@taro-ui-vue3/tabs/index.vue'
import AtTabsPane from '@taro-ui-vue3/tabs/pane/index.vue'
import AtTag from '@taro-ui-vue3/tag/index.vue'
import AtTextarea from '@taro-ui-vue3/textarea/index.vue'
import AtTimeline from '@taro-ui-vue3/timeline/index.vue'
import AtToast from '@taro-ui-vue3/toast/index.vue'
import AtVirtualScroll from '@taro-ui-vue3/virtual-scroll/index.vue'

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
