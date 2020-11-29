import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login'
import Index from '@/components/Index'
import DataTable from '@/components/DataTable'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },

  {
    path: '/admin',
    name: 'Login',
    component: Login
  },
  {
    path: '/data',
    name: 'DataTable',
    component: DataTable
  },

]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
