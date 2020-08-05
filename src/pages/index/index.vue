<template>
    <view class="page page-index">
        <!-- logo -->
        <view class="logo">
            <image
                class="img"
                :src="logoImg"
                mode="widthFix"
            />
        </view>
        <!-- title -->
        <view class="page-title">Taro UI Vue3</view>
        <!-- module list -->
        <view class="module-list">
            <view
                class="module-list__item"
                v-for="(item, index) in list"
                :key="index"
                @tap="gotoPanel(item.id)"
            >
                <view class="module-list__icon">
                    <image
                        class="img"
                        :src="item.icon"
                        mode="widthFix"
                    />
                </view>
                <view class="module-list__info">
                    <view class="title">{{ item.title }}</view>
                    <view class="content">{{ item.content }}</view>
                </view>
                <view class="module-list__arrow">
                    <text class="at-icon at-icon-chevron-right" />
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import { reactive, toRefs } from 'vue'
import Taro from '@tarojs/taro'
import iconAction from '@/assets/images/icon-list-action.png'
import iconBasic from '@/assets/images/icon-list-basic.png'
import iconForm from '@/assets/images/icon-list-form.png'
import iconHOC from '@/assets/images/icon-list-hoc.png'
import iconLayout from '@/assets/images/icon-list-layout.png'
import iconNavigation from '@/assets/images/icon-list-navigation.png'
import iconView from '@/assets/images/icon-list-view.png'
import logoImg from '@/assets/images/logo_taro.png'

export default {
    setup() {
        const state = reactive({
            list: [
                {
                    id: 'Basic',
                    title: '基础',
                    content: '包含颜色、文本、图标等',
                    icon: iconBasic
                },
                {
                    id: 'View',
                    title: '视图',
                    content: '包含通告栏、标签、徽标等',
                    icon: iconView
                },
                {
                    id: 'Action',
                    title: '操作反馈',
                    content: '包含对话框、进度条、动作面板等',
                    icon: iconAction
                },
                {
                    id: 'Form',
                    title: '表单',
                    content: '包含输入框、单选框、复选框等',
                    icon: iconForm
                },
                {
                    id: 'Layout',
                    title: '布局',
                    content: '包含列表、浮层、卡片等',
                    icon: iconLayout
                },
                {
                    id: 'Navigation',
                    title: '导航',
                    content: '包含标签栏、导航栏、分段器等',
                    icon: iconNavigation
                },
                {
                    id: 'Advanced',
                    title: '高阶组件',
                    content: '包含日历等',
                    icon: iconHOC
                }
            ]
        })

        function onShareAppMessage() {
            return {
                title: 'Taro UI Vue3',
                path: '/pages/index/index',
                imageUrl:
                    'http://storage.360buyimg.com/mtd/home/share1535013100318.jpg'
            }
        }

        function gotoPanel(id) {
            Taro.navigateTo({
                url: `/pages/panel/index?id=${id.toLowerCase()}`
            })
        }

        return {
            ...toRefs(state),
            logoImg,
            gotoPanel,
            onShareAppMessage
        }
    }
}
</script>

<style lang="scss">
.page {
    position: relative;
    background-color: #f8f8f8;

    view {
        box-sizing: border-box;
    }
}

.page-index {
    padding-top: 60px;
    padding-bottom: 100px;

    .logo {
        margin: 0 auto;
        margin-top: 60px;
        font-size: 0;
        text-align: center;
    }
    .img {
        width: 264px;
        height: 180px;
    }
    .page-title {
        margin-top: 24px;
        color: #333;
        font-size: 36px;
        text-align: center;
    }

    .module-list {
        margin-top: 72px;
        display: flex;
        flex-direction: column;
        align-items: center;

        &__item {
            box-sizing: border-box;
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-bottom: 40px;
            padding: 0 30px;
            width: 90%;
            height: 144px;
            background: #fff;
            box-shadow: 0 8px 40px 0 rgba(0, 0, 0, 0.04);
            border-radius: 10px;

            &:last-child {
                margin-bottom: 0;
            }
        }

        &__icon {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 70px;
            height: 70px;
            color: #78a4fa;
            text-align: center;
            border: 5px solid rgba(120, 164, 250, 0.16);
            border-radius: 50%;

            .img {
                width: 30px;
                height: 30px;
            }
        }

        &__info {
            flex: 1;
            text-align: left;
            margin-left: 24px;

            .title {
                color: #6a6a77;
                font-size: 28px;
                font-weight: bold;
            }

            .content {
                color: #88889c;
                font-size: 22px;
            }
        }

        &__arrow {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 62px;
            height: 62px;
            color: #fff;
            text-align: center;
            background: #78a4fa;
            box-shadow: 4px 10px 30px 0 rgba(120, 164, 250, 0.3);
            border-radius: 50%;
        }
    }
}

.page-body {
    padding: 40px;
}

.component-group {
    font-size: 32px;
}

.group-item {
    padding: 0 30px;
    margin: 20px 0;
    background-color: #fff;
    border-radius: 4px;
    overflow: hidden;

    &:first-child {
        margin-top: 0;
    }
}

.group-info {
    padding: 30px 0;
    display: flex;
    align-items: center;
    transition: opacity 0.3s;

    &-title {
        opacity: 0.5;
    }
}

.group-list {
    font-size: 28px;

    .list-component {
        padding: 20px 0;
        position: relative;
        align-items: center;

        &::before {
            content: ' ';
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            height: 1px;
            border-top: 1px solid #d8d8d8;
            color: #d8d8d8;
        }

        &:first-child::before {
            display: none;
        }

        &-info {
            width: 100%;
        }

        &-arrow {
            display: inline-block;
            height: 18px;
            width: 18px;
            border-width: 2px 2px 0 0;
            border-color: #888;
            border-style: solid;
            transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0) translate(-50%);
            position: absolute;
            top: 50%;
            right: 0;
        }
    }
}
</style>
