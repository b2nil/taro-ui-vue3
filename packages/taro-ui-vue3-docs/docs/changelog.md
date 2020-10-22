
# 更新日志

----

项目遵循 [Semantic Versioning 2.0.0](http://semver.org/lang/zh-CN/) 语义化版本规范

<div class="row changelog">
  <div class="at-timeline">
    <!-- v1.0.0-alpha.11 -->
    <div class="at-timeline__item at-timeline__item--last at-timeline__item--custom at-timeline__item--error">
      <div class="at-timeline__tail"></div>
      <div class="at-timeline__dot">
        <i class="at-icon at-icon-tag"></i>
      </div>
      <div class="at-timeline__content">
        <p class="head">v1.0.0-alpha.11</p>
        <p class="time">
          <span>2020-10-22</span>
        </p>
        <ul class="content">
          <li>修复 AtVirtualScroll 滚动时发生抖动(<a href="https://github.com/b2nil/taro-ui-vue3/issues/44">#44</a>) (4677951) </li>
          <li>新增 AtVirtualScroll viewport 属性 (e09a78c) </li>
        </ul>
      </div>
    </div>
    <!-- v1.0.0-alpha.10 -->
    <div class="at-timeline__item at-timeline__item--last at-timeline__item--custom at-timeline__item--error">
      <div class="at-timeline__tail"></div>
      <div class="at-timeline__dot">
        <i class="at-icon at-icon-tag"></i>
      </div>
      <div class="at-timeline__content">
        <p class="head">v1.0.0-alpha.10</p>
        <p class="time">
          <span>2020-10-21</span>
        </p>
        <ul class="content">
          <li>新增 AtVirtualScroll 虚拟列表组件 (2c523d8558cfd05886c45a0301ce886ba4dbfd88) </li>
        </ul>
      </div>
    </div>
    <!-- v1.0.0-alpha.9 -->
    <div class="at-timeline__item at-timeline__item--last at-timeline__item--custom at-timeline__item--error">
      <div class="at-timeline__tail"></div>
      <div class="at-timeline__dot">
        <i class="at-icon at-icon-tag"></i>
      </div>
      <div class="at-timeline__content">
        <p class="head">v1.0.0-alpha.9</p>
        <p class="time">
          <span>2020-10-19</span>
        </p>
        <ul class="content">
          <li>修复 AtListItem className 和 customStyle 未定义的问题 </li>
          <li>修复 H5 中 AtIndexes 点击字母索引跳转失效(<a href="https://github.com/b2nil/taro-ui-vue3/issues/38">#38</a>)</li>
          <li>修复 H5 中 AtSearchBar 点击搜索按钮后，不能彻底清空搜索内容(<a href="https://github.com/b2nil/taro-ui-vue3/issues/41">#41</a>)</li>
          <li>增强: 小程序以及 H5 AtSearchBar 的 onActionClick 事件默认清空搜索内容</li>
          <li>构建配置：修复 #40 H5 使用 Taro.xxx 接口的组件报错：Taro__default.default.xxx is not a function h5 (Thanks to @ljquan )(<a href="https://github.com/b2nil/taro-ui-vue3/issues/40">#40</a>)</li>
        </ul>
      </div>
    </div>
    <!-- v1.0.0-alpha.8 -->
    <div class="at-timeline__item at-timeline__item--last at-timeline__item--custom at-timeline__item--error">
      <div class="at-timeline__tail"></div>
      <div class="at-timeline__dot">
        <i class="at-icon at-icon-tag"></i>
      </div>
      <div class="at-timeline__content">
        <p class="head">v1.0.0-alpha.8</p>
        <p class="time">
          <span>2020-10-14</span>
        </p>
        <ul class="content">
          <li>修复 AtTabs 不能正常显示 Slot 内容 (<a href="https://github.com/b2nil/taro-ui-vue3/issues/35">#35</a>)</li>
          <li>移除 types 与 React 相关的依赖</li>
        </ul>
      </div>
    </div>
    <!-- v1.0.0-alpha.7 -->
    <div class="at-timeline__item at-timeline__item--last at-timeline__item--custom at-timeline__item--error">
      <div class="at-timeline__tail"></div>
      <div class="at-timeline__dot">
        <i class="at-icon at-icon-tag"></i>
      </div>
      <div class="at-timeline__content">
        <p class="head">v1.0.0-alpha.7</p>
        <p class="time">
          <span>2020-10-08</span>
        </p>
        <ul class="content">
          <li>修复 AtCurtain closeBtnPosition 默认类型错误</li>
          <li>导出 AtFlex 和 AtFlexItem</li>
          <li>更新与 H5 相关的 Readme、Config 等内容</li>
        </ul>
      </div>
    </div>
    <!-- v1.0.0-alpha.6 -->
      <div class="at-timeline__item at-timeline__item--last at-timeline__item--custom at-timeline__item--error">
      <div class="at-timeline__tail"></div>
      <div class="at-timeline__dot">
        <i class="at-icon at-icon-tag"></i>
      </div>
      <div class="at-timeline__content">
        <p class="head">v1.0.0-alpha.6</p>
        <p class="time">
          <span>2020-09-25</span>
        </p>
        <ul class="content">
          <li>采用函数式插槽（function slots）， 避免编译至 h5 时出现 non-funtion value encountered with default slot 的警告</li>
          <li>AtCalendar Demo: 修复跳转示例当月不能跳转的问题</li>
        </ul>
      </div>
    </div>
    <!-- v1.0.0-alpha.5 -->
    <div class="at-timeline__item at-timeline__item--last at-timeline__item--custom at-timeline__item--error">
      <div class="at-timeline__tail"></div>
      <div class="at-timeline__dot">
        <i class="at-icon at-icon-tag"></i>
      </div>
      <div class="at-timeline__content">
        <p class="head">v1.0.0-alpha.5</p>
        <p class="time">
          <span>2020-09-23</span>
        </p>
        <ul class="content">
          <li><span>AtFlex：</span>导出 AtFlex 和 AtFlexItem</li>
          <li>修复 <span>AtTabs </span> Alipay 小程序 Tab Item 标题换行</li>
          <li>修复 <span>AtInput， AtSearchBar</span> H5 和 Alipay 端不能彻底清除 input 的值  (<a href="https://github.com/b2nil/taro-ui-vue3/issues/30">#30</a>)</li>
          <li>修复 <span>AtAccordion</span> H5 Accordion 展开和收起动画异常  (<a href="https://github.com/b2nil/taro-ui-vue3/issues/29">#29</a>)</li>
        </ul>
      </div>
    </div>
    <!-- v1.0.0-alpha.4 -->
    <div class="at-timeline__item at-timeline__item--last at-timeline__item--custom at-timeline__item--error">
      <div class="at-timeline__tail"></div>
      <div class="at-timeline__dot">
        <i class="at-icon at-icon-tag"></i>
      </div>
      <div class="at-timeline__content">
        <p class="head">v1.0.0-alpha.4</p>
        <p class="time">
          <span>2020-09-20</span>
        </p>
        <ul class="content">
          <li>修复 AtCalendar 小程序端日期列表显示不全 (<a href="https://github.com/b2nil/taro-ui-vue3/issues/23">#23</a>)</li>
          <li>修复 AtCalendar Alipay 小程序滑动时不能更新月份 (<a href="https://github.com/b2nil/taro-ui-vue3/issues/22">#22</a>)</li>
          <li>修复 AtInput 各小程序端 clear 清除输入内容的逻辑</li>
          <li>修复 AtInput placeholder 显示样式</li>
          <li>修复 AtTextarea Alipay 小程序字数统计重复渲染 (<a href="https://github.com/b2nil/taro-ui-vue3/issues/24">#24</a>)</li>
          <li>修复 AtTextarea placeholder 显示样式</li>
          <li>修复 AtSearchBar 字节小程序端 input value 清除失效</li>
          <li>修复 AtActionSheetFooter 的 onClick 属性类型</li>
          <li>修复 Demo Pages Alipay 小程序端分包路径错误</li>
        </ul>
      </div>
    </div>
    <!-- v1.0.0-alpha.3 -->
    <div class="at-timeline__item at-timeline__item--last at-timeline__item--custom at-timeline__item--error">
      <div class="at-timeline__tail"></div>
      <div class="at-timeline__dot">
        <i class="at-icon at-icon-tag"></i>
      </div>
      <div class="at-timeline__content">
        <p class="head">v1.0.0-alpha.3</p>
        <p class="time">
          <span>2020-09-17</span>
        </p>
        <ul class="content">
          <li>修复 AtIndexes 的 onSrollIntoView 事件不能跳转至目标区域 (<a href="https://github.com/b2nil/taro-ui-vue3/issues/8">#8</a>)</li>
          <li>修复 Accordion 展开和收起动画异常  (<a href="https://github.com/b2nil/taro-ui-vue3/issues/13">#13</a>)</li>
          <li>AtIndexes 的索引列表增加了索引选中样式</li>
        </ul>
      </div>
    </div>
    <!-- v1.0.0-alpha.2 -->
    <div class="at-timeline__item at-timeline__item--last at-timeline__item--custom at-timeline__item--error">
      <div class="at-timeline__tail"></div>
      <div class="at-timeline__dot">
        <i class="at-icon at-icon-tag"></i>
      </div>
      <div class="at-timeline__content">
        <p class="head">v1.0.0-alpha.2</p>
        <p class="time">
          <span>2020-09-16</span>
        </p>
        <ul class="content">
          <li>移除 <span>classnames</span> 依赖</li>
          <li>使用 <span>class</span> 和 <span>style</span> 替代 Taro UI 组件的 <span>className</span> 和 <span>customStyle</span> 属性</li>
        </ul>
      </div>
    </div>
    <!-- v1.0.0-alpha.1 -->
    <div class="at-timeline__item at-timeline__item--last at-timeline__item--custom at-timeline__item--error">
      <div class="at-timeline__tail"></div>
      <div class="at-timeline__dot">
        <i class="at-icon at-icon-tag"></i>
      </div>
      <div class="at-timeline__content">
        <p class="head">v1.0.0-alpha.1</p>
        <p class="time">
          <span>2020-09-07</span>
        </p>
        <ul class="content">
          <li>发布 <span>Taro UI Vue3</span> v1.0.0-alpha.1</li>
          <li>发布第一个版本，包含 <span>50+</span> 个组件</li>
        </ul>
      </div>
    </div>
  </div>
</div>
