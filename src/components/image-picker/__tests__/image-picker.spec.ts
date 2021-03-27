import { mountFactory, Slots } from '@/tests/helper'
import AtImagePicker from '../index'
import Taro from '@tarojs/taro'
import { ref, unref } from 'vue'

const factory = (
  props: object = {},
  slots?: Slots
) => {
  return mountFactory(AtImagePicker, undefined, props, slots)
}

const files = ref([
  {
    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
    id: '2121',
    status: 'uploading',
  },
  {
    url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
    id: '2122',
    status: 'failed',
  },
  {
    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
    id: '2121',
    status: 'uploading',
    message: '正在上传自定义消息'
  },
  {
    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
    id: '2121',
    status: 'failed',
    message: '上传失败自定义消息'
  },
  {
    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
    id: '2121',
  },
])

describe('AtImagePicker', () => {
  let getEnv
  window.URL.revokeObjectURL = jest.fn()

  beforeEach(() => {
    jest.mock('@tarojs/taro')
    getEnv = jest.spyOn(Taro, 'getEnv').mockImplementation(() => {
      return Taro.ENV_TYPE.WEAPP
    })
  })

  afterEach(() => {
    getEnv.mockClear()
  })

  it('should render all nodes and match snapshot', async () => {
    const wrapper = factory({ files })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render prop class', async () => {
    const wrapper = factory({ class: 'test' })
    expect(wrapper.find('.at-image-picker').classes()).toContain('test')
  })

  it('should render prop style', async () => {
    const wrapper = factory({ style: 'color: red;' })
    expect(wrapper.find('.at-image-picker').attributes('style')).toEqual('color: red;')
  })

  it('should render prop files', async () => {
    const wrapper = factory({ files: files })
    const imageEls = wrapper.findAll('.at-image-picker__preview-img')
    const uploadingIconEls = wrapper.findAll('.at-loading')
    const failedIconEls = wrapper.findAll('.at-image-picker__status-icon--failed')
    const statusMessageEls = wrapper.findAll('.at-image-picker__status-message')
    expect(imageEls.length).toBe(unref(files).length)
    expect(uploadingIconEls.length).toBe(unref(files).filter(({ status }) => status === 'uploading').length)
    expect(failedIconEls.length).toBe(unref(files).filter(({ status }) => status === 'failed').length)
    expect(statusMessageEls.length).toBe(unref(files).filter(({ message }) => !!message).length)
    imageEls.forEach((el, index) => {
      expect(el.attributes('src')).toEqual(unref(files)[index].url)
      const statusMessageEl = el.find('.at-image-picker__status-message')
      statusMessageEl.exists() && expect(statusMessageEl.text()).toBe(unref(files)[index].message)
    })
  })

  it('should render prop length', async () => {
    let length = 5
    let row = Math.ceil((unref(files).length + 1) / length)
    const wrapper = factory({ files: files, length })
    expect(wrapper.findAll('.at-image-picker__flex-item').length).toBe(row * length)
    expect(wrapper.findAll('.at-image-picker__flex-box').length).toBe(row)

    length = 0
    row = Math.ceil((unref(files).length + 1) / 1)
    await wrapper.setProps({ length })
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('.at-image-picker__flex-item').length).toBe(row * 1)
    expect(wrapper.findAll('.at-image-picker__flex-box').length).toBe(row)
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
    const wrapper = factory({ files: files, mode: modeOption })
    wrapper.findAll('.at-image-picker__preview-img').forEach(imageEl => {
      expect(imageEl.attributes('mode')).toBe(modeOption)
    })
  })

  it('should render prop showAddBtn', async () => {
    const wrapper = factory()
    expect(wrapper.find('.at-image-picker__choose-btn').exists()).toBe(true)

    await wrapper.setProps({ showAddBtn: false })
    expect(wrapper.find('.at-image-picker__choose-btn').exists()).toBe(false)
  })

})

