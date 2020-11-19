<template>
  <page header-title="NoticeBar 通告栏">
    <template
      v-for="(panel, i) in panels"
      :key="i"
    >
      <panel
        :title="panel.title"
        class="panel__content"
      >
        <example-item>
          <template
            v-for="(attr, j) in panel.attrs"
            :key="j"
          >
            <at-steps v-bind="attr" />
          </template>
        </example-item>
      </panel>
    </template>
  </page>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { AtSteps } from "taro-ui-vue3"
import { Item } from '@taro-ui-vue3/types/steps'
import { Page, Panel, ExampleItem } from '@/components/index'
import './index.scss'

interface TimelinePageState {
  [key: string]: number
}

export default defineComponent({
  name: "StepsDemo",

  components: {
    AtSteps,
    Page, Panel, ExampleItem
  },

  setup() {

    const state = reactive<TimelinePageState>({
      current1: 0,
      current2: 0,
      current3: 0,
      current4: 0,
      current5: 1
    })

    const items1 = ref<Item[]>([{ title: '步骤一' }, { title: '步骤二' }])

    const items2 = ref<Item[]>([
      { title: '步骤一' },
      { title: '步骤二' },
      { title: '步骤三' }
    ])

    const items3 = ref<Item[]>([
      { title: '步骤一', desc: '这里是额外的信息，最多两行' },
      { title: '步骤二', desc: '这里是额外的信息，最多两行' },
      { title: '步骤三', desc: '这里是额外的信息，最多两行' }
    ])

    const items4 = ref<Item[]>([
      {
        title: '步骤一',
        desc: '这里是额外的信息，最多两行',
        icon: {
          value: 'sound',
          activeColor: '#fff',
          inactiveColor: '#78A4FA',
          size: '14'
        }
      },
      {
        title: '步骤二',
        desc: '这里是额外的信息，最多两行',
        icon: {
          value: 'shopping-cart',
          activeColor: '#fff',
          inactiveColor: '#78A4FA',
          size: '14'
        }
      },
      {
        title: '步骤三',
        desc: '这里是额外的信息，最多两行',
        icon: {
          value: 'camera',
          activeColor: '#fff',
          inactiveColor: '#78A4FA',
          size: '14'
        }
      }
    ])

    const items5 = ref<Item[]>([
      {
        title: '步骤一',
        desc: '这里是额外的信息，最多两行',
        status: 'success'
      },
      {
        title: '步骤二',
        desc: '这里是额外的信息，最多两行'
      },
      {
        title: '步骤三',
        desc: '这里是额外的信息，最多两行',
        status: 'error'
      }
    ])

    const panels = [
      {
        title: "基础用法",
        attrs: [
          {
            items: items1.value,
            current: state.current1,
            onChange: onChange.bind(this, 'current1')
          },
          {
            items: items2.value,
            current: state.current2,
            onChange: onChange.bind(this, 'current2'),
          }
        ]
      },
      {
        title: "带附加信息",
        attrs: [
          {
            items: items3.value,
            current: state.current3,
            onChange: onChange.bind(this, 'current3'),
          }
        ]
      },
      {
        title: "自定义图标",
        attrs: [
          {
            items: items4.value,
            current: state.current4,
            onChange: onChange.bind(this, 'current4')
          }
        ]
      },
      {
        title: "状态步骤条",
        attrs: [
          {
            items: items5.value,
            current: state.current5,
            onChange: onChange.bind(this, 'current5')
          }
        ]
      },
    ]

    function onChange(stateName: string, current: number): void {
      state[stateName] = current
    }

    return {
      panels
    }
  }
})

</script>
