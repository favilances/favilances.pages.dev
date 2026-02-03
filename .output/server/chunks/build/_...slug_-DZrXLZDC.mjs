import _sfc_main$1 from './ContentDoc-B3ciwB5F.mjs';
import _sfc_main$2 from './ContentRenderer-CpuLkk4u.mjs';
import { defineComponent, withAsyncContext, mergeProps, unref, withCtx, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { u as useRoute, c as createError } from './server.mjs';
import { u as useAsyncData, q as queryContent } from './query-CghUbuHe.mjs';
import './ContentQuery-CWVjLhkw.mjs';
import '../_/index.mjs';
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
import './v3-fGLNjynp.mjs';
import 'unhead/utils';
import './ContentRendererMarkdown-B7Hhx5X2.mjs';
import 'property-information';
import './node-DPfXEbjB.mjs';
import './preview-CUm_9g-g.mjs';
import 'vue-router';
import 'perfect-debounce';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[...slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const slug = route.params.slug || [];
    const path = `/articles/${slug.join("/")}`;
    const formatDate = (date) => {
      if (!date) return "";
      const d = new Date(date);
      return d.toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit"
      }).replace(/\./g, "-");
    };
    const { data: page, error } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      `content-${path}`,
      () => queryContent(path).findOne()
    )), __temp = await __temp, __restore(), __temp);
    if (error.value || !page.value) {
      throw createError({
        statusCode: 404,
        statusMessage: "Sayfa Bulunamad\u0131",
        fatal: true
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ContentDoc = _sfc_main$1;
      const _component_ContentRenderer = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full max-w-4xl mx-auto" }, _attrs))}>`);
      if (unref(page)) {
        _push(ssrRenderComponent(_component_ContentDoc, { path }, {
          default: withCtx(({ doc }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<article class="prose dark:prose-invert max-w-none"${_scopeId}><h1 class="text-3xl font-bold mb-4"${_scopeId}>${ssrInterpolate(doc.title)}</h1><div class="text-sm text-gray-500 dark:text-gray-400 mb-8"${_scopeId}>${ssrInterpolate(formatDate(doc.date))}</div>`);
              _push2(ssrRenderComponent(_component_ContentRenderer, { value: doc }, null, _parent2, _scopeId));
              _push2(`</article>`);
            } else {
              return [
                createVNode("article", { class: "prose dark:prose-invert max-w-none" }, [
                  createVNode("h1", { class: "text-3xl font-bold mb-4" }, toDisplayString(doc.title), 1),
                  createVNode("div", { class: "text-sm text-gray-500 dark:text-gray-400 mb-8" }, toDisplayString(formatDate(doc.date)), 1),
                  createVNode(_component_ContentRenderer, { value: doc }, null, 8, ["value"])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog/[...slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_...slug_-DZrXLZDC.mjs.map
