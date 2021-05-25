# 快速上手

---

## 使用前准备

在使用之前，推荐学习 `Taro` 和 `ES2015`，并正确配置 `Node.js` v8.x 或以上版本

## 如何使用

### 1. 安装 Taro 脚手架工具

安装 `Taro` 开发工具 `@tarojs/cli`

使用 `npm` 或者 `yarn` 全局安装，或者直接使用 [npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b)

```bash
$ npm install -g @tarojs/cli
$ yarn global add @tarojs/cli
```

### 2. 初始化项目


```bash
$ taro init myApp
```

### 3. 安装 `taro-ui-vue3`

```bash
$ cd myApp
$ npm install taro-ui-vue3
```

> 因为要支持自定义主题功能，需要将样式从组件中抽离出来，在微信小程序中依赖 globalClass 功能，所以需要微信基础库版本在 v2.2.3 以上。


### 4. 使用 `taro-ui-vue3`

#### **全局引用组件和样式 -- 引用全部组件和样式**
  ```typescript
  import { createApp } from 'vue'
  import { createUI } from 'taro-ui-vue3'

  // 引用全部组件样式
  import 'taro-ui-vue3/dist/style/index.scss'
  
  const App = createApp({
    onShow(options) { },
  })

  // 引用全部组件
  const tuv3 = createUI()
  App.use(tuv3)

  export default App
  ```

#### **全局引用组件和样式 -- 按需引用部分组件和样式**
  ```typescript
  import { createApp } from 'vue'
  import { createUI } from 'taro-ui-vue3'
  import { 
    AtButton, 
    AtInput, 
    AtTabs 
  } from 'taro-ui-vue3/lib'

  // 引用上述组件对应的样式文件
  import 'taro-ui-vue3/dist/style/components/button.scss'
  import 'taro-ui-vue3/dist/style/components/input.scss'
  import 'taro-ui-vue3/dist/style/components/tabs.scss'

  const App = createApp({
    onShow(options) { },
  })
  
  // 引用部分组件
  const tuv3 = createUI({
    AtButton, 
    AtInput, 
    AtTabs
  })
  App.use(tuv3)

  export default App
  ```

#### **局部按需引用部分组件和组件样式**

  ```typescript
  import { AtButton } from 'taro-ui-vue3/lib'
  import 'taro-ui-vue3/dist/style/components/button.scss'

  export default {
    components: {
      AtButton
    }
  }
  ```

#### **在样式文件中引用组件样式**
  ```scss
  //在 `app.scss` 样式中引入全部或部分组件样式
  @import "taro-ui-vue3/dist/style/index.scss"; 

  // 在页面样式中引入样式中部分组件样式
  @import "taro-ui-vue3/dist/style/components/button.scss"; 
  ```

> 具体的组件样式文件请查看 [组件样式列表](https://github.com/b2nil/taro-ui-vue3/tree/master/src/style/components)


## 编译并预览

进入项目目录开始开发，可以选择小程序预览模式，或者 h5 预览模式，若使用小程序预览模式，则需要自行下载并打开对应的小程序开发者工具，并选择预览项目根目录。

**微信小程序编译预览模式**

```bash
# npm script
$ npm run dev:weapp
# 仅限全局安装
$ taro build --type weapp --watch
# npx用户也可以使用
$ npx taro build --type weapp --watch
```

**支付宝小程序编译预览模式**

```bash
# npm script
$ npm run dev:alipay
# 仅限全局安装
$ taro build --type alipay --watch
# npx 用户也可以使用
$ npx taro build --type alipay --watch
```

**百度小程序编译预览模式**

```bash
# npm script
$ npm run dev:swan
# 仅限全局安装
$ taro build --type swan --watch
# npx 用户也可以使用
$ npx taro build --type swan --watch
```

**H5 编译预览模式**

使用 `taro-ui-vue3` 的项目编译至 h5 时，暂时需要使用脚本先修改 `@tarojs/components/dist-h5/vue3/index.js`， 将所有组件导出，方便按需引用。然后通过 webpack 配置 `alias` 将 `@tarojs/components$` 指向 `@tarojs/components/dist-h5/vue3/index.js`。 

具体 h5 编译配置方案如下：

- 在项目的 `config` 目录下增加一个 h5 构建脚本: [h5-building-script.js](https://raw.githubusercontent.com/b2nil/taro-ui-vue3/master/config/h5-building-script.js)

- 将 `package.json` 下的 `build:h5` 命令修改为： `"build:h5": "node ./config/h5-building-script.js && taro build --type h5"`

- 在 `config/index.js` 中的 `h5` 下添加 webpack alias 设置：
  ```ts
  h5: {
    webpackChain(chain) {
      chain.resolve.alias
        .set(
          '@tarojs/components$',
          '@tarojs/components/dist-h5/vue3/index.js'
        )
    }
  }
  ```

然后运行下列命令之一进行编译：

```bash
# npm script
$ npm run dev:h5
# 仅限全局安装
$ taro build --type h5 --watch
# npx 用户也可以使用
$ npx taro build --type h5 --watch
```
