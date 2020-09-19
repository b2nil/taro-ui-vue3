<template>
  <page
    class="toast-page"
    header-title="Toast 轻提示"
  >
    <!-- body -->
    <panel title="基本案例">
      <example-item>
        <at-button @click="handleClick({ text: '文本内容' })">文本 Toast</at-button>
      </example-item>
      <example-item>
        <at-button @click="handleClick({ text: '文本内容', icon: 'analytics' })">文本 + ICON</at-button>
      </example-item>
    </panel>

    <panel title="自定义图片">
      <example-item>
        <at-button
          @click="
            handleClick({
              text: '凸实验室',
              image: 'http://storage.360buyimg.com/mtd/home/group-21533885306540.png',
            })
          "
        >自定义图片 Toast</at-button>
      </example-item>
    </panel>

    <panel title="添加遮罩层">
      <example-item>
        <at-button
          @click="
            handleClick({
                text: '透明遮罩层的作用在于不可点击下面的元素',
                hasMask: true,
            })
          "
        >添加遮罩层 Toast</at-button>
      </example-item>
    </panel>

    <panel title="Error Toast">
      <example-item>
        <at-button
          @click="
            handleClick({
                text: '错误提示',
                hasMask: true,
                status: 'error',
            })
          "
        >错误提示 Toast</at-button>
      </example-item>
    </panel>

    <panel title="Success Toast">
      <example-item>
        <at-button
          @click="
            handleClick({
                text: '正确提示',
                hasMask: true,
                status: 'success',
            })
          "
        >正确提示 Toast</at-button>
      </example-item>
    </panel>

    <panel title="Loading Toast">
      <example-item>
        <at-button
          @click="
            handleClick({
                text: '正在加载...',
                hasMask: true,
                status: 'loading',
            })
          "
        >加载中 Toast</at-button>
      </example-item>
    </panel>

    <template #extra>
      <at-toast
        :icon="icon"
        :text="text"
        :image="image"
        :status="status"
        :hasMask="hasMask"
        :isOpened="isOpened"
        :duration="duration"
        @close="handleClose"
      />
    </template>
  </page>
</template>

<script>
import { reactive, toRefs } from 'vue'
import AtButton from '@/components/button'
import AtToast from '@/components/toast'
import { Page, Panel, ExampleItem } from "../../components/demo-page"

import "./index.scss"

export default {
  name: 'ToastDemo',

  components: {
    AtButton,
    AtToast,
    Page,
    Panel,
    ExampleItem,
  },

  setup() {
    const state = reactive({
      image: '',
      icon: '',
      text: '',
      status: '',
      duration: 3000,
      hasMask: false,
      isOpened: false,
    })

    function handleClick(params) {
      if (state.isOpened) {
        return Object.assign(state, {
          image: '',
          icon: '',
          text: '',
          status: '',
          duration: 3000,
          hasMask: false,
          isOpened: false,
        })
      }
      Object.assign(
        state,
        {
          image: '',
          icon: '',
          text: '',
          status: '',
          duration: 3000,
          hasMask: false,
          isOpened: true,
        },
        params
      )
    }

    function handleClose() {
      state.isOpened = false
    }

    return {
      ...toRefs(state),
      handleClick,
      handleClose,
    }
  }
}
</script>