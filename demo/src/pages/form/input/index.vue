<template>
  <page header-title="Input 输入框">
    <!-- basic usage -->
    <panel
      no-padding
      title="基础用法"
    >
      <view class="component-item">
        <at-form>
          <at-input
            name="value1"
            title="标准五个字"
            type="text"
            placeholder="使用 v-model 更新 value"
            v-model="value1"
          />
          <at-input
            name="value3"
            title="无标题"
            placeholder="其他列保持正常间距"
            :border="false"
            v-model="value3"
          />
        </at-form>
      </view>
    </panel>
    <!-- end basic usage -->

    <!-- input box -->
    <panel
      no-padding
      title="输入框类型"
    >
      <view class="component-item">
        <at-form>
          <at-input
            name="value4"
            title="文本"
            type="text"
            placeholder="当行文本"
            v-model="value4"
          />
          <at-input
            name="value5"
            title="数字"
            type="number"
            placeholder="请输入数字"
            v-model="value5"
          />
          <at-input
            name="value6"
            title="密码"
            type="password"
            placeholder="密码不能少于 10 位数"
            v-model="value6"
          />
          <at-input
            name="value7"
            title="身份证"
            type="idcard"
            placeholder="身份证号码"
            v-model="value7"
          />
          <at-input
            name="value8"
            title="小数"
            type="digit"
            placeholder="请输入小数"
            v-model="value8"
          />
          <at-input
            name="value9"
            title="手机号码"
            type="phone"
            placeholder="手机号码"
            :border="false"
            v-model="value9"
          />
        </at-form>
      </view>
    </panel>
    <!-- end input box -->

    <!-- status -->
    <panel
      no-padding
      title="状态"
    >
      <view class="component-item">
        <at-form>
          <at-input
            disabled
            name="value10"
            title="禁用"
            type="text"
            placeholder="禁止输入"
            v-model="value10"
          />
          <at-input
            error
            name="value11"
            title="出现错误"
            type="text"
            placeholder="点击按钮触发回调"
            v-model="value11"
            @error-click="onClickErrorIcon"
          />
          <at-input
            name="value12"
            :editable="false"
            title="不可编辑"
            type="text"
            placeholder="不可编辑"
            value="不可编辑的内容"
          />
          <at-input
            clear
            name="value13"
            :border="false"
            title="清除按钮"
            type="text"
            placeholder="点击清除按钮清空内容"
            v-model="value13"
          />
          <at-input
            clear
            required
            name="value16"
            :border="false"
            title="必填项"
            type="text"
            placeholder="必须填写内容"
            v-model="value16"
          />
          <at-input
            clear
            name="value17"
            :border="false"
            title="监听事件"
            type="text"
            placeholder="监听键盘高度事件"
            v-model="value17"
            @keyboard-height-change="handleKeyboardHeightChange"
          />
        </at-form>
      </view>
    </panel>
    <!-- end status -->

    <!-- customized right column -->
    <panel
      no-padding
      title="自定义右边栏"
    >
      <view class="component-item">
        <at-form>
          <at-input
            clear
            name="value14"
            title="验证码"
            type="text"
            placeholder="验证码"
            :maxLength="4"
            v-model="value14"
          >
            <image
              :src="verificationCode"
              :style="imageStyle"
            />
          </at-input>
          <at-input
            clear
            name="value15"
            type="phone"
            placeholder="请输入手机号码"
            :border="false"
            v-model="value15"
          >
            <view
              :style="{
                color: disabled ? '#FF4949' : '',
                fontSize: '12px',
                width: '90px',
              }"
              @tap="sendCode"
            >{{ showTipText() }}</view>
          </at-input>
        </at-form>
      </view>
    </panel>
    <!-- end customized right column -->
  </page>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, toRefs } from 'vue'
import Taro from '@tarojs/taro'
import verificationCode from '@/assets/images/verification_code.png'
import './index.scss'

export default defineComponent({
  name: "InputDemo",

  setup() {
    const state = reactive({
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      value5: '',
      value6: '',
      value7: '',
      value8: '',
      value9: '',
      value10: '',
      value11: '',
      value12: '',
      value13: '',
      value14: '',
      value15: '',
      value16: '',
      value17: '',
      disabled: false,
      second: 60,
    })

    const imageStyle = computed(() => {
      if (process.env.TARO_ENV === 'h5') {
        return {
          width: 'unset',
          height: 'unset',
        }
      }
    })

    function showTipText() {
      return state.disabled ? `${state.second}s后重试` : '发送验证码'
    }

    function sendCode() {
      if (state.disabled) return

      state.disabled = true

      // 倒计时
      const timer = setInterval(() => {
        if (state.second > 0) {
          state.second = state.second - 1
        } else {
          state.second = 60,
            state.disabled = false
          clearInterval(timer)
        }
      }, 1000)
    }

    // function handleClick(): void {
    //   Taro.showToast({
    //     title: '已发送验证码',
    //     icon: 'success',
    //     duration: 2000
    //   })
    // }

    function onClickErrorIcon() {
      Taro.showToast({
        title: '请输入数字',
        icon: 'success',
        duration: 2000
      })
    }

    function handleKeyboardHeightChange(event) {
      Taro.showToast({
        title: `高度 ${event.detail.height}`,
        icon: 'success',
        duration: 2000
      })
    }

    return {
      ...toRefs(state),
      imageStyle,
      verificationCode,
      showTipText,
      sendCode,
      onClickErrorIcon,
      handleKeyboardHeightChange
    }
  }
})
</script>