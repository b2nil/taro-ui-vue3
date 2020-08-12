<template>
    <view
        class="page"
        style="height: 100vh;"
    >
        <view style="height: 100%;">
            <at-indexes
                topKey="Top"
                :list="mockdata"
                @click="handleClick"
                @scroll-into-view="handleScrollIntoView"
            >
                <view class="custom-area">
                    用户自定义内容
                    <at-search-bar
                        placeholder="跳转到指定Key"
                        :value="searchbarValue"
                        @change="handleChange"
                        @action-click="handleActionClick"
                    />
                </view>
            </at-indexes>
        </view>
    </view>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import Taro from "@tarojs/taro"
import AtIndexes from "@/components/indexes"
import AtSearchBar from "@/components/search-bar"
import mockData from './mock-data'

export default defineComponent({

    components: {
        AtIndexes,
        AtSearchBar,
    },

    setup() {
        const searchbarValue = ref('')
        const mockdata = ref(mockData)

        let scrollIntoView = (key) => {
            Taro.showToast({
                title: `scrollIntoView: ${key}`,
                icon: 'none'
            })
        }

        function handleClick(item) {
            Taro.showToast({
                title: `onClick: ${JSON.stringify(item)}`,
                icon: 'none'
            })
        }

        function handleActionClick() {
            if (!searchbarValue.value) {
                return
            }
            setTimeout(() => {
                scrollIntoView && scrollIntoView(searchbarValue.value.toUpperCase())
            }, 10);
        }

        function handleChange(value) {
            searchbarValue.value = value
        }

        function handleScrollIntoView(fn) {
            scrollIntoView = fn
        }

        return {
            mockdata,
            searchbarValue,
            handleClick,
            handleChange,
            handleActionClick,
            handleScrollIntoView
        }
    }
})
</script>

<style lang="scss">
.example-item {
    color: #333;
    font-size: 28px;
}

.custom-area {
    padding: 80px 20px;
    font-size: 28px;
    text-align: center;
    background: #fcfcfc;
}
</style>