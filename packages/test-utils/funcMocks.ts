import * as utils from "@taro-ui-vue3/utils/common"
import { pxTransformMockFn, getEnvMockFn } from './@tarojs/taro'

let uuid: jest.SpyInstance
let getEnvs: jest.SpyInstance
let pxTransform: jest.SpyInstance

function initMocks() {
  beforeEach(() => {
    jest.mock('@taro-ui-vue3/utils/common', () => {
      return utils
    })

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
    pxTransform.mockRestore()
  })
}

export default initMocks