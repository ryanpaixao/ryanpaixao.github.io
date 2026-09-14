<script setup lang="ts"></script>

<template>
  <nav class="main-nav bg-green-500">
    <RouterLink class="main-nav-button" to="/">Home</RouterLink>
    <RouterLink class="main-nav-button" to="/projects">Projects</RouterLink>
    <RouterLink class="main-nav-button" to="/about">About</RouterLink>
  </nav>
</template>

<style>
.main-nav {
  margin-left: 4px !important;
}
.main-nav-button {
  padding: 8px;
  background-color: lime;
  border: solid green 0.5px;
}
</style>
