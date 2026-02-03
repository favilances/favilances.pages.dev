import { ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderClass } from 'vue/server-renderer';
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

const _sfc_main$2 = {
  emits: ["loaded"],
  mounted() {
    setTimeout(() => this.$emit("loaded"), 100);
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "loading-fullscreen" }, _attrs))} data-v-5ce5be7a></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Loading.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-5ce5be7a"]]);
const _sfc_main$1 = {
  name: "NavBar",
  data() {
    return {
      activeSection: "home"
    };
  },
  mounted() {
    (void 0).addEventListener("scroll", this.onScroll);
    this.onScroll();
  },
  beforeUnmount() {
    (void 0).removeEventListener("scroll", this.onScroll);
  },
  methods: {
    scrollToSection(id) {
      const element = (void 0).getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    onScroll() {
      const sections = ["home", "about", "projects", "blog"];
      const scrollPosition = (void 0).scrollY + (void 0).innerHeight / 3;
      for (const section of sections) {
        const element = (void 0).getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const bottom = top + element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < bottom) {
            this.activeSection = section;
            break;
          }
        }
      }
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<header${ssrRenderAttrs(mergeProps({ class: "nav-bar" }, _attrs))} data-v-0481a142><nav class="nav-items" data-v-0481a142><a href="#home" class="${ssrRenderClass({ active: $data.activeSection === "home" })}" data-v-0481a142> Home </a><a href="#about" class="${ssrRenderClass({ active: $data.activeSection === "about" })}" data-v-0481a142> About </a><a href="#projects" class="${ssrRenderClass({ active: $data.activeSection === "projects" })}" data-v-0481a142> Projects </a><a href="#blog" class="${ssrRenderClass({ active: $data.activeSection === "blog" })}" data-v-0481a142> Blog </a></nav></header>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/NavBar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-0481a142"]]);
const _sfc_main = {
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const loading = ref(true);
    const footerVisible = ref(false);
    ref(null);
    function onLoaded() {
      loading.value = false;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Loading = __nuxt_component_0;
      const _component_NavBar = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ id: "app" }, _attrs))}>`);
      if (unref(loading)) {
        _push(ssrRenderComponent(_component_Loading, { onLoaded }, null, _parent));
      } else {
        _push(`<div><div class="site-wrap">`);
        _push(ssrRenderComponent(_component_NavBar, null, null, _parent));
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</div><footer class="${ssrRenderClass([{ "footer-visible": unref(footerVisible) }, "site-footer"])}"><div class="footer-mist"></div><div class="footer-content"><div class="footer-left"><h2 class="footer-title">Favilances Noir</h2><div class="copy">\xA9 2025 noirLang</div></div><button class="scroll-top" title="Back to top"><span class="arrow">\u2191</span></button><nav class="footer-links"><a href="https://x.com/favilances" target="_blank">X</a><a href="https://instagram.com/favilances" target="_blank">Instagram</a><a href="https://youtube.com/@favilances" target="_blank">YouTube</a><a href="https://github.com/favilances" target="_blank">GitHub</a><a href="mailto:favilances@proton.me">Email</a></nav></div><div class="made-with">Made with <span class="heart">\u2665</span> Vue</div></footer></div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-sE-cbX7C.mjs.map
