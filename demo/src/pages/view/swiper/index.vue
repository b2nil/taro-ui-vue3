<template>
  <page header-title="Swiper 滑块视图容器">
    <panel
      class="panel__content"
      title="基础用法"
    >
      <example-item>
        <swiper
          indicatorColor="#999"
          indicatorActiveColor="#333"
          :current="current"
          :duration="duration"
          :interval="interval"
          :circular="isCircular"
          :autoplay="isAutoplay"
          :indicatorDots="hasIndicatorDots"
          previousMargin="20"
        >
          <template
            v-for="(item, idx) in imgUrls"
            :key="idx"
          >
            <swiper-item>
              <image
                :src="item"
                class="slide-image"
              />
            </swiper-item>
          </template>
        </swiper>

        <view class="control-cnt">
          <at-list>
            <at-list-item
              isSwitch
              title="指示点"
              :switchIsCheck="hasIndicatorDots"
              @switch-change="setIndicatorDots"
            />
            <at-list-item
              isSwitch
              title="自动播放"
              :switchIsCheck="isAutoplay"
              @switch-change="setAutoPlay"
            />
            <at-list-item
              isSwitch
              title="循环播放"
              :switchIsCheck="isCircular"
              @switch-change="setCircular"
            />
          </at-list>

          <view class="slider-list">
            <view class="slider-list__item">
              <view class="slider-list__item-header">
                <text>幻灯片切换时长(ms)</text>
              </view>
              <view class="slider-list__item-body">
                <slider
                  showValue
                  activeColor='#6190e8'
                  :step="1"
                  :min="500"
                  :max="2000"
                  :value="duration"
                  @change="setDuration"
                />
              </view>
            </view>
            <view class="slider-list__item">
              <view class="slider-list__item-header">
                <text>自动播放间隔时长(ms)</text>
              </view>
              <view class="slider-list__item-body">
                <slider
                  showValue
                  activeColor='#6190e8'
                  :step="1"
                  :min="2000"
                  :max="10000"
                  :value="interval"
                  @change="setInterval"
                />
              </view>
            </view>
          </view>
        </view>
      </example-item>
    </panel>
  </page>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { CommonEvent } from '@tarojs/components/types/common'
import './index.scss'

interface SwiperPageState {
  current: number
  duration: number
  interval: number
  isCircular: boolean
  isAutoplay: boolean
  hasIndicatorDots: boolean
  imgUrls: string[]
}

export default defineComponent({
  name: "SwiperDemo",

  setup() {
    const state = reactive<SwiperPageState>({
      current: 1,
      duration: 500,
      interval: 5000,
      isCircular: false,
      isAutoplay: true,
      hasIndicatorDots: true,
      imgUrls: [
        'https://img10.360buyimg.com/babel/s700x360_jfs/t25855/203/725883724/96703/5a598a0f/5b7a22e1Nfd6ba344.jpg!q90!cc_350x180',
        'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180',
        'https://img14.360buyimg.com/babel/s700x360_jfs/t1/4099/12/2578/101668/5b971b4bE65ae279d/89dd1764797acfd9.jpg!q90!cc_350x180'
      ]
    })

    const setAutoPlay = (e: CommonEvent): void => {
      state.isAutoplay = e.detail.value
    }

    const setCircular = (e: CommonEvent): void => {
      state.isCircular = e.detail.value
    }

    const setIndicatorDots = (e: CommonEvent): void => {
      state.hasIndicatorDots = e.detail.value
    }

    const setInterval = (e: CommonEvent): void => {
      state.interval = e.detail.value
    }

    const setDuration = (e: CommonEvent): void => {
      state.duration = e.detail.value
    }

    return {
      ...toRefs(state),
      setAutoPlay,
      setCircular,
      setIndicatorDots,
      setInterval,
      setDuration
    }
  }
})

</script>
