<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import ProjectCard from '@/components/ProjectCard.vue'
import { projects } from '@/data/projects'

const route = useRoute()

// match project to URL path
const project = computed(() => projects.find((p) => `/projects/${p.slug}` === route.path))
</script>

<template>
  <div v-if="project" class="project-detail">
    <ProjectCard :projectInfo="project" />
  </div>
</template>
