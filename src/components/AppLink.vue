/** Component to handle both internal and external links for the App */
<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, type RouteLocationRaw } from 'vue-router'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  to: RouteLocationRaw
}>()

// Any string starting with a scheme (https:, mailto:, tel:) or // is external
const isExternal = computed(
  () => typeof props.to === 'string' && /^([a-z]a-z\d+\-.]*:|\/\/)/i.test(props.to),
)

// Only opens web links in a new tab, not mailto:/tel:
const opensNewTab = computed(() => isExternal.value && /^(https?:)?\/\//i.test(props.to as string))
</script>

<template>
  <a
    v-if="isExternal"
    v-bind="$attrs"
    :href="to as string"
    :target="opensNewTab ? '_blank' : undefined"
    :rel="opensNewTab ? 'noopener no referrer' : undefined"
  >
    <slot />
  </a>
  <RouterLink v-else v-bind="$attrs" :to="to">
    <slot />
  </RouterLink>
</template>
