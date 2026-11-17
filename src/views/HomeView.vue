<script setup lang="ts">
import ProjectCard from '@/components/ProjectCard.vue'
import { projects } from '@/data/projects'
</script>

<template>
  <div class="bg-(--dark-bg) text-(--text-light) min-h-screen">
    <div class="max-w-2xl mx-auto px-6 py-12 md:py-16">
      <!-- Header -->
      <div class="mb-16 border-b border-(--border-color) pb-12">
        <h1 class="text-4xl font-medium mb-4 md:text-3xl">Ryan Gregg Paixao</h1>

        <p class="text-base text-(--text-muted) leading-relaxed mb-6 max-w-xl">
          I'm a <span class="text-(--warm-accent)">ponderer of systems</span> all around me. I build to bring
          <span class="text-(--cool-accent)">ideas and abstractions</span> to a practical, real purpose.
        </p>

        <p class="text-sm text-(--text-muted) leading-relaxed">
          Brazilian-American programmer whose curiosity and analytical way of looking at life has led to a career
          building thoughtful tools.
        </p>
      </div>

      <!-- Featured Projects Section -->

      <h2 class="text-xs font-medium text-(--text-muted) uppercase tracking-widest mb-6">Featured projects</h2>
      <ul v-if="projects && projects.length">
        <li class="mb-4" v-for="project of projects" :key="project.slug">
          <ProjectCard v-if="project.featured" :projectInfo="project" />
        </li>
      </ul>
    </div>
  </div>
</template>
