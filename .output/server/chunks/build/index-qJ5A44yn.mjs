import _sfc_main$1 from './ContentList-hKvH0eWD.mjs';
import _sfc_main$2 from './ContentDoc-B3ciwB5F.mjs';
import _sfc_main$3 from './ContentRenderer-CpuLkk4u.mjs';
import { defineComponent, ref, mergeProps, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createCommentVNode, Transition, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { useHead } from '@vueuse/head';
import { _ as _export_sfc } from './server.mjs';
import './ContentQuery-CWVjLhkw.mjs';
import '../_/index.mjs';
import './query-CghUbuHe.mjs';
import 'perfect-debounce';
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
import './preview-CUm_9g-g.mjs';
import './v3-fGLNjynp.mjs';
import 'unhead/utils';
import './ContentRendererMarkdown-B7Hhx5X2.mjs';
import 'property-information';
import './node-DPfXEbjB.mjs';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const openArticles = ref([]);
    const toggleArticle = (path) => {
      const index2 = openArticles.value.indexOf(path);
      if (index2 === -1) {
        openArticles.value.push(path);
      } else {
        openArticles.value = openArticles.value.filter((p) => p !== path);
      }
    };
    const formatDate = (date) => {
      if (!date) return "";
      const d = new Date(date);
      return d.toLocaleDateString("tr-TR", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit"
      }).replace(/\./g, "-");
    };
    useHead({
      title: "favilances - blog",
      titleTemplate: "favilances - blog",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "format-detection", content: "telephone=no" },
        { name: "description", content: "favilances - blog" },
        { name: "keywords", content: "favilances, blog, teknoloji, yaz\u0131l\u0131m, d\xFC\u015F\xFCnceler" },
        { name: "author", content: "favilances" },
        { name: "robots", content: "index, follow" },
        { property: "og:site_name", content: "favilances - blog" },
        { property: "og:title", content: "favilances - blog" },
        { property: "og:description", content: "favilances - blog" },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: "tr_TR" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@favilances" },
        { name: "twitter:creator", content: "@favilances" },
        { name: "twitter:title", content: "favilances - blog" },
        { name: "twitter:description", content: "favilances - blog" }
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "canonical", href: "https://favilances.pages.dev/blog" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ContentList = _sfc_main$1;
      const _component_ContentDoc = _sfc_main$2;
      const _component_ContentRenderer = _sfc_main$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full max-w-4xl mx-auto" }, _attrs))} data-v-1f2ffb6f><div class="blog-page-header" data-v-1f2ffb6f><h1 class="blog-page-title" data-v-1f2ffb6f>Blog</h1><p class="blog-page-subtitle" data-v-1f2ffb6f>Thoughts &amp; articles</p></div>`);
      _push(ssrRenderComponent(_component_ContentList, {
        path: "/articles",
        sort: { date: -1 }
      }, {
        default: withCtx(({ list }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="blog-page-grid" data-v-1f2ffb6f${_scopeId}><!--[-->`);
            ssrRenderList(list, (article) => {
              _push2(`<article class="blog-page-card" data-v-1f2ffb6f${_scopeId}><div class="blog-page-card-inner" data-v-1f2ffb6f${_scopeId}><div class="blog-page-date" data-v-1f2ffb6f${_scopeId}>${ssrInterpolate(formatDate(article.date))}</div><h2 class="blog-page-card-title" data-v-1f2ffb6f${_scopeId}>${ssrInterpolate(article.title)}</h2>`);
              if (article.description) {
                _push2(`<p class="blog-page-description" data-v-1f2ffb6f${_scopeId}>${ssrInterpolate(article.description)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
              if (openArticles.value.includes(article._path)) {
                _push2(`<div class="blog-page-expanded" data-v-1f2ffb6f${_scopeId}>`);
                _push2(ssrRenderComponent(_component_ContentDoc, {
                  path: article._path
                }, {
                  default: withCtx(({ doc }, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<article class="blog-page-content" data-v-1f2ffb6f${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_ContentRenderer, { value: doc }, null, _parent3, _scopeId2));
                      _push3(`</article>`);
                    } else {
                      return [
                        createVNode("article", { class: "blog-page-content" }, [
                          createVNode(_component_ContentRenderer, { value: doc }, null, 8, ["value"])
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</article>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "blog-page-grid" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(list, (article) => {
                  return openBlock(), createBlock("article", {
                    key: article._path,
                    class: "blog-page-card"
                  }, [
                    createVNode("div", {
                      class: "blog-page-card-inner",
                      onClick: ($event) => toggleArticle(article._path)
                    }, [
                      createVNode("div", { class: "blog-page-date" }, toDisplayString(formatDate(article.date)), 1),
                      createVNode("h2", { class: "blog-page-card-title" }, toDisplayString(article.title), 1),
                      article.description ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "blog-page-description"
                      }, toDisplayString(article.description), 1)) : createCommentVNode("", true)
                    ], 8, ["onClick"]),
                    createVNode(Transition, {
                      "enter-active-class": "blog-expand-enter-active",
                      "enter-from-class": "blog-expand-enter-from",
                      "enter-to-class": "blog-expand-enter-to",
                      "leave-active-class": "blog-expand-leave-active",
                      "leave-from-class": "blog-expand-leave-from",
                      "leave-to-class": "blog-expand-leave-to"
                    }, {
                      default: withCtx(() => [
                        openArticles.value.includes(article._path) ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "blog-page-expanded"
                        }, [
                          createVNode(_component_ContentDoc, {
                            path: article._path
                          }, {
                            default: withCtx(({ doc }) => [
                              createVNode("article", { class: "blog-page-content" }, [
                                createVNode(_component_ContentRenderer, { value: doc }, null, 8, ["value"])
                              ])
                            ]),
                            _: 1
                          }, 8, ["path"])
                        ])) : createCommentVNode("", true)
                      ]),
                      _: 2
                    }, 1024)
                  ]);
                }), 128))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1f2ffb6f"]]);

export { index as default };
//# sourceMappingURL=index-qJ5A44yn.mjs.map
