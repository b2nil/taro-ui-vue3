<template>
  <view class="page">
    <docs-header title="Input 输入框"></docs-header>
    <view class="doc-body">
      <view class="panel">
        <view class="panel__title">基础用法</view>
        <view class="panel__content no-padding">
          <view class="component-item">
            <at-form>
              <at-input
                name="value1"
                title="标准五个字"
                type="text"
                placeholder="标准五个字"
                :value="value1"
                @change="handleInput.bind(this, 'value1')"
              ></at-input>
              <at-input
                name="value2"
                title="标题实在特别长就换行"
                placeholder="其他列保持正常间距"
                :value="value2"
                @change="handleInput.bind(this, 'value2')"
              ></at-input>
              <at-input
                name="value3"
                title="无标题"
                placeholder="其他列保持正常间距"
                :border="false"
                :value="value3"
                @change="handleInput.bind(this, 'value3')"
              ></at-input>
            </at-form>
          </view>
        </view>
      </view>
      <view class="panel">
        <view class="panel__title">输入框类型</view>
        <view class="panel__content no-padding">
          <view class="component-item">
            <at-form>
              <at-input
                name="value4"
                title="文本"
                type="text"
                placeholder="当行文本"
                :value="value4"
                @change="handleInput.bind(this, 'value4')"
              ></at-input>
              <at-input
                name="value5"
                title="数字"
                type="number"
                placeholder="请输入数字"
                :value="value5"
                @change="handleInput.bind(this, 'value5')"
              ></at-input>
              <at-input
                name="value6"
                title="密码"
                type="password"
                placeholder="密码不能少于 10 位数"
                :value="value6"
                @change="handleInput.bind(this, 'value6')"
              ></at-input>
              <at-input
                name="value7"
                title="身份证"
                type="idcard"
                placeholder="身份证号码"
                :value="value7"
                @change="handleInput.bind(this, 'value7')"
              ></at-input>
              <at-input
                name="value8"
                title="小数"
                type="digit"
                placeholder="请输入小数"
                :value="value8"
                @change="handleInput.bind(this, 'value8')"
              ></at-input>
              <at-input
                name="value9"
                title="手机号码"
                type="phone"
                placeholder="手机号码"
                :border="false"
                :value="value9"
                @change="handleInput.bind(this, 'value9')"
              ></at-input>
            </at-form>
          </view>
        </view>
      </view>
      <view class="panel">
        <view class="panel__title">状态</view>
        <view class="panel__content no-padding">
          <view class="component-item">
            <at-form>
              <at-input
                name="value10"
                disabled="disabled"
                title="禁用"
                type="text"
                placeholder="禁止输入"
                :value="value10"
                @change="handleInput.bind(this, 'value10')"
              ></at-input>
              <at-input
                name="value11"
                error="error"
                title="出现错误"
                type="text"
                placeholder="点击按钮触发回调"
                :value="value11"
                @change="handleInput.bind(this, 'value11')"
                :onErrorClick="onClickErrorIcon"
              ></at-input>
              <at-input
                name="value12"
                :editable="false"
                title="不可编辑"
                type="text"
                placeholder="不可编辑"
                value="不可编辑的内容"
              ></at-input>
              <at-input
                name="value13"
                :border="false"
                :clear="true"
                title="清除按钮"
                type="text"
                placeholder="点击清除按钮清空内容"
                :value="value13"
                @change="handleInput.bind(this, 'value13')"
              ></at-input>
              <at-input
                name="value16"
                :border="false"
                :clear="true"
                :required="true"
                title="必填项"
                type="text"
                placeholder="必须填写内容"
                :value="value16"
                @change="handleInput.bind(this, 'value16')"
              ></at-input>
              <at-input
                name="value17"
                :border="false"
                title="监听事件"
                type="text"
                placeholder="监听键盘高度事件"
                :value="value17"
                @change="handleInput.bind(this, 'value17')"
                @keyboard-height-change="handleKeyboardHeightChange($event)"
              ></at-input>
            </at-form>
          </view>
        </view>
      </view>
      <view class="panel">
        <view class="panel__title">自定义右边栏</view>
        <view class="panel__content no-padding">
          <view class="component-item">
            <at-form>
              <at-input
                name="value14"
                title="验证码"
                type="text"
                :maxLength="4"
                clear="clear"
                placeholder="验证码"
                :value="value14"
                @change="handleInput.bind(this, 'value14')"
              >
                <image src="@/assets/images/verification_code.png" />
              </at-input>
              <at-input
                name="value15"
                :border="false"
                type="phone"
                clear="clear"
                placeholder="请输入手机号码"
                :value="value15"
                @change="handleInput.bind(this, 'value15')"
              >
                <view
                  :style="{
                    color: disabled ? '#FF4949' : '',
                    fontSize: '12px',
                    width: '90px',
                  }"
                  @tap="sendCode"
                >
                  {{ showTipText() }}
                </view>
              </at-input>
            </at-form>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import AtForm from '@/components/form'
import AtInput from '@/components/input'
import DocsHeader from '../../components/doc-header'
// import verificationCode from '@/assets/images/verification_code.png'
import './index.scss'

export default defineComponent({
  components: {
    AtForm,
    AtInput,
    DocsHeader,
  },

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

    function handleInput(stateName, value) {
      state[stateName] = value
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
      // verificationCode,
      handleInput,
      showTipText,
      sendCode,
      onClickErrorIcon,
      handleKeyboardHeightChange
    }
  }
})
</script>