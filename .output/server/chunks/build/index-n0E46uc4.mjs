import { mergeProps, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createCommentVNode, Transition, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import _sfc_main$2 from './ContentList-hKvH0eWD.mjs';
import _sfc_main$3 from './ContentDoc-B3ciwB5F.mjs';
import _sfc_main$4 from './ContentRenderer-CpuLkk4u.mjs';
import axios from 'axios';
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
import './ContentQuery-CWVjLhkw.mjs';
import '../_/index.mjs';
import './query-CghUbuHe.mjs';
import 'perfect-debounce';
import './preview-CUm_9g-g.mjs';
import './v3-fGLNjynp.mjs';
import 'unhead/utils';
import './ContentRendererMarkdown-B7Hhx5X2.mjs';
import 'property-information';
import './node-DPfXEbjB.mjs';

const _sfc_main$1 = {
  name: "ProjectCard",
  props: { repo: Object },
  methods: {
    formatDate(date) {
      const d = new Date(date);
      const now = /* @__PURE__ */ new Date();
      const diff = Math.floor((now - d) / (1e3 * 60 * 60 * 24));
      if (diff === 0) return "today";
      if (diff === 1) return "yesterday";
      if (diff < 30) return `${diff} days ago`;
      if (diff < 365) return `${Math.floor(diff / 30)} months ago`;
      return `${Math.floor(diff / 365)} years ago`;
    }
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "card" }, _attrs))} data-v-ddf7eea0><div class="card-header" data-v-ddf7eea0><h3 data-v-ddf7eea0>${ssrInterpolate($props.repo.name)}</h3><div class="stars" data-v-ddf7eea0><span class="star-icon" data-v-ddf7eea0>\u2605</span><span data-v-ddf7eea0>${ssrInterpolate($props.repo.stargazers_count)}</span></div></div><p class="description" data-v-ddf7eea0>${ssrInterpolate($props.repo.description || "No description available")}</p><div class="card-footer" data-v-ddf7eea0>`);
  if ($props.repo.language) {
    _push(`<span class="language" data-v-ddf7eea0>${ssrInterpolate($props.repo.language)}</span>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<span class="updated" data-v-ddf7eea0>Updated ${ssrInterpolate($options.formatDate($props.repo.updated_at))}</span></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProjectCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-ddf7eea0"]]);
