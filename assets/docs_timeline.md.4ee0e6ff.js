import{o as t,c as n,a}from"./app.d0e654bd.js";const s='{"title":"Timeline 时间轴","description":"","frontmatter":{},"headers":[{"level":2,"title":"使用指南","slug":"使用指南"},{"level":2,"title":"用法","slug":"用法"},{"level":2,"title":"自定义默认图标颜色、自定义图标","slug":"自定义默认图标颜色、自定义图标"},{"level":2,"title":"标记最后一个为幽灵节点（即时间轴未完成，还在记录过程中）","slug":"标记最后一个为幽灵节点（即时间轴未完成，还在记录过程中）"},{"level":2,"title":"添加更多内容","slug":"添加更多内容"},{"level":2,"title":"Timeline 参数","slug":"timeline-参数"},{"level":2,"title":"items object 字段详解","slug":"items-object-字段详解"}],"relativePath":"docs/timeline.md","lastUpdated":1619356091206}',e={},p=a('<h1 id="timeline-时间轴"><a class="header-anchor" href="#timeline-时间轴" aria-hidden="true">#</a> Timeline 时间轴</h1><hr><p>垂直展示一系列的时间流信息。</p><h2 id="使用指南"><a class="header-anchor" href="#使用指南" aria-hidden="true">#</a> 使用指南</h2><p>在 Taro 文件中引入组件</p><div class="language-typescript"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> AtTimeline <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;taro-ui-vue3&#39;</span>\n</code></pre></div><p><strong>组件依赖的样式文件（仅按需引用时需要）</strong></p><div class="language-scss"><pre><code><span class="token keyword">@import</span> <span class="token string">&quot;taro-ui-vue3/dist/style/components/timeline.scss&quot;</span><span class="token punctuation">;</span>\n</code></pre></div><h2 id="用法"><a class="header-anchor" href="#用法" aria-hidden="true">#</a> 用法</h2><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>AtTimeline</span> \n  <span class="token attr-name">:items</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>[\n    { title: <span class="token punctuation">&#39;</span>刷牙洗脸<span class="token punctuation">&#39;</span> }, \n    { title: <span class="token punctuation">&#39;</span>吃早餐<span class="token punctuation">&#39;</span> }, \n    { title: <span class="token punctuation">&#39;</span>上班<span class="token punctuation">&#39;</span> }, \n    { title: <span class="token punctuation">&#39;</span>睡觉<span class="token punctuation">&#39;</span> }\n  ]<span class="token punctuation">&quot;</span></span>\n<span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>AtTimeline</span><span class="token punctuation">&gt;</span></span>\n</code></pre></div><h2 id="自定义默认图标颜色、自定义图标"><a class="header-anchor" href="#自定义默认图标颜色、自定义图标" aria-hidden="true">#</a> 自定义默认图标颜色、自定义图标</h2><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>AtTimeline</span> \n  <span class="token attr-name">:items</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>[\n    { title: <span class="token punctuation">&#39;</span>刷牙洗脸<span class="token punctuation">&#39;</span> }, \n    { title: <span class="token punctuation">&#39;</span>吃早餐<span class="token punctuation">&#39;</span>, color: <span class="token punctuation">&#39;</span>green<span class="token punctuation">&#39;</span> }, \n    { title: <span class="token punctuation">&#39;</span>上班<span class="token punctuation">&#39;</span>, color: <span class="token punctuation">&#39;</span>red<span class="token punctuation">&#39;</span> }, \n    { title: <span class="token punctuation">&#39;</span>睡觉<span class="token punctuation">&#39;</span>, color: <span class="token punctuation">&#39;</span>yellow<span class="token punctuation">&#39;</span> }\n  ]<span class="token punctuation">&quot;</span></span>\n<span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>AtTimeline</span><span class="token punctuation">&gt;</span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>AtTimeline</span> \n  <span class="token attr-name">:items</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>[\n    { title: <span class="token punctuation">&#39;</span>刷牙洗脸<span class="token punctuation">&#39;</span>, icon: <span class="token punctuation">&#39;</span>check-circle<span class="token punctuation">&#39;</span> }, \n    { title: <span class="token punctuation">&#39;</span>吃早餐<span class="token punctuation">&#39;</span>, icon: <span class="token punctuation">&#39;</span>clock<span class="token punctuation">&#39;</span> }, \n    { title: <span class="token punctuation">&#39;</span>上班<span class="token punctuation">&#39;</span>, icon: <span class="token punctuation">&#39;</span>clock<span class="token punctuation">&#39;</span> }, \n    { title: <span class="token punctuation">&#39;</span>睡觉<span class="token punctuation">&#39;</span>, icon: <span class="token punctuation">&#39;</span>clock<span class="token punctuation">&#39;</span> }\n  ]<span class="token punctuation">&quot;</span></span>\n<span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>AtTimeline</span><span class="token punctuation">&gt;</span></span>\n</code></pre></div><h2 id="标记最后一个为幽灵节点（即时间轴未完成，还在记录过程中）"><a class="header-anchor" href="#标记最后一个为幽灵节点（即时间轴未完成，还在记录过程中）" aria-hidden="true">#</a> 标记最后一个为幽灵节点（即时间轴未完成，还在记录过程中）</h2><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>AtTimeline</span> \n  <span class="token attr-name">pending</span> \n  <span class="token attr-name">:items</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>[\n    { title: <span class="token punctuation">&#39;</span>刷牙洗脸<span class="token punctuation">&#39;</span> }, \n    { title: <span class="token punctuation">&#39;</span>吃早餐<span class="token punctuation">&#39;</span> }, \n    { title: <span class="token punctuation">&#39;</span>上班<span class="token punctuation">&#39;</span> }, \n    { title: <span class="token punctuation">&#39;</span>睡觉<span class="token punctuation">&#39;</span> }\n  ]<span class="token punctuation">&quot;</span></span>\n<span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>AtTimeline</span><span class="token punctuation">&gt;</span></span>\n</code></pre></div><h2 id="添加更多内容"><a class="header-anchor" href="#添加更多内容" aria-hidden="true">#</a> 添加更多内容</h2><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>AtTimeline</span> \n  <span class="token attr-name">pending</span> \n  <span class="token attr-name">:items</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>[\n    { title: <span class="token punctuation">&#39;</span>刷牙洗脸<span class="token punctuation">&#39;</span>, content: [<span class="token punctuation">&#39;</span>大概8:00<span class="token punctuation">&#39;</span>], icon: <span class="token punctuation">&#39;</span>check-circle<span class="token punctuation">&#39;</span> }, \n    { title: <span class="token punctuation">&#39;</span>吃早餐<span class="token punctuation">&#39;</span>, content: [<span class="token punctuation">&#39;</span>牛奶+面包<span class="token punctuation">&#39;</span>, <span class="token punctuation">&#39;</span>餐后记得吃药<span class="token punctuation">&#39;</span>], icon: <span class="token punctuation">&#39;</span>clock<span class="token punctuation">&#39;</span> }, \n    { title: <span class="token punctuation">&#39;</span>上班<span class="token punctuation">&#39;</span>, content: [<span class="token punctuation">&#39;</span>查看邮件<span class="token punctuation">&#39;</span>, <span class="token punctuation">&#39;</span>写PPT<span class="token punctuation">&#39;</span>, <span class="token punctuation">&#39;</span>发送PPT给领导<span class="token punctuation">&#39;</span>], icon: <span class="token punctuation">&#39;</span>clock<span class="token punctuation">&#39;</span> }, \n    { title: <span class="token punctuation">&#39;</span>睡觉<span class="token punctuation">&#39;</span>, content: [<span class="token punctuation">&#39;</span>不超过23:00<span class="token punctuation">&#39;</span>], icon: <span class="token punctuation">&#39;</span>clock<span class="token punctuation">&#39;</span> }\n  ]<span class="token punctuation">&quot;</span></span>\n<span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>AtTimeline</span><span class="token punctuation">&gt;</span></span>\n</code></pre></div><h2 id="timeline-参数"><a class="header-anchor" href="#timeline-参数" aria-hidden="true">#</a> Timeline 参数</h2><table><thead><tr><th style="text-align:left;">参数</th><th style="text-align:left;">说明</th><th style="text-align:left;">类型</th><th style="text-align:left;">可选值</th><th style="text-align:left;">默认值</th></tr></thead><tbody><tr><td style="text-align:left;">pending</td><td style="text-align:left;">最后一项是否为未完成态</td><td style="text-align:left;">Boolean</td><td style="text-align:left;">-</td><td style="text-align:left;">false</td></tr><tr><td style="text-align:left;">items</td><td style="text-align:left;">需展示的内容。数组对象参数参考下文 item</td><td style="text-align:left;">Array Of Object</td><td style="text-align:left;">-</td><td style="text-align:left;">[]</td></tr></tbody></table><h2 id="items-object-字段详解"><a class="header-anchor" href="#items-object-字段详解" aria-hidden="true">#</a> items object 字段详解</h2><table><thead><tr><th style="text-align:left;">参数</th><th style="text-align:left;">说明</th><th style="text-align:left;">类型</th><th style="text-align:left;">可选值</th><th style="text-align:left;">默认值</th></tr></thead><tbody><tr><td style="text-align:left;">title</td><td style="text-align:left;">标题</td><td style="text-align:left;">String</td><td style="text-align:left;">必填</td><td style="text-align:left;">-</td></tr><tr><td style="text-align:left;">content</td><td style="text-align:left;">子项内容</td><td style="text-align:left;">Array</td><td style="text-align:left;">-</td><td style="text-align:left;">[]</td></tr><tr><td style="text-align:left;">icon</td><td style="text-align:left;">自定义icon</td><td style="text-align:left;">String</td><td style="text-align:left;">参考<code>icon</code>组件</td><td style="text-align:left;">-</td></tr><tr><td style="text-align:left;">color</td><td style="text-align:left;">icon颜色</td><td style="text-align:left;">String</td><td style="text-align:left;">green/red/yellow</td><td style="text-align:left;">blue</td></tr></tbody></table>',20);e.render=function(a,s,e,l,o,c){return t(),n("div",null,[p])};export default e;export{s as __pageData};
