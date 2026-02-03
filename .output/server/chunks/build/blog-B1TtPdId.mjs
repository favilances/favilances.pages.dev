import { _ as __nuxt_component_0 } from './nuxt-link-Bl7lrErC.mjs';
import { mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import '../nitro/nitro.mjs';
import 'unified';
import 'remark-parse';
import 'remark-rehype';
import 'remark-mdc';
import 'remark-gfm';
import 'rehype-external-links';
import 'rehype-sort-attribute-values';
import 'rehype-sort-attributes';
import 'rehype-raw';
import 'detab';
import 'micromark-util-sanitize-uri';
import 'hast-util-to-string';
import 'github-slugger';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'vue-router';

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = __nuxt_component_0;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-black text-white flex flex-col" }, _attrs))}><div class="flex-1"><header class="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-sm z-50 border-b border-white/5"><div class="flex justify-between items-center p-8">`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/",
    class: "text-xl font-light hover:opacity-75 transition-opacity tracking-wide camiro-font"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` \u2190 Favilances Noir `);
      } else {
        return [
          createTextVNode(" \u2190 Favilances Noir ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<div class="text-sm font-light tracking-widest opacity-60"> BLOG </div></div></header><main class="pt-36 px-8 pb-20">`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</main></div><footer class="p-8 border-t border-white/5"><div class="text-sm text-gray-400 text-center"> \xA9 2025 noirLang </div></footer></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/blog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const blog = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { blog as default };
//# sourceMappingURL=blog-B1TtPdId.mjs.map
