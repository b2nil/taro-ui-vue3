declare module '*.png'
declare module '*.gif'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg'
declare module '*.css'
declare module '*.less'
declare module '*.scss'
declare module '*.sass'
declare module '*.styl'

// @ts-ignore
declare const process: {
  env: {
    TARO_ENV: 'weapp' | 'swan' | 'alipay' | 'h5' | 'rn' | 'tt' | 'quickapp' | 'qq' | 'jd';
    [key: string]: any
  }
}

declare namespace jest {
  interface Matchers<R, T> {
    /**
     * Ensure `console.warn` is called with expected message
     */
    toHaveBeenWarned(): R
    /**
     * Ensure previous `console.warn` is called with expected message
     */
    toHaveBeenWarnedLast(): R
    /**
     * Ensure `console.warn` is called n times with expected message
     */
    toHaveBeenWarnedTimes(expect: number): R
  }
}