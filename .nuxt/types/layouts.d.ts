import blog from "/home/ra/Documents/favilances.pages.dev/layouts/blog.vue";
import _default from "/home/ra/Documents/favilances.pages.dev/layouts/default.vue";
import type { ComputedRef, MaybeRef } from 'vue'
declare module 'nuxt/app' {
  interface NuxtLayouts {
    'blog': InstanceType<typeof blog>['$props'],
    'default': InstanceType<typeof _default>['$props'],
}
  export type LayoutKey = keyof NuxtLayouts extends never ? string : keyof NuxtLayouts
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}