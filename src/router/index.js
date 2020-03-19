import Vue from 'vue'
import VueRouter from 'vue-router'


const DashboardLayout = () => import( /* webpackChunkName: "dashboard" */ '../components/dashboardLayout.vue')

function loadView(view) {
  return () => import(
    /* webpackChunkName: "view-[request]" */ `../components/dashboardContents/${view}.vue`)
}

Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: DashboardLayout,
  children: [
    {
      name: 'Tamu',
      path: '',
      component: loadView('Tamu'),
    },
  ]
}]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
