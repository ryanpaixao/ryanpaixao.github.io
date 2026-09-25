import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import ProjectDetailView from '@/views/ProjectDetailView.vue'
import PageNotFound from '@/views/PageNotFound.vue'
import { projects } from '@/data/projects'

// restrict :slug to known projects so unknown slugs fall through to the not-found route
const projectSlugPattern = projects.map((p) => p.slug).join('|')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)',
      name: 'page-not-found',
      component: PageNotFound,
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsView,
    },
    {
      path: `/projects/:slug(${projectSlugPattern})`,
      name: 'project',
      component: ProjectDetailView,
    },
    {
      path: '/projects/:pathMatch(.*)*',
      name: 'project-not-found',
      component: PageNotFound,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
