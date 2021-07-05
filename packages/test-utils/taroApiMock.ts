import * as utils from "@taro-ui-vue3/utils/common"
import Taro from '@tarojs/taro'
import { createAnimation } from '@tarojs/taro-h5'

import {
  getEnvMockFn,
  pxTransformMockFn,
  chooseImageMockFn,
  querySelectorMockFn
} from './@tarojs/taro'

Taro.pxTransform = pxTransformMockFn
Taro.chooseImage = chooseImageMockFn
Taro.createSelectorQuery = querySelectorMockFn()
Taro.createAnimation = createAnimation

let uuid: jest.SpyInstance
let getEnvs: jest.SpyInstance
let getenv: jest.SpyInstance
let pxTransform: jest.SpyInstance
let chooseImage: jest.SpyInstance

function initTaroMockApis() {
  beforeEach(() => {
    jest.mock('@tarojs/taro', () => {
      return Taro
    })

    jest.mock('@taro-ui-vue3/utils/common', () => {
      return utils
    })

    getenv = jest
      .spyOn(Taro, 'getEnv')
      .mockImplementation(getEnvMockFn)

    chooseImage = jest
      .spyOn(Taro, 'chooseImage')
      .mockImplementation(chooseImageMockFn)

    pxTransform = jest
      .spyOn(utils, 'pxTransform')
      .mockImplementation(pxTransformMockFn)

    uuid = jest
      .spyOn(utils, 'uuid')
      .mockReturnValue('__tests__2021')

    getEnvs = jest
      .spyOn(utils, 'getEnvs')
      .mockImplementation(() => {
        const env = getEnvMockFn()
        return {
          isWEAPP: env === 'WEAPP',
          isALIPAY: env === 'ALIPAY',
          isWEB: env === 'WEB'
        }
      })
  })

  afterEach(() => {
    uuid.mockRestore()
    getEnvs.mockRestore()
    getenv.mockRestore()
    pxTransform.mockRestore()
    chooseImage.mockRestore()
  })
}

export default initTaroMockApis
