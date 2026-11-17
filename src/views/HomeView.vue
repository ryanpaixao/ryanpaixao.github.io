<script setup lang="ts">
import ProjectCard from '@/components/ProjectCard.vue'
import { projects } from '@/data/projects'
</script>

<template>
  <div class="bg-(--dark-bg) text-(--text-light) min-h-screen">
    <div class="max-w-2xl mx-auto px-6 py-12 md:py-16">
      <h1 class="text-3xl font-medium mb-4">This is the home page</h1>
      <h2 class="mb-4">Featured Projects:</h2>
      <ul v-if="projects && projects.length">
        <li class="mb-4" v-for="project of projects" :key="project.slug">
          <ProjectCard v-if="project.featured" :projectInfo="project" />
        </li>
      </ul>
    </div>
  </div>
</template>
