<template>
    <view class="page toast-page">
        <!-- header -->
        <docs-header title="Message 消息通知" />
        <!-- end header -->

        <!-- body -->
        <view class="doc-body">
            <view class="panel">
                <view class="panel__title">基本案例</view>
                <view class="panel__content">
                    <view class="example-item">
                        <at-button @click="handleClick('')">普通消息</at-button>
                    </view>
                    <view class="example-item">
                        <at-button @click="handleClick('success')">成功消息</at-button>
                    </view>
                    <view class="example-item">
                        <at-button @click="handleClick('error')">错误消息</at-button>
                    </view>
                    <view class="example-item">
                        <at-button @click="handleClick('warning')">警告消息</at-button>
                    </view>
                    <view class="example-item">
                        <at-button @click="handleClick('info')">提示消息</at-button>
                    </view>
                </view>
            </view>
        </view>
        <!-- end body -->

        <!-- AtMessage Component -->
        <at-message />
    </view>
</template>

<script>
import { defineComponent } from "vue"
import Taro from "@tarojs/taro"
import AtButton from "@/components/button"
import AtMessage from "@/components/message"
import DocsHeader from "../../components/doc-header"

export default defineComponent({
    components: {
        DocsHeader,
        AtButton,
        AtMessage,
    },

    setup() {
        function handleClick(type) {
            Taro.atMessage({
                message: '消息通知',
                type
            })
        }

        return {
            handleClick
        }
    }
})
</script>

<style lang="scss">
.toast-page .example__body {
    &-button {
        display: inline-block;
    }
}
</style>