const Taro = process.env.TARO_ENV === 'h5'
  ? require('@tarojs/taro/h5')
  : require('@tarojs/taro')

const runtime = require('@tarojs/runtime')
const { createAnimation } = require('@tarojs/taro-h5')

const ENV_TYPE = {
  WEAPP: 'WEAPP',
  WEB: 'WEB',
  RN: 'RN',
  SWAN: 'SWAN',
  ALIPAY: 'ALIPAY',
  TT: 'TT',
  QQ: 'QQ',
  JD: 'JD',
  QUICKAPP: 'QUICKAPP'
}

const envs = {
  "weapp": ENV_TYPE.WEAPP,
  "swan": ENV_TYPE.SWAN,
  "alipay": ENV_TYPE.ALIPAY,
  "h5": ENV_TYPE.WEB,
  "tt": ENV_TYPE.TT,
  "quickapp": ENV_TYPE.QUICKAPP,
  "qq": ENV_TYPE.QQ,
  "jd": ENV_TYPE.JD,
}

export const getEnvMockFn = jest.fn(() => {
  if (!process.env.TARO_ENV) {
    process.env.TARO_ENV = 'h5'
  }
  return envs[process.env.TARO_ENV]
})

export const pxTransformMockFn = jest.fn((size, designWidth) => {
  if (!size) return ''

  if (!designWidth) {
    designWidth = 750
  }

  if (!process.env.TARO_ENV) {
    process.env.TARO_ENV = 'h5'
  }

  const deviceRatio = {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  }

  return process.env.TARO_ENV === 'h5'
    ? Math.ceil(parseInt(`${size}`, 10) / 40 * 640 / designWidth * 10000) / 10000 + 'rem'
    : parseInt(size, 10) * deviceRatio[designWidth] + 'rpx'
})

export const querySelectorMockFn = (
  rect0 = { width: 30, left: 30, height: 30, right: 30 }
) => jest.fn(() => {
  const query = {
    exec: jest.fn()
      .mockImplementation((cb) => {
        cb([rect0])
      })
  }
  query['select'] = jest.fn().mockReturnValue({
    boundingClientRect: jest.fn().mockReturnValue(query)
  })

  return query
})

Taro.ENV_TYPE = ENV_TYPE
Taro.pxTransform = pxTransformMockFn
Taro.getEnv = getEnvMockFn
Taro.createSelectorQuery = querySelectorMockFn()
Taro.eventCenter = runtime.eventCenter
Taro.createAnimation = createAnimation

Taro.chooseImage = jest.fn(() => {
  return new Promise((resolve) => {
    resolve({
      tempFilePaths: [''],
      tempFiles: [{ path: '', size: 0 }],
      errMsg: ''
    })
  })
})

document.querySelector = jest.fn((sel) => {
  return {
    getBoundingClientRect: jest.fn().mockReturnValueOnce({ width: 30 })
  }
})

export default Taro