const GITHUB_USER = "favilances";
const DEFAULT_REPO_COUNT = 6;
const TOC_TAGS = ["h2", "h3", "h4", "h5", "h6"];
TOC_TAGS.reduce((tags, tag) => {
  tags[tag] = Number(tag.charAt(tag.length - 1));
  return tags;
}, {});
const _sfc_main = {
  name: "Home",
  components: { ProjectCard: __nuxt_component_0 },
  data() {
    return {
      aboutLines: [
        'I aim to follow the developments in the field of technology and software and reflect this information to my projects. I enjoy working and generating new ideas. If you would like to contact me, you can reach me at "favilances@proton.me".'
      ],
      repos: [],
      loading: true,
      modalOpen: false,
      modalRepo: null,
      readmeHtml: "",
      readmeLoading: false,
      aboutVisible: false,
      aboutAnimationKey: 0,
      projectsVisible: false,
      blogVisible: false,
      openArticles: []
    };
  },
  async mounted() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.aboutAnimationKey++;
            this.aboutVisible = true;
          } else {
            this.aboutVisible = false;
          }
        });
      },
      { threshold: 0.2 }
    );
    if (this.$refs.aboutSection) {
      observer.observe(this.$refs.aboutSection);
    }
    const projectsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.projectsVisible = true;
          }
        });
      },
      { threshold: 0.1 }
    );
    if (this.$refs.projectsSection) {
      projectsObserver.observe(this.$refs.projectsSection);
    }
    const blogObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.blogVisible = true;
          }
        });
      },
      { threshold: 0.1 }
    );
    if (this.$refs.blogSection) {
      blogObserver.observe(this.$refs.blogSection);
    }
    try {
      const graphqlQuery = {
        query: `
          query {
            user(login: "${GITHUB_USER}") {
              pinnedItems(first: 6, types: REPOSITORY) {
                nodes {
                  ... on Repository {
                    id
                    name
                    description
                    url
                    stargazerCount
                    primaryLanguage {
                      name
                      color
                    }
                    updatedAt
                    owner {
                      login
                    }
                  }
                }
              }
            }
          }
        `
      };
      const res = await axios.post("https://api.github.com/graphql", graphqlQuery, {
        headers: {
          "Content-Type": "application/json"
          // If you have a GitHub token, add it here for higher rate limits:
          // 'Authorization': 'Bearer YOUR_GITHUB_TOKEN'
        }
      });
      if (res.data.data && res.data.data.user && res.data.data.user.pinnedItems) {
        this.repos = res.data.data.user.pinnedItems.nodes.map((repo) => ({
          id: repo.id,
          name: repo.name,
          description: repo.description,
          html_url: repo.url,
          stargazers_count: repo.stargazerCount,
          language: repo.primaryLanguage ? repo.primaryLanguage.name : null,
          updated_at: repo.updatedAt,
          owner: repo.owner
        }));
      } else {
        const fallback = await axios.get(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=${DEFAULT_REPO_COUNT}&sort=updated`);
        this.repos = fallback.data.filter((r) => !r.fork);
      }
    } catch (e) {
      console.error("Failed to fetch repos:", e);
      try {
        const fallback = await axios.get(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=${DEFAULT_REPO_COUNT}&sort=updated`);
        this.repos = fallback.data.filter((r) => !r.fork);
      } catch (fallbackError) {
        this.repos = [];
      }
    } finally {
      this.loading = false;
    }
  },
  methods: {
    async openRepo(repo) {
      this.modalRepo = repo;
      this.modalOpen = true;
      this.readmeLoading = true;
      try {
        const meta = await axios.get(`https://api.github.com/repos/${repo.owner.login}/${repo.name}`);
        const branch = meta.data.default_branch || "main";
        const raw = `https://raw.githubusercontent.com/${repo.owner.login}/${repo.name}/${branch}/README.md`;
        const r = await axios.get(raw).catch(() => null);
        if (r && r.data) {
          this.readmeHtml = this.parseMarkdown(r.data);
        } else {
          this.readmeHtml = '<p class="no-readme">No README found for this project.</p>';
        }
      } catch (e) {
        this.readmeHtml = '<p class="error">Unable to load README.</p>';
      } finally {
        this.readmeLoading = false;
      }
    },
    closeModal() {
      this.modalOpen = false;
      this.modalRepo = null;
      this.readmeHtml = "";
    },
    parseMarkdown(md) {
      return md.split("\n\n").map((p) => {
        p = p.replace(/^#{1,6}\s+(.+)$/gm, "<h3>$1</h3>");
        p = p.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
        p = p.replace(/\*(.+?)\*/g, "<em>$1</em>");
        p = p.replace(/`(.+?)`/g, "<code>$1</code>");
        p = p.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank">$1</a>');
        return p.startsWith("<h3>") ? p : `<p>${p.replace(/\n/g, "<br/>")}</p>`;
      }).join("");
    },
    openEmail() {
      (void 0).location.href = "mailto:favilances@proton.me";
    },
    toggleArticle(path) {
      const index2 = this.openArticles.indexOf(path);
      if (index2 === -1) {
        this.openArticles.push(path);
      } else {
        this.openArticles = this.openArticles.filter((p) => p !== path);
      }
    },
    formatDate(date) {
      if (!date) return "";
      const d = new Date(date);
      return d.toLocaleDateString("tr-TR", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit"
      }).replace(/\./g, "-");
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  var _a, _b;
  const _component_ProjectCard = __nuxt_component_0;
  const _component_ContentList = _sfc_main$2;
  const _component_ContentDoc = _sfc_main$3;
  const _component_ContentRenderer = _sfc_main$4;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "single-page" }, _attrs))} data-v-80d9d74e><section id="home" class="home-section" data-v-80d9d74e><div class="mist-bg" data-v-80d9d74e></div><div class="home-content" data-v-80d9d74e><h1 class="main-title" data-v-80d9d74e>Favilances Noir</h1><p class="subtitle" data-v-80d9d74e>Developer</p></div><div class="film-grain" data-v-80d9d74e></div></section><section id="about" class="about-section" data-v-80d9d74e><div class="about-content" data-v-80d9d74e><!--[-->`);
  ssrRenderList($data.aboutLines, (line, i) => {
    _push(`<p class="${ssrRenderClass([{ "is-visible": $data.aboutVisible }, "reveal-line"])}" data-v-80d9d74e>${ssrInterpolate(line)}</p>`);
  });
  _push(`<!--]--></div><div class="email-slider-wrap" data-v-80d9d74e><div class="hollow-row" data-v-80d9d74e><!--[-->`);
  ssrRenderList(20, (n) => {
    _push(`<span data-v-80d9d74e>Send me an email. - </span>`);
  });
  _push(`<!--]--></div></div></section><section id="projects" class="projects-section" data-v-80d9d74e><div class="${ssrRenderClass([{ "fade-in": $data.projectsVisible }, "projects-header"])}" data-v-80d9d74e><h2 data-v-80d9d74e>Projects</h2><p class="projects-subtitle" data-v-80d9d74e>Recent work from GitHub</p></div>`);
  if ($data.loading) {
    _push(`<div class="loading-state" data-v-80d9d74e><div class="spinner" data-v-80d9d74e></div><p data-v-80d9d74e>Loading projects\u2026</p></div>`);
  } else if ($data.repos.length) {
    _push(`<div class="${ssrRenderClass([{ "fade-in": $data.projectsVisible }, "projects-grid"])}" data-v-80d9d74e><!--[-->`);
    ssrRenderList($data.repos, (repo) => {
      _push(ssrRenderComponent(_component_ProjectCard, {
        key: repo.id,
        repo,
        onOpen: $options.openRepo
      }, null, _parent));
    });
    _push(`<!--]--></div>`);
  } else {
    _push(`<div class="empty-state" data-v-80d9d74e><p data-v-80d9d74e>No projects found. Update GitHub username in config.js</p></div>`);
  }
  if ($data.modalOpen) {
    _push(`<div class="modal-backdrop" data-v-80d9d74e><div class="modal-panel" data-v-80d9d74e><button class="modal-close" data-v-80d9d74e>\u2715</button><h3 data-v-80d9d74e>${ssrInterpolate((_a = $data.modalRepo) == null ? void 0 : _a.name)}</h3>`);
    if ($data.modalRepo) {
      _push(`<a${ssrRenderAttr("href", $data.modalRepo.html_url)} target="_blank" class="repo-link" data-v-80d9d74e> View on GitHub \u2192 </a>`);
    } else {
      _push(`<!---->`);
    }
    if ($data.readmeLoading) {
      _push(`<div class="loading-readme" data-v-80d9d74e><div class="spinner-sm" data-v-80d9d74e></div> Loading README\u2026 </div>`);
    } else {
      _push(`<div class="readme-content" data-v-80d9d74e>${(_b = $data.readmeHtml) != null ? _b : ""}</div>`);
    }
    _push(`</div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</section><section id="blog" class="blog-section" data-v-80d9d74e><div class="${ssrRenderClass([{ "fade-in": $data.blogVisible }, "blog-header"])}" data-v-80d9d74e><h2 data-v-80d9d74e>Blog</h2><p class="blog-subtitle" data-v-80d9d74e>Thoughts &amp; articles</p></div><div class="${ssrRenderClass([{ "fade-in": $data.blogVisible }, "blog-content"])}" data-v-80d9d74e>`);
  _push(ssrRenderComponent(_component_ContentList, {
    path: "/articles",
    sort: { date: -1 }
  }, {
    default: withCtx(({ list }, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="blog-grid" data-v-80d9d74e${_scopeId}><!--[-->`);
        ssrRenderList(list, (article) => {
          _push2(`<article class="blog-card" data-v-80d9d74e${_scopeId}><div class="blog-card-inner" data-v-80d9d74e${_scopeId}><div class="blog-date" data-v-80d9d74e${_scopeId}>${ssrInterpolate($options.formatDate(article.date))}</div><h3 class="blog-title" data-v-80d9d74e${_scopeId}>${ssrInterpolate(article.title)}</h3>`);
          if (article.description) {
            _push2(`<p class="blog-description" data-v-80d9d74e${_scopeId}>${ssrInterpolate(article.description)}</p>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div>`);
          if ($data.openArticles.includes(article._path)) {
            _push2(`<div class="blog-expanded" data-v-80d9d74e${_scopeId}>`);
            _push2(ssrRenderComponent(_component_ContentDoc, {
              path: article._path
            }, {
              default: withCtx(({ doc }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<article class="blog-article-content" data-v-80d9d74e${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_ContentRenderer, { value: doc }, null, _parent3, _scopeId2));
                  _push3(`</article>`);
                } else {
                  return [
                    createVNode("article", { class: "blog-article-content" }, [
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
          createVNode("div", { class: "blog-grid" }, [
            (openBlock(true), createBlock(Fragment, null, renderList(list, (article) => {
              return openBlock(), createBlock("article", {
                key: article._path,
                class: "blog-card"
              }, [
                createVNode("div", {
                  class: "blog-card-inner",
                  onClick: ($event) => $options.toggleArticle(article._path)
                }, [
                  createVNode("div", { class: "blog-date" }, toDisplayString($options.formatDate(article.date)), 1),
                  createVNode("h3", { class: "blog-title" }, toDisplayString(article.title), 1),
                  article.description ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "blog-description"
                  }, toDisplayString(article.description), 1)) : createCommentVNode("", true)
                ], 8, ["onClick"]),
                createVNode(Transition, {
                  "enter-active-class": "blog-content-enter-active",
                  "enter-from-class": "blog-content-enter-from",
                  "enter-to-class": "blog-content-enter-to",
                  "leave-active-class": "blog-content-leave-active",
                  "leave-from-class": "blog-content-leave-from",
                  "leave-to-class": "blog-content-leave-to"
                }, {
                  default: withCtx(() => [
                    $data.openArticles.includes(article._path) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "blog-expanded"
                    }, [
                      createVNode(_component_ContentDoc, {
                        path: article._path
                      }, {
                        default: withCtx(({ doc }) => [
                          createVNode("article", { class: "blog-article-content" }, [
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
  _push(`</div></section></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-80d9d74e"]]);

export { index as default };
//# sourceMappingURL=index-n0E46uc4.mjs.map
