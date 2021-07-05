import {
  TARO_ENV,
  genMountFn,
  testPropClassAndStyle
} from '@taro-ui-vue3/test-utils/helper'
import Taro from '@tarojs/taro'
import AtImagePicker from '../index.vue'
import { ref } from 'vue'

const mountFn = genMountFn(AtImagePicker)

const files = [
  {
    url: 'https://test.pic.com/PZUUCKTRIHWiZSY.jpeg',
    id: '2121',
    status: 'uploading',
  },
  {
    url: 'https://test.pic.com/hqQWgTXdrlmVVYi.jpeg',
    id: '2122',
    status: 'failed',
  },
  {
    url: 'https://test.pic.com/PZUUCKTRIHWiZSY.jpeg',
    id: '2123',
    status: 'uploading',
    message: '正在上传自定义消息'
  },
  {
    url: 'https://test.pic.com/PZUUCKTRIHWiZSY.jpeg',
    id: '2124',
    status: 'failed',
    message: '上传失败自定义消息'
  },
  {
    url: 'https://test.pic.com/PZUUCKTRIHWiZSY.jpeg',
    id: '2125',
  }
]



describe('AtImagePicker', () => {
  window.URL.revokeObjectURL = jest.fn()

  beforeAll(() => {
    process.env.TARO_ENV = 'weapp'
  })

  afterAll(() => {
    process.env.TARO_ENV = 'h5'
  })

  testPropClassAndStyle(mountFn)

  it('should render all nodes and match snapshot', async () => {
    const wrapper = mountFn({ files })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render prop files', async () => {
    const wrapper = mountFn({ files })
    const imageEls = wrapper.findAll('.at-image-picker__preview-img')
    const uploadingIconEls = wrapper.findAll('.at-loading')
    const failedIconEls = wrapper.findAll('.at-image-picker__status-icon--failed')
    const statusMessageEls = wrapper.findAll('.at-image-picker__status-message')

    expect(imageEls.length).toBe(files.length)

    expect(
      uploadingIconEls.length
    ).toBe(files.filter(({ status }) => status === 'uploading').length)

    expect(
      failedIconEls.length
    ).toBe(files.filter(({ status }) => status === 'failed').length)

    expect(
      statusMessageEls.length
    ).toBe(files.filter(({ message }) => !!message).length)

    imageEls.forEach((el, index) => {
      expect(el.attributes('src')).toEqual(files[index].url)

      const statusMessageEl = el.find('.at-image-picker__status-message')
      statusMessageEl.exists() && expect(
        statusMessageEl.text()
      ).toBe(files[index].message)
    })
  })

  it('should render prop length', async () => {
    let length = 5
    let row = Math.ceil((files.length + 1) / length)
    const wrapper = mountFn({ files, length })

    expect(
      wrapper.findAll('.at-image-picker__flex-item').length
    ).toBe(row * length)

    expect(
      wrapper.findAll('.at-image-picker__flex-box').length
    ).toBe(row)

    length = 0
    row = Math.ceil((files.length + 1) / 1)

    await wrapper.setProps({ length })
    await wrapper.vm.$nextTick()

    expect(
      wrapper.findAll('.at-image-picker__flex-item').length
    ).toBe(row * 1)

    expect(
      wrapper.findAll('.at-image-picker__flex-box').length
    ).toBe(row)
  })

  it.each([
    "scaleToFill",
    "aspectFit",
    "aspectFill",
    "widthFix",
    "top",
    "bottom",
    "center",
    "left",
    "right",
    "top left",
    "top right",
    "bottom left",
    "bottom right"
  ])('should render prop mode -- %s', async (modeOption) => {
    const wrapper = mountFn({ files, mode: modeOption })

    wrapper.findAll('.at-image-picker__preview-img').forEach(imageEl => {
      expect(imageEl.attributes('mode')).toBe(modeOption)
    })
  })

  it('should render prop showAddBtn', async () => {
    const wrapper = mountFn()
    expect(
      wrapper.find('.at-image-picker__choose-btn').exists()
    ).toBe(true)

    await wrapper.setProps({ showAddBtn: false })
    expect(
      wrapper.find('.at-image-picker__choose-btn').exists()
    ).toBe(false)
  })

  it('should render uploading status', async () => {
    const index = 4
    const status = 'uploading'
    const message = '正在上传'
    const _files = ref(files)
    const wrapper = mountFn({ files: _files })

    _files.value[index].status = status
    _files.value[index].message = message
    await wrapper.vm.$nextTick()

    const el = wrapper.findAll('.at-image-picker__item')[index]

    expect(el.find('.at-loading').exists()).toBeTruthy()
    expect(
      el.find('.at-image-picker__status-message').text()
    ).toBe(message)
  })

  it('should render failed status', async () => {
    const index = 4
    const status = 'failed'
    const message = '上传失败'
    const _files = ref(files)
    const wrapper = mountFn({ files: _files })

    _files.value[index].status = status
    _files.value[index].message = message
    await wrapper.vm.$nextTick()

    const el = wrapper.findAll('.at-image-picker__item')[index]

    el.get('.at-image-picker__status-icon--failed')
    expect(
      el.find('.at-image-picker__status-message').text()
    ).toBe(message)
  })

  it.each([
    ['done', {
      index: 4,
      status: 'done',
      message: '不会显示的 message'
    }],
    ['not provided', {
      index: 4,
      message: '不会显示的 message'
    }],
  ])('should not render upload-status if status is %s', async (
    desc,
    { index, status, message }: {
      index: number,
      status?: string,
      message?: string
    }
  ) => {
    const _files = ref(files)
    const wrapper = mountFn({ files: _files })
    _files.value[index].status = status
    _files.value[index].message = message
    await wrapper.vm.$nextTick()

    const el = wrapper.findAll('.at-image-picker__item')[index]
    expect(
      el.find('.at-image-picker__upload-status').exists()
    ).toBeFalsy()
  })

})

