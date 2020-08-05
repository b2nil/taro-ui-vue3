<template>
    <view class="page activity-indicator-page">
        <!-- header -->
        <docs-header title="Activity Indicator 活动指示器" />
        <!-- end header -->

        <!-- body -->
        <view class="doc-body">
            <!-- customized size -->
            <view class="panel">
                <view class="panel__title">自定义尺寸</view>
                <view class="panel__content">
                    <view class="example-item">
                        <view
                            v-for="(size, i) in [40, 48, 64]"
                            :key="i"
                            class="subitem"
                        >
                            <at-activity-indicator :size="size" />
                        </view>
                    </view>
                </view>
            </view>
            <!-- end customized size -->

            <!-- customized color -->
            <view class="panel">
                <view class="panel__title">自定义颜色</view>
                <view class="panel__content">
                    <view class="example-item">
                        <view
                            v-for="(color, i) in ['#13CE66', '#FF4949', '#C9C9C9']"
                            :key="i"
                            class="subitem"
                        >
                            <at-activity-indicator :color="color" />
                        </view>
                    </view>
                </view>
            </view>
            <!-- end customized color -->

            <!-- customized text -->
            <view class="panel">
                <view class="panel__title">自定义文字</view>
                <view class="panel__content">
                    <view class="example-item">
                        <view class="subitem">
                            <at-activity-indicator content="加载中..." />
                        </view>
                    </view>
                </view>
            </view>
            <!-- end customized text -->

            <!-- status swtiching -->
            <view class="panel">
                <view class="panel__title">状态切换</view>
                <view class="panel__content">
                    <at-switch
                        :border="false"
                        :title="isOpened ? '开启中' : '关闭中'"
                        :checked="isOpened"
                        @change="handleChange"
                    />
                    <view class="example-item">
                        <at-activity-indicator
                            content="加载中..."
                            :isOpened="isOpened"
                        />
                    </view>
                </view>
            </view>
            <!-- end status swtiching -->

            <!-- vertically and horizontally centered -->
            <view class="panel">
                <view class="panel__title">垂直水平居中</view>
                <view class="panel__content">
                    <view class="example-item example-item--center">
                        <at-activity-indicator mode="center" />
                    </view>
                    <view class="example-item example-item--center">
                        <at-activity-indicator
                            mode="center"
                            content="Loading..."
                        />
                    </view>
                </view>
            </view>
            <!-- end vertically and horizontally centered -->
        </view>
        <!-- end body -->
    </view>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import AtActivityIndicator from "@/components/activity-indicator"
import AtSwitch from "@/components/switch"
import DocsHeader from "../../components/doc-header"

export default defineComponent({
    components: {
        DocsHeader,
        AtActivityIndicator,
        AtSwitch
    },

    setup() {
        const isOpened = ref(true)

        function handleChange(value) {
            isOpened.value = value
        }

        return {
            isOpened,
            handleChange
        }
    }
})
</script>

<style lang="scss">
@import '@/style/mixins/index.scss';
@import '@/style/variables/default.scss';

.activity-indicator-page .panel__content {
    .example-item {
        @include display-flex;
        @include align-items(center);

        &--center {
            height: 200px;
            position: relative;
            background-color: #fafbfc;
            margin-bottom: 20px;
        }

        .subitem {
            margin-left: 32px;
            @include flex(0, 0, auto);

            &:first-child {
                margin-left: 0;
            }
        }
    }
}
</style>