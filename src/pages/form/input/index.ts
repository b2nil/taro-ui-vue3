import { h, defineComponent, reactive } from 'vue'
import AtForm from '@/components/form'
import AtInput from '@/components/input'
import DocsHeader from '../../components/doc-header'
import verificationCode from '@/assets/images/verification_code.png'
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

    return () => {
        return h('view', {class: 'page'}, [
            // Doc Header
            h(DocsHeader, { title: 'Input 输入框'}),
            // Doc Body
            h('view', {class: 'doc-body'}, [
                // 基础用法
                h('view', {class: 'panel'}, [
                    h('view', {class: 'panel__title'}, '基础用法'),
                    h('view', { class: 'panel__content no-padding'}, [
                        h('view', {class: 'component-item'}, [
                            h(AtForm, null, [
                                h(AtInput, {
                                    name: 'value1',
                                    title: '标准五个字',
                                    type: 'text',
                                    placeholder: '标准五个字',
                                    value: state.value1,
                                    onChange: handleInput.bind(this, 'value1')
                                }),
                                h(AtInput, {
                                    name: 'value2',
                                    title: '标题实在特别长就换行',
                                    placeholder: '其他列保持正常间距',
                                    value: state.value2,
                                    onChange: handleInput.bind(this, 'value2')
                                }),
                                h(AtInput, {
                                    name: 'value3',
                                    title: '无标题',
                                    placeholder: '其他列保持正常间距',
                                    border: false,
                                    value: state.value3,
                                    onChange: handleInput.bind(this, 'value3')
                                }),
                            ])
                        ])
                    ])
                ]),
                // 输入框类型
                h('view', {class: 'panel'}, [
                    h('view', {class: 'panel__title'}, '输入框类型'),
                    h('view', { class: 'panel__content no-padding'}, [
                        h('view', {class: 'component-item'}, [
                            h(AtForm, null, [
                                h(AtInput, {
                                    name: 'value4',
                                    title: '文本',
                                    type: 'text',
                                    placeholder: '当行文本',
                                    value: state.value4,
                                    onChange: handleInput.bind(this, 'value4')
                                }),
                                h(AtInput, {
                                    name: 'value5',
                                    title: '数字',
                                    type: 'number',
                                    placeholder: '请输入数字',
                                    value: state.value5,
                                    onChange: handleInput.bind(this, 'value5')
                                }),
                                h(AtInput, {
                                    name: 'value6',
                                    title: '密码',
                                    type: 'password',
                                    placeholder: '密码不能少于 10 位数',
                                    value: state.value6,
                                    onChange: handleInput.bind(this, 'value6')
                                }),
                                h(AtInput, {
                                    name: 'value7',
                                    title: '身份证',
                                    type: 'idcard',
                                    placeholder: '身份证号码',
                                    value: state.value7,
                                    onChange: handleInput.bind(this, 'value7')
                                }),
                                h(AtInput, {
                                    name: 'value8',
                                    title: '小数',
                                    type: 'digit',
                                    placeholder: '请输入小数',
                                    value: state.value8,
                                    onChange: handleInput.bind(this, 'value8')
                                }),
                                h(AtInput, {
                                    name: 'value9',
                                    title: '手机号码',
                                    type: 'phone',
                                    placeholder: '手机号码',
                                    border: false,
                                    value: state.value9,
                                    onChange: handleInput.bind(this, 'value9')
                                }),
                            ])
                        ])
                    ])
                ]),
                // 状态
                h('view', {class: 'panel'}, [
                    h('view', {class: 'panel__title'}, '状态'),
                    h('view', { class: 'panel__content no-padding'}, [
                        h('view', {class: 'component-item'}, [
                            h(AtForm, null, [
                                h(AtInput, {
                                    name: 'value10',
                                    disabled: true,
                                    title: '禁用',
                                    type: 'text',
                                    placeholder: '禁止输入',
                                    border: false,
                                    value: state.value10,
                                    onChange: handleInput.bind(this, 'value10')
                                }),
                                h(AtInput, {
                                    name: 'value11',
                                    error: true,
                                    title: '出现错误',
                                    type: 'text',
                                    placeholder: '点击按钮触发回调',
                                    value: state.value11,
                                    onErrorClick: onClickErrorIcon,
                                    onChange: handleInput.bind(this, 'value11')
                                }),
                                h(AtInput, {
                                    name: 'value12',
                                    editable: false,
                                    title: '不可编辑',
                                    type: 'text',
                                    placeholder: '不可编辑的内容',
                                    value: '不可编辑的内容',
                                }),
                                h(AtInput, {
                                    name: 'value13',
                                    border: false,
                                    clear: true,
                                    title: '清楚按钮',
                                    type: 'text',
                                    placeholder: '点击清除按钮清空内容',
                                    value: state.value13,
                                    onChange: handleInput.bind(this, 'value13')
                                }),
                                h(AtInput, {
                                    name: 'value16',
                                    border: false,
                                    clear: true,
                                    required: true,
                                    title: '必填项',
                                    type: 'text',
                                    placeholder: '必填项内容',
                                    value: state.value16,
                                    onChange: handleInput.bind(this, 'value16')
                                }),
                                h(AtInput, {
                                    name: 'value17',
                                    border: false,
                                    clear: true,
                                    title: '监听事件',
                                    type: 'text',
                                    placeholder: '监听键盘高度事件',
                                    value: state.value17,
                                    onChange: handleInput.bind(this, 'value17'),
                                    onKeyboardHeighChange: handleKeyboardHeightChange,
                                }),
                            ])
                        ])
                    ])
                ]),
                // 自定义右边栏
                h('view', {class: 'panel'}, [
                    h('view', {class: 'panel__title'}, '自定义右边栏'),
                    h('view', { class: 'panel__content no-padding'}, [
                        h('view', {class: 'component-item'}, [
                            h(AtForm, null, [
                                h(AtInput, {
                                    name: "value14",
                                    title: "验证码",
                                    type: "text",
                                    maxLength: 4,
                                    clear: true,
                                    placeholder: "验证码",
                                    value: state.value14,
                                    onChange: handleInput.bind(this, 'value14')
                                }, [
                                    h('image', { src: verificationCode})
                                ]),
                                h(AtInput, {
                                    name: "value15",
                                    type: "phone",
                                    border: false,
                                    clear: true,
                                    placeholder: "请输入手机号码",
                                    value: state.value15,
                                    onChange: handleInput.bind(this, 'value15')
                                }, [
                                    h('view', {
                                        style: {
                                            color: state.disabled ? '#FF4949' : '',
                                            fontSize: '12px',
                                            width: '90px',
                                        },
                                        onTap: sendCode 
                                    }, showTipText())
                                ]),
                            ])
                        ])
                    ])
                ]),
            ])
        ])
    }
  }
})