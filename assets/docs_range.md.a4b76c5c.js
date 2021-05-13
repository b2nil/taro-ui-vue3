import{o as a,c as n,a as t}from"./app.d0e654bd.js";const s='{"title":"Range 范围选择器","description":"","frontmatter":{},"headers":[{"level":2,"title":"使用指南","slug":"使用指南"},{"level":2,"title":"一般用法","slug":"一般用法"},{"level":2,"title":"参数","slug":"参数"},{"level":2,"title":"事件","slug":"事件"}],"relativePath":"docs/range.md","lastUpdated":1619356090829}',p={},e=t('<h1 id="range-范围选择器"><a class="header-anchor" href="#range-范围选择器" aria-hidden="true">#</a> Range 范围选择器</h1><hr><p>范围选择器，允许用户在一个区间中选择特定值</p><h2 id="使用指南"><a class="header-anchor" href="#使用指南" aria-hidden="true">#</a> 使用指南</h2><p>在 Taro 文件中引入组件</p><div class="language-typescript"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> AtRange <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;taro-ui-vue3&#39;</span>\n</code></pre></div><p><strong>组件依赖的样式文件（仅按需引用时需要）</strong></p><div class="language-scss"><pre><code><span class="token keyword">@import</span> <span class="token string">&quot;taro-ui-vue3/dist/style/components/range.scss&quot;</span><span class="token punctuation">;</span>\n</code></pre></div><h2 id="一般用法"><a class="header-anchor" href="#一般用法" aria-hidden="true">#</a> 一般用法</h2><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>view</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&#39;</span>panel__content<span class="token punctuation">&#39;</span></span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>view</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&#39;</span>example-item<span class="token punctuation">&#39;</span></span><span class="token punctuation">&gt;</span></span>\n      数值范围：{{ value[0] }}~{{ value[1] }}\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>view</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>AtRange</span>\n      <span class="token attr-name">:min</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>30<span class="token punctuation">&quot;</span></span>\n      <span class="token attr-name">:max</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>90<span class="token punctuation">&quot;</span></span>\n      <span class="token attr-name">:value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>value<span class="token punctuation">&quot;</span></span>\n      <span class="token attr-name">@change</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>handleChange<span class="token punctuation">&quot;</span></span>\n    <span class="token punctuation">/&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>view</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n  name<span class="token operator">:</span> <span class="token string">&#39;AtRangePageDemo&#39;</span><span class="token punctuation">,</span>\n  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token punctuation">{</span>\n      value<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">50</span><span class="token punctuation">,</span> <span class="token number">60</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  methods<span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token function">handleChange</span><span class="token punctuation">(</span><span class="token parameter">val</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> val\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>\n</code></pre></div><h2 id="参数"><a class="header-anchor" href="#参数" aria-hidden="true">#</a> 参数</h2><table><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>可选值</th><th>默认值</th></tr></thead><tbody><tr><td>sliderStyle</td><td>滑块样式</td><td>Object or String</td><td>-</td><td>-</td></tr><tr><td>railStyle</td><td>未选中部分滑动条的样式</td><td>Object or String</td><td>-</td><td>-</td></tr><tr><td>trackStyle</td><td>选中部分滑动条的样式</td><td>Object or String</td><td>-</td><td>-</td></tr><tr><td>value</td><td>当前取值</td><td>Array</td><td>-</td><td>[0, 0]</td></tr><tr><td>min</td><td>最小值</td><td>Number</td><td>-</td><td>0</td></tr><tr><td>max</td><td>最大值</td><td>Number</td><td>-</td><td>100</td></tr><tr><td>blockSize</td><td>滑块大小</td><td>Number</td><td>-</td><td>28</td></tr><tr><td>disabled</td><td>是否禁用</td><td>Boolean</td><td>-</td><td>false</td></tr></tbody></table><h2 id="事件"><a class="header-anchor" href="#事件" aria-hidden="true">#</a> 事件</h2><table><thead><tr><th>事件名称</th><th>说明</th><th>返回参数</th></tr></thead><tbody><tr><td>onChange</td><td>当 Slider 的值发生改变时，会触发 onChange 事件，并把改变后的值作为参数传入。</td><td>(value: []) =&gt; void</td></tr><tr><td>onAfterChange</td><td>与 onTouchEnd 触发时机一致，把当前值作为参数传入。</td><td>(value: []) =&gt; void</td></tr></tbody></table>',14);p.render=function(t,s,p,o,c,l){return a(),n("div",null,[e])};export default p;export{s as __pageData};
