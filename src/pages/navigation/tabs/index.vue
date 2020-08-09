<template>
    <page header-title="Tabs 标签页">
        <panel
            no-padding
            title="等宽标签栏"
        >
            <at-tabs
                :swipeable="false"
                :current="current1"
                :tab-list="tabList1"
                @click="handleClick.bind(this, 'current1')"
            >
                <at-tabs-pane
                    :current="current1"
                    :index="0"
                >
                    <view class="tab-content">标签页一的内容</view>
                </at-tabs-pane>
                <at-tabs-pane
                    :current="current1"
                    :index="1"
                >
                    <view class="tab-content">标签页二的内容</view>
                </at-tabs-pane>
                <at-tabs-pane
                    :current="current1"
                    :index="2"
                >
                    <view class="tab-content">标签页三的内容</view>
                </at-tabs-pane>
            </at-tabs>
        </panel>
        <panel
            no-padding
            title="等宽标签栏"
        >
            <at-tabs
                :swipeable="false"
                scroll
                :current="current2"
                :tab-list="tabList2"
                @click="handleClick.bind(this, 'current2')"
            >
                <at-tabs-pane
                    :current="current2"
                    :index="0"
                >
                    <view class="tab-content">标签页一的内容</view>
                </at-tabs-pane>
                <at-tabs-pane
                    :current="current2"
                    :index="1"
                >
                    <view class="tab-content">标签页二的内容</view>
                </at-tabs-pane>
                <at-tabs-pane
                    :current="current2"
                    :index="2"
                >
                    <view class="tab-content">标签页三的内容</view>
                </at-tabs-pane>
                <at-tabs-pane
                    :current="current2"
                    :index="3"
                >
                    <view class="tab-content">标签页四的内容</view>
                </at-tabs-pane>
                <at-tabs-pane
                    :current="current2"
                    :index="4"
                >
                    <view class="tab-content">标签页五的内容</view>
                </at-tabs-pane>
                <at-tabs-pane
                    :current="current2"
                    :index="5"
                >
                    <view class="tab-content">标签页六的内容</view>
                </at-tabs-pane>
            </at-tabs>
        </panel>
        <panel
            no-padding
            title="等宽标签栏"
        >
            <at-tabs
                :current="current3"
                :tab-list="tabList1"
                @click="handleClick.bind(this, 'current3')"
            >
                <at-tabs-pane
                    :current="current3"
                    :index="0"
                >
                    <view class="tab-content">标签页一的内容</view>
                </at-tabs-pane>
                <at-tabs-pane
                    :current="current3"
                    :index="1"
                >
                    <view class="tab-content">标签页二的内容</view>
                </at-tabs-pane>
                <at-tabs-pane
                    :current="current3"
                    :index="2"
                >
                    <view class="tab-content">标签页三的内容</view>
                </at-tabs-pane>
            </at-tabs>
        </panel>
        <panel
            no-padding
            title="等宽标签栏"
        >
            <at-tabs
                scroll
                height="200px"
                tab-direction="vertical"
                :current="current4"
                :tab-list="tabList2"
                @click="handleClick.bind(this, 'current4')"
            >
                <at-tabs-pane
                    tab-direction="vertical"
                    :current="current4"
                    :index="0"
                >
                    <view class="tab-content--vertical">标签页一的内容</view>
                </at-tabs-pane>
                <at-tabs-pane
                    tab-direction="vertical"
                    :current="current4"
                    :index="1"
                >
                    <view class="tab-content--vertical">标签页二的内容</view>
                </at-tabs-pane>
                <at-tabs-pane
                    tab-direction="vertical"
                    :current="current4"
                    :index="2"
                >
                    <view class="tab-content--vertical">标签页三的内容</view>
                </at-tabs-pane>
                <at-tabs-pane
                    tab-direction="vertical"
                    :current="current4"
                    :index="3"
                >
                    <view class="tab-content--vertical">标签页四的内容</view>
                </at-tabs-pane>
                <at-tabs-pane
                    tab-direction="vertical"
                    :current="current4"
                    :index="4"
                >
                    <view class="tab-content--vertical">标签页五的内容</view>
                </at-tabs-pane>
                <at-tabs-pane
                    tab-direction="vertical"
                    :current="current4"
                    :index="5"
                >
                    <view class="tab-content--vertical">标签页六的内容</view>
                </at-tabs-pane>
            </at-tabs>
        </panel>
        <panel
            no-padding
            title="等宽标签栏"
        >
            <at-tabs
                :current="current5"
                :animated="false"
                :tab-list="tabList1"
                @click="handleClick.bind(this, 'current5')"
            >
                <at-tabs-pane
                    :current="current5"
                    :index="0"
                >
                    <view class="tab-content">标签页一的内容</view>
                </at-tabs-pane>
                <at-tabs-pane
                    :current="current5"
                    :index="1"
                >
                    <view class="tab-content">标签页二的内容</view>
                </at-tabs-pane>
                <at-tabs-pane
                    :current="current5"
                    :index="2"
                >
                    <view class="tab-content">标签页三的内容</view>
                </at-tabs-pane>
                <at-tabs-pane
                    :current="current5"
                    :index="3"
                >
                    <view class="tab-content">标签页四的内容</view>
                </at-tabs-pane>
            </at-tabs>
        </panel>
    </page>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue"
import { AtTabs, AtTabsPane } from "@/components/index"
import { Page, Panel } from '../../components/demo-page'

export default defineComponent({

    components: {
        AtTabs,
        AtTabsPane,
        Page,
        Panel
    },

    setup() {
        const state = reactive({
            current1: 0,
            current2: 0,
            current3: 0,
            current4: 0,
            current5: 0

        })

        const tabList1 = ref([
            { title: '标签页1' },
            { title: '标签页2' },
            { title: '标签页3' }
        ])

        const tabList2 = ref([
            { title: '标签页1' },
            { title: '标签页2' },
            { title: '标签页3' },
            { title: '标签页4' },
            { title: '标签页5' },
            { title: '标签页6' }
        ])

        function handleClick(stateName, value) {
            state[stateName] = value
        }

        return {
            ...toRefs(state),
            tabList1,
            tabList2,
            handleClick,
        }
    }
})
</script>

<style lang="scss">
.tab-content {
    padding: 100px 50px;
    font-size: 30px;
    text-align: center;
    background-color: #fafbfc;
}

.tab-content--vertical {
    height: 200px;
    padding: 100px 50px;
    font-size: 30px;
    text-align: center;
    box-sizing: border-box;
    background-color: #fafbfc;
}
</style>