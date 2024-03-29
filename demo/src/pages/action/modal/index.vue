<template>
  <page header-title="Modal 模态框">
    <!-- body -->
    <template #default>
      <panel title="基础模态框">
        <example-item>
          <at-button @click="handleClick(1)">打开基础模态框</at-button>
        </example-item>
      </panel>

      <panel title="单个按钮模态框">
        <example-item>
          <at-button @click="handleClick(2)">打开单个按钮模态框</at-button>
        </example-item>
      </panel>

      <panel title="无标题模态框">
        <example-item>
          <at-button @click="handleClick(3)">打开无标题模态框</at-button>
        </example-item>
      </panel>

      <panel title="简化使用模态框">
        <example-item>
          <at-button @click="handleClick(4)">打开简化使用模态框</at-button>
        </example-item>
      </panel>

      <panel title="城市索引模态框">
        <example-item>
          <at-button @click="handleClick(5)">打开城市索引模态框</at-button>
        </example-item>
      </panel>
    </template>

    <!-- Modal Compoenents -->
    <template #extra>
      <!-- 基础 -->
      <at-modal
        :isOpened="isOpened1"
        @close="closeModal(1, 'Modal 被关闭了')"
      >
        <at-modal-header>标题</at-modal-header>
        <at-modal-content>
          <view class="modal-content">
            琴对瑟，剑对刀。地迥对天高。
            峨冠对博带，紫绶对绯袍。
            煎异茗，酌香醪。虎兕对猿猱。
          </view>
        </at-modal-content>
        <at-modal-action>
          <button @tap="closeModal(1, '点击了取消')">取消</button>
          <button
            @tap="closeModal(1, '点击了确定')"
            style="margin-top: 0;"
          >确定</button>
        </at-modal-action>
      </at-modal>

      <!-- 单个按钮 -->
      <at-modal
        :isOpened="isOpened2"
        @close="closeModal(2, 'Modal 被关闭了')"
      >
        <at-modal-header>标题</at-modal-header>
        <at-modal-content>
          <view class="modal-content">武夫攻骑射，野妇务蚕缫。</view>
        </at-modal-content>
        <at-modal-action>
          <button @tap="closeModal(2, '点击了确定')">确定</button>
        </at-modal-action>
      </at-modal>

      <!-- 无标题 -->
      <at-modal
        :isOpened="isOpened3"
        cancelText="取消"
        confirmText="确定"
        :content="`秋雨一川淇澳竹，春风两岸武陵桃。
                   螺髻青浓，楼外晚山千仞；
                   鸭头绿腻，溪中春水半篙。
                  `"
        @close="closeModal(3, 'Modal 被关闭了')"
        @cancel="closeModal(3, '点击了取消')"
        @confirm="closeModalConfirm(3, '点击了确认')"
      ></at-modal>

      <!-- 简化使用 -->
      <at-modal
        :isOpened="isOpened4"
        title="标题"
        cancelText="取消"
        confirmText="确定"
        :content="`秋雨一川淇澳竹，\n春风两岸武陵桃。`"
        @close="closeModal(4, 'Modal 被关闭了')"
        @cancel="closeModal(4, '点击了取消')"
        @confirm="closeModalConfirm(4, '点击了确认')"
      />

      <!-- 城市索引 -->
      <at-modal :isOpened="isOpened5">
        <at-modal-content>
          <at-indexes
            :list="mockData"
            topKey="top"
            :style="{height: '600px'}"
          >
            <view class="custom-area">用户自定义内容</view>
          </at-indexes>
        </at-modal-content>
      </at-modal>
    </template>
  </page>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue"
import Taro from "@tarojs/taro"
import mockData from '../../navigation/indexes/mock-data'

export default defineComponent({
  name: "ModalDemo",

  setup() {
    const state = reactive({
      isOpened1: false,
      isOpened2: false,
      isOpened3: false,
      isOpened4: false,
      isOpened5: false,
    })

    function handleClick(type) {
      state[`isOpened${type}`] = true
    }

    function closeModal(type, msg) {
      state[`isOpened${type}`] = false
      Taro.showToast({
        icon: 'none',
        title: msg
      })
    }

    function closeModalConfirm(type, msg) {
      state[`isOpened${type}`] = false
      Taro.showToast({
        icon: 'none',
        title: msg
      })
    }

    return {
      ...toRefs(state),
      mockData,
      handleClick,
      closeModal,
      closeModalConfirm
    }
  }
})
</script>
