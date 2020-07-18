import Taro from '@tarojs/taro'

const { getEnv, ENV_TYPE } = Taro
const ENV = Taro.getEnv()

type ENVS = {
    isWEAPP: boolean,
    isALIPAY: boolean,
    isWEB: boolean,
}

const getEnvs = (): ENVS => {
    const env = getEnv()

    return {
        isWEAPP: env === ENV_TYPE.WEAPP,
        isALIPAY: env === ENV_TYPE.ALIPAY,
        isWEB: env === ENV_TYPE.WEB,
    }    
}

function pxTransform(size: number): string {
    if (!size) return ''

    const designWidth = 750
    const deviceRatio = {
        640: 2.34 / 2,
        750: 1,
        828: 1.81 / 2,
    }

    return `${size / deviceRatio[designWidth]}rpx`
}



export { 
    pxTransform,
    getEnvs,
}