describe('AtImagePicker events', () => {

  afterEach(() => {
    process.env.TARO_ENV = 'h5'
  })

  it.each([
    'alipay',
    'weapp',
    'h5'
  ])('should emit change by clicking remove button in %s', async (env: TARO_ENV) => {
    process.env.TARO_ENV = env
    const _files = ref(files)
    const onChange = jest.fn((args) => {
      _files.value = args.files
    })
    const wrapper = mountFn({ files: _files, onChange: onChange })

    expect(
      wrapper.findAll('.at-image-picker__preview-img').length
    ).toBe(5)

    await wrapper.find('.at-image-picker__remove-btn').trigger('tap')

    expect(wrapper.emitted()).toHaveProperty('change')
    expect(onChange).toBeCalled()
    expect(_files.value.length).toBe(4)
    expect(_files.value[0].id).toBe("2122")

    await wrapper.vm.$nextTick()
    expect(
      wrapper.findAll('.at-image-picker__preview-img').length
    ).toBe(4)
  })

  it.each([
    'alipay',
    'weapp',
    'h5'
  ])('should emit change by clicking add button in %s', async (env: TARO_ENV) => {
    process.env.TARO_ENV = env
    const _files = ref(files)
    const onChange = jest.fn((args) => {
      _files.value = args.files
    })

    const wrapper = mountFn({
      files: _files, count: 9, multiple: true, onChange
    })

    expect(
      wrapper.findAll('.at-image-picker__preview-img').length
    ).toBe(5)

    await wrapper.find('.at-image-picker__choose-btn').trigger('tap')

    expect(wrapper.emitted()).toHaveProperty('change')
    expect(onChange).toBeCalled()
    expect(_files.value.length).toEqual(6)

    await wrapper.vm.$nextTick()
    expect(
      wrapper.findAll('.at-image-picker__preview-img').length
    ).toBe(6)
  })

  it('should emit image-click', async () => {
    const onImageClick = jest.fn()
    const wrapper = mountFn({ files: files, onImageClick })

    await wrapper.find('.at-image-picker__preview-img').trigger('tap')
    expect(wrapper.emitted()).toHaveProperty('image-click')
    expect(onImageClick).toBeCalled()
  })

  it('should emit fail if chooseImage fails', async () => {
    const spy = jest.spyOn(Taro, 'chooseImage').mockImplementation(() => {
      return new Promise((resolve, reject) => {
        reject({ errMsg: 'failed' })
      })
    })

    const onFail = jest.fn()
    const wrapper = mountFn({ files: files, onFail })

    await wrapper.find('.at-image-picker__choose-btn').trigger('tap')
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted()).toHaveProperty('fail')
    expect(onFail).toBeCalled()
    spy.mockClear()
  })
})