describe('AtImagePicker Behaviours', () => {
  let getEnv
  beforeEach(() => {
    jest.mock('@tarojs/taro')
    getEnv = jest.spyOn(Taro, 'getEnv').mockImplementation(() => {
      return Taro.ENV_TYPE.WEAPP
    })
  })

  afterEach(() => {
    getEnv.mockClear()
  })

  it('should trigger onChange by clicking remove button', async () => {
    const onChange = jest.fn()
    const wrapper = factory({ files: files, onChange: onChange })
    expect(wrapper.findAll('.at-image-picker__preview-img').length).toBe(5)

    await wrapper.find('.at-image-picker__remove-btn').trigger('tap')
    expect(onChange).toBeCalled()
    expect(wrapper.findAll('.at-image-picker__preview-img').length).toBe(5)
  })

  it('should trigger onChange by clicking add button', async () => {
    const spy = jest.spyOn(Taro, 'chooseImage').mockImplementation(() => {
      return new Promise((resolve) => {
        resolve({
          tempFilePaths: [''],
          tempFiles: [{ path: '', size: 0 }],
          errMsg: ''
        })
      })
    })

    const onChange = jest.fn()
    const wrapper = factory({ files: files, onChange: onChange, count: 9, multiple: true })
    expect(wrapper.findAll('.at-image-picker__preview-img').length).toBe(5)

    await wrapper.find('.at-image-picker__choose-btn').trigger('tap')
    expect(onChange).toBeCalled()

    spy.mockClear()
  })

  it('should trigger onImageClick', async () => {
    const onImageClick = jest.fn()
    const wrapper = factory({ files: files, onImageClick: onImageClick })

    await wrapper.find('.at-image-picker__preview-img').trigger('tap')
    expect(onImageClick).toBeCalled()
  })

  it('should trigger onFail if chooseImage fails', async () => {
    const spy = jest.spyOn(Taro, 'chooseImage').mockImplementation(() => {
      return new Promise((resolve, reject) => {
        reject({ errMsg: 'failed' })
      })
    })

    const onFail = jest.fn()
    const wrapper = factory({ files: files, onFail: onFail })

    await wrapper.find('.at-image-picker__choose-btn').trigger('tap')
    await wrapper.vm.$nextTick()
    expect(onFail).toBeCalled()
    spy.mockClear()
  })

  test('modify files to show uploading status', async () => {
    const index = 4
    const status = 'uploading'
    const message = '正在上传'
    const wrapper = factory({ files: files })
    unref(files)[index].status = status
    unref(files)[index].message = message
    await wrapper.vm.$nextTick()
    const el = wrapper.findAll('.at-image-picker__item')[index]
    expect(el.find('.at-loading').exists()).toBeTruthy()
    expect(el.find('.at-image-picker__status-message').text()).toBe(message)
  })

  test('modify files to show failed status', async () => {
    const index = 4
    const status = 'failed'
    const message = '上传失败'
    const wrapper = factory({ files: files })
    unref(files)[index].status = status
    unref(files)[index].message = message
    await wrapper.vm.$nextTick()
    const el = wrapper.findAll('.at-image-picker__item')[index]
    el.get('.at-image-picker__status-icon--failed')
    expect(el.find('.at-image-picker__status-message').text()).toBe(message)
  })

  it.each([
    {
      index: 4,
      status: 'done',
      message: '不会显示的message'
    },
    {
      index: 4,
      status: '',
      message: '不会显示的message'
    },
    {
      index: 4,
      message: '不会显示的message'
    },
    {
      index: 4,
    }
  ])('modify files to show done status ', async ({ index, status, message }) => {
    const wrapper = factory({ files: files })
    unref(files)[index].status = status
    unref(files)[index].message = message
    await wrapper.vm.$nextTick()
    const el = wrapper.findAll('.at-image-picker__item')[index]
    expect(() => el.get('.at-image-picker__upload-status')).toThrowError()
  })

})
