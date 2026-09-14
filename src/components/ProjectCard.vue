<script setup lang="ts">
import AppLink from '@/components/AppLink.vue'
import type { Project } from '@/types/project'

interface Props {
  projectInfo: Project
}

const props = defineProps<Props>()
const { approach, date, problem, repoUrl, retrospective, slug, summary, title } = props.projectInfo
const projectPath = `/project/${slug}`
</script>

<template>
  <article>
    <h2>
      <AppLink :to="projectPath">
        {{ title }}
      </AppLink>
    </h2>
    <h3>{{ summary }}</h3>
    <hr />
    <p>Problem: {{ problem }}</p>
    <hr />
    <p>Approach: {{ approach }}</p>
    <hr />
    <p>Retrospective: {{ retrospective }}</p>
    <hr />
    <p>Date: {{ date }}</p>
    <AppLink class="bg-sky-500 hover:bg-sky-700" :to="repoUrl"> View repository </AppLink>
  </article>
</template>
