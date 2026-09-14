<script setup lang="ts">
import ProjectCard from '@/components/ProjectCard.vue'
import { projects } from '@/data/projects'
</script>

<template>
  <div class="home">
    <h1 class="mb-4">This is the home page</h1>
    <h2 class="mb-4">Featured Projects:</h2>
    <ul v-if="projects && projects.length">
      <li class="mb-4" v-for="project of projects" :key="project.slug">
        <ProjectCard v-if="project.featured" :projectInfo="project" />
      </li>
    </ul>
  </div>
</template>
