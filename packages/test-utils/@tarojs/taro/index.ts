
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

export const getEnvMockFn = () => {
  if (!process.env.TARO_ENV) {
    process.env.TARO_ENV = 'h5'
  }
  return envs[process.env.TARO_ENV]
}

export const pxTransformMockFn = (size, designWidth = 750) => {
  if (!process.env.TARO_ENV) {
    process.env.TARO_ENV = 'h5'
  }

  const deviceRatio = {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  }

  if (!size) return ''

  return process.env.TARO_ENV === 'h5'
    ? Math.ceil(parseInt(`${size}`, 10) / 40 * 640 / designWidth * 10000) / 10000 + 'rem'
    : parseInt(size, 10) * deviceRatio[designWidth] + 'rpx'
}

export const querySelectorMockFn = (
  rect0 = { width: 30, left: 30, height: 30, right: 30 }
) => (): any => {
  const query = {
    exec: (cb) => { cb([rect0]) }
  }
  query['select'] = jest.fn().mockReturnValue({
    boundingClientRect: jest.fn().mockReturnValue(query)
  })

  return query
}

export const chooseImageMockFn = () => {
  return new Promise<any>((resolve) => {
    resolve({
      tempFilePaths: ['/path/to/file'],
      tempFiles: [{ path: '/path/to/file', size: 256 }],
      errMsg: ''
    })
  })
}

document.querySelector = jest.fn((sel) => {
  return {
    getBoundingClientRect: jest.fn().mockReturnValueOnce({ width: 30 })
  }
})