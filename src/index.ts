import type { App } from 'vue'

import AtAccordion from './components/accordion'
import AtActionSheet from './components/action-sheet'
import AtActionSheetItem from './components/action-sheet/body/item'
import AtActivityIndicator from './components/activity-indicator'
import AtAvatar from './components/avatar'
import AtBadge from './components/badge'
import AtButton from './components/button'
import AtCalendar from './components/calendar'
import AtCard from './components/card'
import AtCheckbox from './components/checkbox'
import AtCountdown from './components/countdown'
import AtCurtain from './components/curtain'
import AtDivider from './components/divider'
import AtDrawer from './components/drawer'
import AtFab from './components/fab'
import AtFlex from './components/flex'
import AtFlexItem from './components/flex/item'
import AtFloatLayout from './components/float-layout'
import AtForm from './components/form'
import AtGrid from './components/grid'
import AtIcon from './components/icon'
import AtImagePicker from './components/image-picker'
import AtIndexes from './components/indexes'
import AtInput from './components/input'
import AtInputNumber from './components/input-number'
import AtList from './components/list'
import AtListItem from './components/list/item'
import AtLoadMore from './components/load-more'
import AtLoading from './components/loading'
import AtMessage from './components/message'
import AtModal from './components/modal'
import AtModalAction from './components/modal/action'
import AtModalContent from './components/modal/content'
import AtModalHeader from './components/modal/header'
import AtNavBar from './components/nav-bar'
import AtNoticebar from './components/noticebar'
import AtPagination from './components/pagination'
import AtProgress from './components/progress'
import AtRadio from './components/radio'
import AtRange from './components/range'
import AtRate from './components/rate'
import AtSearchBar from './components/search-bar'
import AtSegmentedControl from './components/segmented-control'
import AtSkeleton from './components/skeleton'
import AtSlider from './components/slider'
import AtSteps from './components/steps'
import AtSwipeAction from './components/swipe-action'
import AtSwitch from './components/switch'
import AtTabBar from './components/tab-bar'
import AtTabs from './components/tabs'
import AtTabsPane from './components/tabs/pane'
import AtTag from './components/tag'
import AtTextarea from './components/textarea'
import AtTimeline from './components/timeline'
import AtToast from './components/toast'
import AtVirtualScroll from './components/virtual-scroll'

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
