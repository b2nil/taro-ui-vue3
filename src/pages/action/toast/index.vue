<template>
    <view class="page toast-page">
        <!-- header -->
        <docs-header title="Toast 轻提示" />
        <!-- header -->
        <!-- body -->
        <view class="doc-body">
            <view class="panel">
                <view class="panel__title">基本案例</view>
                <view class="panel__content">
                    <view class="example-item">
                        <at-button @tap="handleClick({ text: '文本内容' })">文本 Toast</at-button>
                    </view>
                    <view class="example-item">
                        <at-button @tap="handleClick({ text: '文本内容', icon: 'analytics' })">文本 + ICON</at-button>
                    </view>
                </view>
            </view>

            <view class="panel">
                <view class="panel__title">自定义图片</view>
                <view class="panel__content">
                    <view class="example-item">
                        <at-button
                            @tap="
                                handleClick({
                                  text: '凸实验室',
                                  image: 'http://storage.360buyimg.com/mtd/home/group-21533885306540.png',
                                })
                            "
                        >自定义图片 Toast</at-button>
                    </view>
                </view>
            </view>

            <view class="panel">
                <view class="panel__title">添加遮罩层</view>
                <view class="panel__content">
                    <view class="example-item">
                        <at-button
                            @tap="
                                handleClick({
                                text: '透明遮罩层的作用在于不可点击下面的元素',
                                hasMask: true,
                                })
                            "
                        >添加遮罩层 Toast</at-button>
                    </view>
                </view>
            </view>

            <view class="panel">
                <view class="panel__title">Error Toast</view>
                <view class="panel__content">
                    <view class="example-item">
                        <at-button
                            @tap="
                                handleClick({
                                text: '错误提示',
                                hasMask: true,
                                status: 'error',
                                })
                            "
                        >错误提示 Toast</at-button>
                    </view>
                </view>
            </view>

            <view class="panel">
                <view class="panel__title">Success Toast</view>
                <view class="panel__content">
                    <view class="example-item">
                        <at-button
                            @tap="
                                handleClick({
                                text: '正确提示',
                                hasMask: true,
                                status: 'success',
                                })
                            "
                        >正确提示 Toast</at-button>
                    </view>
                </view>
            </view>

            <view class="panel">
                <view class="panel__title">Loading Toast</view>
                <view class="panel__content">
                    <view class="example-item">
                        <at-button
                            @tap="
                                handleClick({
                                ttext: '正在加载…',
                                hasMask: true,
                                status: 'loading',
                                })
                            "
                        >加载中 Toast</at-button>
                    </view>
                </view>
            </view>
        </view>
        <!-- body -->
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
    </view>
</template>

<script>
import { reactive, toRefs } from 'vue'
import AtButton from '@/components/button'
import AtToast from '@/components/toast'
import DocsHeader from '../../components/doc-header'
import './index.scss'

export default {
    name: 'ToastPage',
    components: {
        AtButton,
        AtToast,
        DocsHeader,
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
    },
}
</script>

<style>
</style>