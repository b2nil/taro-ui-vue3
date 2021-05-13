import{o as n,c as s,a}from"./app.d0e654bd.js";const t='{"title":"Steps 步骤条","description":"","frontmatter":{},"headers":[{"level":2,"title":"使用指南","slug":"使用指南"},{"level":2,"title":"一般用法","slug":"一般用法"},{"level":2,"title":"自定义图标","slug":"自定义图标"},{"level":2,"title":"状态步骤条","slug":"状态步骤条"},{"level":2,"title":"AtSteps 参数","slug":"atsteps-参数"},{"level":2,"title":"AtSteps 事件","slug":"atsteps-事件"},{"level":2,"title":"items object 字段说明","slug":"items-object-字段说明"}],"relativePath":"docs/steps.md","lastUpdated":1619356091014}',p={},o=a('<h1 id="steps-步骤条"><a class="header-anchor" href="#steps-步骤条" aria-hidden="true">#</a> Steps 步骤条</h1><hr><p>步骤条组件，建议步骤在2～3之内</p><h2 id="使用指南"><a class="header-anchor" href="#使用指南" aria-hidden="true">#</a> 使用指南</h2><p>在 Taro 文件中引入组件</p><div class="language-typescript"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> AtSteps <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;taro-ui-vue3&#39;</span>\n</code></pre></div><p><strong>组件依赖的样式文件（仅按需引用时需要）</strong></p><div class="language-scss"><pre><code><span class="token keyword">@import</span> <span class="token string">&quot;taro-ui-vue3/dist/style/components/steps.scss&quot;</span><span class="token punctuation">;</span>\n</code></pre></div><h2 id="一般用法"><a class="header-anchor" href="#一般用法" aria-hidden="true">#</a> 一般用法</h2><p>说明:</p><ul><li>该组件为受控组件，开发者需要通过 onChange 事件来更新 current 值变化，current 与 onChange 函数必填</li></ul><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>view</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&#39;</span>example-item<span class="token punctuation">&#39;</span></span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>AtSteps</span>\n      <span class="token attr-name">:items</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>items3<span class="token punctuation">&quot;</span></span>\n      <span class="token attr-name">:current</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>current3<span class="token punctuation">&quot;</span></span>\n      <span class="token attr-name">@change</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>onChange<span class="token punctuation">&quot;</span></span>\n    <span class="token punctuation">/&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>view</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">\n<span class="token keyword">const</span> items3 <span class="token operator">=</span> <span class="token punctuation">[</span>\n  <span class="token punctuation">{</span> title<span class="token operator">:</span> <span class="token string">&#39;步骤一&#39;</span><span class="token punctuation">,</span> desc<span class="token operator">:</span> <span class="token string">&#39;这里是额外的信息，最多两行&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span> title<span class="token operator">:</span> <span class="token string">&#39;步骤二&#39;</span><span class="token punctuation">,</span> desc<span class="token operator">:</span> <span class="token string">&#39;这里是额外的信息，最多两行&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span> title<span class="token operator">:</span> <span class="token string">&#39;步骤三&#39;</span><span class="token punctuation">,</span> desc<span class="token operator">:</span> <span class="token string">&#39;这里是额外的信息，最多两行&#39;</span> <span class="token punctuation">}</span>\n<span class="token punctuation">]</span>\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n  name<span class="token operator">:</span> <span class="token string">&#39;AtStepsDemo&#39;</span><span class="token punctuation">,</span>\n  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token punctuation">{</span>\n      current3<span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>\n      item3\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  methods<span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token function">onChange</span><span class="token punctuation">(</span><span class="token parameter">val</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">this</span><span class="token punctuation">.</span>current3 <span class="token operator">=</span> val\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>\n\n</code></pre></div><h2 id="自定义图标"><a class="header-anchor" href="#自定义图标" aria-hidden="true">#</a> 自定义图标</h2><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>view</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&#39;</span>example-item<span class="token punctuation">&#39;</span></span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>AtSteps</span>\n      <span class="token attr-name">:items</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>items<span class="token punctuation">&quot;</span></span>\n      <span class="token attr-name">:current</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>value<span class="token punctuation">&quot;</span></span>\n      <span class="token attr-name">@change</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>onChange<span class="token punctuation">&quot;</span></span>\n    <span class="token punctuation">/&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>view</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">\n<span class="token keyword">const</span> items <span class="token operator">=</span> <span class="token punctuation">[</span>\n    <span class="token punctuation">{</span>\n      title<span class="token operator">:</span> <span class="token string">&#39;步骤一&#39;</span><span class="token punctuation">,</span>\n      desc<span class="token operator">:</span> <span class="token string">&#39;这里是额外的信息，最多两行&#39;</span><span class="token punctuation">,</span>\n      icon<span class="token operator">:</span> <span class="token punctuation">{</span>\n        value<span class="token operator">:</span> <span class="token string">&#39;sound&#39;</span><span class="token punctuation">,</span>\n        activeColor<span class="token operator">:</span> <span class="token string">&#39;#fff&#39;</span><span class="token punctuation">,</span>\n        inactiveColor<span class="token operator">:</span> <span class="token string">&#39;#78A4FA&#39;</span><span class="token punctuation">,</span>\n        size<span class="token operator">:</span> <span class="token string">&#39;14&#39;</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">{</span>\n      title<span class="token operator">:</span> <span class="token string">&#39;步骤二&#39;</span><span class="token punctuation">,</span>\n      desc<span class="token operator">:</span> <span class="token string">&#39;这里是额外的信息，最多两行&#39;</span><span class="token punctuation">,</span>\n      icon<span class="token operator">:</span> <span class="token punctuation">{</span>\n        value<span class="token operator">:</span> <span class="token string">&#39;shopping-cart&#39;</span><span class="token punctuation">,</span>\n        activeColor<span class="token operator">:</span> <span class="token string">&#39;#fff&#39;</span><span class="token punctuation">,</span>\n        inactiveColor<span class="token operator">:</span> <span class="token string">&#39;#78A4FA&#39;</span><span class="token punctuation">,</span>\n        size<span class="token operator">:</span> <span class="token string">&#39;14&#39;</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">{</span>\n      title<span class="token operator">:</span> <span class="token string">&#39;步骤三&#39;</span><span class="token punctuation">,</span>\n      desc<span class="token operator">:</span> <span class="token string">&#39;这里是额外的信息，最多两行&#39;</span><span class="token punctuation">,</span>\n      icon<span class="token operator">:</span> <span class="token punctuation">{</span>\n        value<span class="token operator">:</span> <span class="token string">&#39;camera&#39;</span><span class="token punctuation">,</span>\n        activeColor<span class="token operator">:</span> <span class="token string">&#39;#fff&#39;</span><span class="token punctuation">,</span>\n        inactiveColor<span class="token operator">:</span> <span class="token string">&#39;#78A4FA&#39;</span><span class="token punctuation">,</span>\n        size<span class="token operator">:</span> <span class="token string">&#39;14&#39;</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">]</span>\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n  name<span class="token operator">:</span> <span class="token string">&#39;AtStepsDemo&#39;</span><span class="token punctuation">,</span>\n  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token punctuation">{</span>\n      value<span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>\n      items\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  methods<span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token function">onChange</span><span class="token punctuation">(</span><span class="token parameter">val</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> val\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>\n</code></pre></div><h2 id="状态步骤条"><a class="header-anchor" href="#状态步骤条" aria-hidden="true">#</a> 状态步骤条</h2><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>view</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&#39;</span>example-item<span class="token punctuation">&#39;</span></span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>AtSteps</span>\n      <span class="token attr-name">:items</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>items<span class="token punctuation">&quot;</span></span>\n      <span class="token attr-name">:current</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>value<span class="token punctuation">&quot;</span></span>\n      <span class="token attr-name">@change</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>onChange<span class="token punctuation">&quot;</span></span>\n    <span class="token punctuation">/&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>view</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">\n<span class="token keyword">const</span> items <span class="token operator">=</span> <span class="token punctuation">[</span>\n    <span class="token punctuation">{</span>\n      title<span class="token operator">:</span> <span class="token string">&#39;步骤一&#39;</span><span class="token punctuation">,</span>\n      desc<span class="token operator">:</span> <span class="token string">&#39;这里是额外的信息，最多两行&#39;</span><span class="token punctuation">,</span>\n      status<span class="token operator">:</span> <span class="token string">&#39;success&#39;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">{</span>\n      title<span class="token operator">:</span> <span class="token string">&#39;步骤二&#39;</span><span class="token punctuation">,</span>\n      desc<span class="token operator">:</span> <span class="token string">&#39;这里是额外的信息，最多两行&#39;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">{</span>\n      title<span class="token operator">:</span> <span class="token string">&#39;步骤三&#39;</span><span class="token punctuation">,</span>\n      desc<span class="token operator">:</span> <span class="token string">&#39;这里是额外的信息，最多两行&#39;</span><span class="token punctuation">,</span>\n      status<span class="token operator">:</span> <span class="token string">&#39;error&#39;</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">]</span>\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n  name<span class="token operator">:</span> <span class="token string">&#39;AtStepsDemo&#39;</span><span class="token punctuation">,</span>\n  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token punctuation">{</span>\n      value<span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>\n      items\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  methods<span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token function">onChange</span><span class="token punctuation">(</span><span class="token parameter">val</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> val\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>\n</code></pre></div><h2 id="atsteps-参数"><a class="header-anchor" href="#atsteps-参数" aria-hidden="true">#</a> AtSteps 参数</h2><table><thead><tr><th>参数</th><th>微信小程序</th><th>h5</th><th>说明</th><th>类型</th><th>可选值</th><th>默认值</th></tr></thead><tbody><tr><td>current</td><td>√</td><td>√</td><td>必填，当前步骤索引值，开发者需要通过 onChange 事件来更新 current 值</td><td>Number</td><td>-</td><td>0</td></tr><tr><td>items</td><td>√</td><td>√</td><td>步骤条数据列表, 具体字段详见下表</td><td>Item[]</td><td>-</td><td>-</td></tr></tbody></table><h2 id="atsteps-事件"><a class="header-anchor" href="#atsteps-事件" aria-hidden="true">#</a> AtSteps 事件</h2><table><thead><tr><th>事件名称</th><th>说明</th><th>返回参数</th></tr></thead><tbody><tr><td>onChange</td><td>点击触发事件，开发者需要通过 onChange 事件来更新 current，onChange 函数必填</td><td>current,步骤索引值</td></tr></tbody></table><h2 id="items-object-字段说明"><a class="header-anchor" href="#items-object-字段说明" aria-hidden="true">#</a> items object 字段说明</h2><table><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>可选值</th><th>默认值</th></tr></thead><tbody><tr><td>title</td><td>步骤标题</td><td>String</td><td>-</td><td>-</td></tr><tr><td>desc</td><td>步骤说明文字</td><td>String</td><td>-</td><td>-</td></tr><tr><td>status</td><td>步骤的状态，只允许 &#39;success&#39; 或 &#39;error&#39;</td><td>String</td><td>&#39;success&#39;, &#39;error&#39;</td><td>-</td></tr><tr><td>icon</td><td>图标信息，value： 图标类型，activeColor： 激活态颜色，inactiveColor： 非激活态颜色，size： 大小</td><td>Object</td><td>-</td><td>-</td></tr></tbody></table>',22);p.render=function(a,t,p,e,c,l){return n(),s("div",null,[o])};export default p;export{t as __pageData};
