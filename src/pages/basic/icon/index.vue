<template>
    <page header-title="ICON 图标">
        <panel
            v-for="(iconKey, i) in iconKeys"
            :key="i"
            :title="iconKey[1]"
        >
            <view class="icon-list">
                <view
                    v-for="(icon, index) in icons[iconKey[0]]"
                    :key="`at-icon-${index}`"
                    class="icon-list__item"
                >
                    <view class="icon-list__icon">
                        <at-icon
                            :value="icon"
                            :color="iconColor"
                            :size="iconSize"
                        />
                    </view>
                    <view class="icon-list__name">{{ icon }}</view>
                </view>
            </view>
        </panel>
    </page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import AtIcon from "@/components/icon"
import { Page, Panel } from "../../components/demo-page"
import ICONS from "./icons"

export default defineComponent({

    components: {
        Page,
        Panel,
        AtIcon
    },

    setup() {
        const icons = ref(ICONS)
        const iconColor = ref('#999')
        const iconSize = ref(30)
        const iconKeys = ref({
            main: ['main', '主要'],
            file: ['file', '文件'],
            text: ['text', '文本'],
            arrow: ['arrow', '箭头'],
            media: ['media', '媒体控制'],
            photo: ['photo', '多媒体'],
            logo: ['logo', '徽标'],
        })
        return {
            icons,
            iconKeys,
            iconColor,
            iconSize
        }
    }
})
</script>

<style lang="scss">
.icon-list {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;

    &__item {
        margin-bottom: 60px;
        width: 33%;
        text-align: center;
    }

    &__name {
        margin-top: 20px;
        color: #88889c;
        font-size: 20px;
        text-align: center;
    }
}
</style>