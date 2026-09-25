<script setup lang="ts">
import ProjectCard from '@/components/ProjectCard.vue'
import { projects } from '@/data/projects'
</script>

<template>
  <div class="projects">
    <h1 class="mb-4">Projects</h1>
    <h2 class="mb-4">All Projects:</h2>
    <ul v-if="projects && projects.length">
      <li class="mb-4" v-for="project of projects" :key="project.slug">
        <ProjectCard :projectInfo="project" />
      </li>
    </ul>
  </div>
</template>
