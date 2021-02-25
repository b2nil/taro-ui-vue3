<template>
  <page header-title="NoticeBar 通告栏">
    <panel
      class="panel__content"
      title="文字"
    >
      <view class="bat-item">
        <at-noticebar single>
          <text user-select>{{singleLineText}}</text>
        </at-noticebar>
      </view>
      <view class="bat-item">
        <at-noticebar>
          <text user-select>{{multiLineText}}</text>
        </at-noticebar>
      </view>
    </panel>

    <panel
      class="panel__content"
      title="跑马灯"
    >
      <view class="bat-item">
        <at-noticebar marquee>
          <text
            user-select
            style="white-space: nowrap;"
          >{{textOnly}}</text>
        </at-noticebar>
      </view>
      <view class="bat-item">
        <at-noticebar
          marquee
          icon="volume-plus"
        >
          <text
            user-select
            style="white-space: nowrap;"
          >{{textWithIcon}}</text>
        </at-noticebar>
      </view>
      <view class="bat-item">
        <at-noticebar marquee>
          <text
            user-select
            style="white-space: nowrap;"
          >{{superLongText}}</text>
        </at-noticebar>
      </view>
    </panel>

    <panel
      class="panel__content"
      title="图标"
    >
      <view class="bat-item">
        <at-noticebar
          icon="volume-plus"
          single
        >
          <text user-select>{{singleLineText}}</text>
        </at-noticebar>
      </view>
      <view class="bat-item">
        <at-noticebar icon="volume-plus">
          <text user-select>{{multiLineText}}</text>
        </at-noticebar>
      </view>
    </panel>

    <panel
      class="panel__content"
      title="图标"
    >
      <view class="bat-item">
        <at-noticebar
          icon="volume-plus"
          single
        >
          <text user-select>{{singleLineText}}</text>
        </at-noticebar>
      </view>
      <view class="bat-item">
        <at-noticebar icon="volume-plus">
          <text user-select>{{multiLineText}}</text>
        </at-noticebar>
      </view>
    </panel>

    <panel
      class="panel__content"
      title="查看更多"
    >
      <view class="bat-item">
        <at-noticebar
          single
          show-more
          @goto-more="onGotoMore"
        >
          <text user-select>{{singleLineText}}</text>
        </at-noticebar>
      </view>
      <view class="bat-item">
        <at-noticebar
          single
          show-more
          icon="volume-plus"
          @goto-more="onGotoMore"
        >
          <text user-select>{{singleLineText}}</text>
        </at-noticebar>
      </view>
      <view class="bat-item">
        <at-noticebar
          show-more
          more-text="更多内容"
          @goto-more="onGotoMore"
        >
          <text user-select>{{multiLineText}}</text>
        </at-noticebar>
      </view>
      <view class="bat-item">
        <at-noticebar
          show-more
          more-text="更多内容"
          icon="volume-plus"
          @goto-more="onGotoMore"
        >
          <text user-select>{{multiLineText}}</text>
        </at-noticebar>
      </view>
    </panel>

    <panel
      class="panel__content"
      title="关闭按钮"
    >
      <view class="bat-item">
        <at-noticebar
          single
          close
        >
          <text user-select>{{singleLineText}}</text>
        </at-noticebar>
      </view>
      <view class="bat-item">
        <at-noticebar
          close
          icon="volume-plus"
        >
          <text user-select>{{singleLineText}}</text>
        </at-noticebar>
      </view>
      <view class="bat-item">
        <at-noticebar
          single
          close
          show-more
          @goto-more="onGotoMore"
        >
          <text user-select>{{singleLineText}}</text>
        </at-noticebar>
      </view>
      <view class="bat-item">
        <at-noticebar
          single
          close
          show-more
          icon="volume-plus"
          @goto-more="onGotoMore"
        >
          <text user-select>{{singleLineText}}</text>
        </at-noticebar>
      </view>
      <view class="bat-item">
        <at-noticebar close>
          <text user-select>{{multiLineText}}</text>
        </at-noticebar>
      </view>
      <view class="bat-item">
        <at-noticebar
          close
          icon="volume-plus"
        >
          <text user-select>{{multiLineText}}</text>
        </at-noticebar>
      </view>
    </panel>
  </page>
</template>

<script lang="ts">
import Taro from '@tarojs/taro'
import './index.scss'

export default defineComponent({
  name: "NoticebarDemo",

  setup() {

    const textOnly = '[纯文字] 这是 NoticeBar 通告栏。云对雨，雪对风，晚照退晴空。来鸿对去雁，宿鸟对鸣虫。 [结束]'
    const singleLineText = '[单行] 这是 NoticeBar 通告栏。云对雨，雪对风，晚照退晴空。来鸿对去雁，宿鸟对鸣虫。'
    const multiLineText = '[多行] 这是 NoticeBar 通告栏。云对雨，雪对风，晚照退晴空。来鸿对去雁，宿鸟对鸣虫。三尺剑，六钧弓，岭北对江东。人间清暑殿，天上广寒宫。两岸晓烟杨柳绿，一园春雨杏花红。'
    const textWithIcon = '[带icon] 这是 NoticeBar 通告栏。云对雨，雪对风，晚照退晴空。来鸿对去雁，宿鸟对鸣虫。三尺剑，六钧弓，岭北对江东。人间清暑殿，天上广寒宫。两岸晓烟杨柳绿，一园春雨杏花红。 [结束]'
    const superLongText = '[超长文本] 这是 NoticeBar 通告栏。云对雨，雪对风，晚照退晴空。来鸿对去雁，宿鸟对鸣虫。三尺剑，六钧弓，岭北对江东。人间清暑殿，天上广寒宫。两岸晓烟杨柳绿，一园春雨杏花红。两鬓风霜，途次早行之客，一蓑烟雨，溪边晚钓之翁。沿对革，异对同，白叟对黄童。江风对海雾，牧子对渔翁。颜巷陋，阮途穷，冀北对辽东。池中濯足水，门外打头风。梁帝讲经同泰寺，汉皇置酒未央宫。 [结束]'

    function onGotoMore(): void {
      if (Taro.getEnv() === Taro.ENV_TYPE.WEB) {
        alert('您点击了更多!')
        return
      }

      Taro.showModal({
        content: '点击了更多!',
        cancelText: '取消'
      })
    }

    return {
      textOnly,
      singleLineText,
      multiLineText,
      textWithIcon,
      superLongText
      onGotoMore
    }
  }
})
</script>