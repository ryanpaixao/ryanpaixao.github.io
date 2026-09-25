/** Component to handle both internal and external links for the App */
<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, type RouteLocationRaw } from 'vue-router'

import { isExternalLink, shouldOpenNewTab } from '@/lib/components/appLink'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    to: RouteLocationRaw
    opensNewTab?: boolean
    replace?: boolean
    activeClass?: string
    exactActiveClass?: string
    inactiveClass?: string
  }>(),
  {
    opensNewTab: true,
    replace: false,
    activeClass: 'router-link-active',
    exactActiveClass: 'router-link-exact-active',
    inactiveClass: 'router-link-inactive',
  },
)

const isExternal = computed(() => !!props.to && isExternalLink(props.to.toString()))
const opensNewTab = computed(
  () => props.to && shouldOpenNewTab(props.to.toString(), isExternal.value),
)
</script>

<template>
  <a
    v-if="isExternal"
    v-bind="$attrs"
    :href="to as string"
    :target="opensNewTab ? '_blank' : undefined"
    :rel="opensNewTab ? 'noopener noreferrer' : undefined"
  >
    <slot />
  </a>
  <RouterLink v-else v-bind="$props" custom v-slot="{ isActive, href, navigate }">
    <a
      v-bind="$attrs"
      :href="href"
      @click="navigate"
      :class="isActive ? activeClass : inactiveClass"
    >
      <slot />
    </a>
  </RouterLink>
</template>
