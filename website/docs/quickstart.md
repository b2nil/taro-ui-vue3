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

### 3. 安装 Taro UI Vue3

```bash
$ cd myApp
$ npm install taro-ui-vue3
```

**P.S.因为要支持自定义主题功能，需要将样式从组件中抽离出来，在微信小程序中依赖 globalClass 功能，所以需要微信基础库版本在 v2.2.3 以上。**

#### 配置需要额外编译的源码模块

由于引用 `node_modules` 的模块，默认不会编译，所以需要额外给 H5 配置 `esnextModules`，在 taro 项目的 `config/index.js` 中新增如下配置项：

```typescript
h5: {
  esnextModules: ['taro-ui-vue3']
}
```

### 4. 使用 Taro UI Vue3

#### 引入所需组件

在代码中 `import` 需要的组件并按照文档说明使用

```typescript
// page.js
import { AtButton } from 'taro-ui-vue3'

// 或者从 taro-ui-vue3/lib 中按需引入组件，在少量使用组件的情况下，可大幅减少打包大小
import { AtButton } from 'taro-ui-vue3/lib'

// 除了引入所需的组件，还需要手动引入组件样式
// app.js
import 'taro-ui/dist/style/index.scss' // 全局引入一次即可
```

**引入组件样式的三种方式**

- **全局引入（JS中）：** 在入口文件中引入 `taro-ui-vue3` 所有的样式
```typescript
import 'taro-ui/dist/style/index.scss' // 引入组件样式 - 方式一
```

- **全局引入（CSS中）：** 在 `app.scss` 样式文件中 `import` 组件样式并按照文档说明使用
```scss
@import "taro-ui-vue3/dist/style/index.scss"; // 引入组件样式 - 方式二
```

- **按需引入：** 在页面样式或全局样式中 `import` 需要的组件样式
```scss
@import "taro-ui-vue3/dist/style/components/button.scss"; // 引入所需的组件样式 - 方式三
```

> 具体的组件样式文件请查看 [组件样式列表](https://github.com/b2nil/taro-ui-vue3/tree/master/src/style/components)

## 示例

在 `/myApp/src/pages/index/index.tsx` 文件添加以下代码


```vue
<template>
  <view class='index'>
    <AtButton type='primary' @click="handleClick">按钮文案</AtButton>
  </view>
</template>
<script>
import { AtButton } from "taro-ui-vue3"
import './index.scss'

export default {
  name: 'Index',
  component: {
    AtButton
  },
  methods: {
    handleClick () {
      console.log('click button)
    }
  }
}
</script>
```


在 `/myApp/src/app.scss` 文件中添加如下代码

```scss
@import "taro-ui-vue3/dist/style/index.scss"; // 引入组件样式，仅需引入一次即可
```

## 按需引入

如果你只希望引入部分组件，比如 Button，那么可以只 `@import` 需要的样式文件

```scss
@import "taro-ui-vue3/dist/style/components/button.scss";
```

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
