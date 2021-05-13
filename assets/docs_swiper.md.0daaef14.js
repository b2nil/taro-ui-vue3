import{o as t,c as a,a as n}from"./app.d0e654bd.js";const s='{"title":"Swiper 滑动视图容器","description":"","frontmatter":{},"headers":[{"level":2,"title":"使用指南","slug":"使用指南"},{"level":2,"title":"示例","slug":"示例"},{"level":2,"title":"Swiper 参数","slug":"swiper-参数"}],"relativePath":"docs/swiper.md","lastUpdated":1619356091076}',e={},l=n('<h1 id="swiper-滑动视图容器"><a class="header-anchor" href="#swiper-滑动视图容器" aria-hidden="true">#</a> Swiper 滑动视图容器</h1><hr><p>滑块视图容器，常用于走马灯、轮播图</p><h2 id="使用指南"><a class="header-anchor" href="#使用指南" aria-hidden="true">#</a> 使用指南</h2><p>无需引入，直接在 vue template 中使用 swiper, swiper-item</p><h2 id="示例"><a class="header-anchor" href="#示例" aria-hidden="true">#</a> 示例</h2><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>view</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>swiper</span>\n      <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&#39;</span>test-h<span class="token punctuation">&#39;</span></span>\n      <span class="token attr-name">indicatorColor</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&#39;</span>#999<span class="token punctuation">&#39;</span></span>\n      <span class="token attr-name">indicatorActiveColor</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&#39;</span>#333<span class="token punctuation">&#39;</span></span>\n      <span class="token attr-name">current</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>current<span class="token punctuation">&quot;</span></span>\n      <span class="token attr-name">:duration</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>duration<span class="token punctuation">&quot;</span></span>\n      <span class="token attr-name">:interval</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>interval<span class="token punctuation">&quot;</span></span>\n      <span class="token attr-name">:circular</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>isCircular<span class="token punctuation">&quot;</span></span>\n      <span class="token attr-name">:autoplay</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>isAutoplay<span class="token punctuation">&quot;</span></span>\n      <span class="token attr-name">:indicatorDots</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>hasIndicatorDots<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>swiper-item</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>(item, idx) in imgUrls<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>idx<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>image</span> <span class="token attr-name">:src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>item<span class="token punctuation">&quot;</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>slide-image<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>swiper-item</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>swiper</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>view</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n  name<span class="token operator">:</span> <span class="token string">&#39;SwiperDemo&#39;</span><span class="token punctuation">,</span>\n  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token punctuation">{</span>\n      current<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>\n      duration<span class="token operator">:</span> <span class="token number">500</span><span class="token punctuation">,</span>\n      interval<span class="token operator">:</span> <span class="token number">5000</span><span class="token punctuation">,</span>\n      isCircular<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n      isAutoplay<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n      hasIndicatorDots<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n      imgUrls<span class="token operator">:</span> <span class="token punctuation">[</span>\n        <span class="token string">&#39;https://img10.360buyimg.com/babel/s700x360_jfs/t25855/203/725883724/96703/5a598a0f/5b7a22e1Nfd6ba344.jpg!q90!cc_350x180&#39;</span><span class="token punctuation">,</span>\n        <span class="token string">&#39;https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180&#39;</span><span class="token punctuation">,</span>\n        <span class="token string">&#39;https://img14.360buyimg.com/babel/s700x360_jfs/t1/4099/12/2578/101668/5b971b4bE65ae279d/89dd1764797acfd9.jpg!q90!cc_350x180&#39;</span><span class="token punctuation">,</span>\n      <span class="token punctuation">]</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>\n</code></pre></div><h2 id="swiper-参数"><a class="header-anchor" href="#swiper-参数" aria-hidden="true">#</a> <a href="https://taro-docs.jd.com/taro/docs/components/viewcontainer/swiper/" target="_blank" rel="noopener noreferrer">Swiper 参数</a></h2><table><thead><tr><th style="text-align:left;">微信</th><th style="text-align:left;">H5</th><th style="text-align:left;">参数</th><th style="text-align:left;">说明</th><th style="text-align:left;">类型</th><th style="text-align:left;">可选值</th><th style="text-align:left;">默认值</th></tr></thead><tbody><tr><td style="text-align:left;">√</td><td style="text-align:left;">√</td><td style="text-align:left;">indicatorDots</td><td style="text-align:left;">是否显示面板指示点</td><td style="text-align:left;">Boolean</td><td style="text-align:left;">-</td><td style="text-align:left;">false</td></tr><tr><td style="text-align:left;">√</td><td style="text-align:left;">√</td><td style="text-align:left;">indicatorColor</td><td style="text-align:left;">指示点颜色</td><td style="text-align:left;">String</td><td style="text-align:left;">-</td><td style="text-align:left;"><code>rgba(0, 0, 0, .3)</code></td></tr><tr><td style="text-align:left;">√</td><td style="text-align:left;">√</td><td style="text-align:left;">indicatorActiveColor</td><td style="text-align:left;">当前选中的指示点颜色</td><td style="text-align:left;">String</td><td style="text-align:left;">-</td><td style="text-align:left;"><code>000</code></td></tr><tr><td style="text-align:left;">√</td><td style="text-align:left;">√</td><td style="text-align:left;">autoplay</td><td style="text-align:left;">是否自动切换</td><td style="text-align:left;">Boolean</td><td style="text-align:left;">-</td><td style="text-align:left;">false</td></tr><tr><td style="text-align:left;">√</td><td style="text-align:left;">√</td><td style="text-align:left;">interval</td><td style="text-align:left;">自动切换时间间隔</td><td style="text-align:left;">Number</td><td style="text-align:left;">-</td><td style="text-align:left;">5000</td></tr><tr><td style="text-align:left;">√</td><td style="text-align:left;">√</td><td style="text-align:left;">duration</td><td style="text-align:left;">滑动动画时长</td><td style="text-align:left;">Number</td><td style="text-align:left;">-</td><td style="text-align:left;">500</td></tr><tr><td style="text-align:left;">√</td><td style="text-align:left;">√</td><td style="text-align:left;">current</td><td style="text-align:left;">当前所在滑块的 index</td><td style="text-align:left;">Number</td><td style="text-align:left;">-</td><td style="text-align:left;">0</td></tr><tr><td style="text-align:left;">√</td><td style="text-align:left;">√</td><td style="text-align:left;">circular</td><td style="text-align:left;">是否采用衔接滑动</td><td style="text-align:left;">Boolean</td><td style="text-align:left;">-</td><td style="text-align:left;">false</td></tr><tr><td style="text-align:left;">√</td><td style="text-align:left;"></td><td style="text-align:left;">skipHiddenItemLayout</td><td style="text-align:left;">是否跳过未显示的滑块布局，设为 true 可优化复杂情况下的滑动性能，但会丢失隐藏状态滑块的布局信息</td><td style="text-align:left;">Boolean</td><td style="text-align:left;">-</td><td style="text-align:left;">false</td></tr><tr><td style="text-align:left;">√</td><td style="text-align:left;"></td><td style="text-align:left;">displayMultipleItems</td><td style="text-align:left;">同时显示的滑块数量</td><td style="text-align:left;">Number</td><td style="text-align:left;">-</td><td style="text-align:left;">1</td></tr><tr><td style="text-align:left;">√</td><td style="text-align:left;"></td><td style="text-align:left;">vertical</td><td style="text-align:left;">滑动方向是否为纵向</td><td style="text-align:left;">Boolean</td><td style="text-align:left;">-</td><td style="text-align:left;">false</td></tr><tr><td style="text-align:left;">√</td><td style="text-align:left;">√</td><td style="text-align:left;">onChange</td><td style="text-align:left;">current 改变时会触发 change 事件</td><td style="text-align:left;">EventHandle</td><td style="text-align:left;">-</td><td style="text-align:left;">-</td></tr><tr><td style="text-align:left;">√</td><td style="text-align:left;"></td><td style="text-align:left;">onAnimationfinish</td><td style="text-align:left;">动画结束时会触发 animationfinish 事件</td><td style="text-align:left;">EventHandle</td><td style="text-align:left;">-</td><td style="text-align:left;">-</td></tr></tbody></table>',9);e.render=function(n,s,e,p,o,c){return t(),a("div",null,[l])};export default e;export{s as __pageData};
