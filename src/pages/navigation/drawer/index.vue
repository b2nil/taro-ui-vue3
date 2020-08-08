<template>
    <page header-title="Drawer 抽屉">
        <panel
            title="左边滑出"
            no-padding
        >
            <example-item class="example">
                <at-button @click="leftDrawerClick">显示 Drawer</at-button>
                <at-drawer
                    mask
                    :show="leftDrawerShow"
                    :items="['菜单1', '菜单2']"
                    @close="onClose"
                    @item-click="onItemClick"
                ></at-drawer>
            </example-item>
        </panel>

        <panel
            title="右边滑出"
            no-padding
        >
            <example-item class="example">
                <at-button @click="rightDrawerClick">显示 Drawer</at-button>
                <at-drawer
                    mask
                    right
                    :show="rightDrawerShow"
                    :items="['菜单1', '菜单2']"
                    @close="onClose"
                    @item-click="onItemClick"
                ></at-drawer>
            </example-item>
        </panel>

        <panel
            title="自定义内容"
            no-padding
        >
            <example-item class="example">
                <at-button @click="childrenDrawerClick">显示 Drawer</at-button>
                <at-drawer
                    mask
                    :show="childrenDrawerShow"
                    @close="onClose"
                    @item-click="onItemClick"
                >
                    <view
                        v-for="(item, index) in childrenItem"
                        :key="`drawer-item-${index}`"
                        :class="drawerItemClass(index)"
                        @click="onItemClick.bind(this, index)"
                    >
                        {{ item }}
                        <at-icon
                            v-if="index !== 3 && icons[index]"
                            :value="icons[index]"
                            :size="20"
                        />
                        <at-badge
                            v-if="index === 3 && icons[index]"
                            :value="3"
                        >
                            <at-icon
                                :value="icons[index]"
                                :size="20"
                            />
                        </at-badge>
                    </view>
                </at-drawer>
            </example-item>
        </panel>
    </page>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from "vue"
import Taro from "@tarojs/taro"
import { AtBadge, AtButton, AtDrawer, AtIcon } from "@/components/index"
import { Page, Panel, ExampleItem } from '../../components/demo-page'

export default defineComponent({

    components: {
        AtBadge,
        AtButton,
        AtDrawer,
        AtIcon,
        Page,
        Panel,
        ExampleItem
    },

    setup() {
        const state = reactive({
            leftDrawerShow: false,
            rightDrawerShow: false,
            childrenDrawerShow: false,
            childrenItem: ['首页', '可自定义结构', '或自定义样式', '消息', '个人'],
            icons: ['home', '', '', 'message', 'user']
        })

        const drawerItemClass = computed(() => (index) => {
            const itemClass = ['drawer-item']

            if (index === 1 || index === 2) {
                itemClass.push('drawer-item--sub')
            }

            return itemClass
        })

        function leftDrawerClick() {
            state.leftDrawerShow = !state.leftDrawerShow
        }

        function rightDrawerClick() {
            state.rightDrawerShow = !state.rightDrawerShow
        }

        function childrenDrawerClick() {
            state.childrenDrawerShow = !state.childrenDrawerShow
        }

        function onItemClick(index) {
            const ENV = Taro.getEnv()

            let content
            if (typeof index !== 'number') {
                content = ''
            } else {
                content = `你点击了第 ${+index + 1} 个项目`
            }

            if (ENV !== 'WEB') content && Taro.showModal({ content, showCancel: false })
            else content && alert(content)
        }

        function onClose() {
            state.leftDrawerShow = false,
                state.rightDrawerShow = false,
                state.childrenDrawerShow = false
        }

        return {
            ...toRefs(state),
            drawerItemClass,
            leftDrawerClick,
            rightDrawerClick,
            childrenDrawerClick,
            onItemClick,
            onClose
        }
    }
})
</script>

<style lang="scss">
.page {
    background-color: #fff;
}

.example {
    margin-bottom: 15px;
    text-align: center;
}

.drawer-item {
    height: 80px;
    line-height: 80px;
    margin: 0 25px;
    color: #666;
    font-size: 30px;
    border-bottom: 1px solid #eee;
    position: relative;

    .at-icon {
        position: absolute;
        right: 5px;
        top: 25px;
    }

    .at-badge {
        position: absolute;
        right: 5px;
        top: 25px;

        .at-icon {
            position: static;
            margin-top: -45px;
        }
    }

    &--sub {
        font-size: 26px;
        margin-left: 50px;
        color: #999;
    }
}
</style>