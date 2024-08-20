import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Coba from '../views/Pegawai.vue';
import Upload from '../views/upload.vue';
import DefaultLayout from '../components/DefaultLayout.vue';
import Hasil from '../components/Hasil.vue'
const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '/',
        name: 'home',
        component: Home,
      },
      {
        path: '/ticket',
        name: 'coba',
        component: Coba,
      },
      {
        path: '/upload',
        name: 'upload',
        component: Upload,
      },
    ]
  },
  {
    path: '/TicketAnda',
    name: 'hasil',
    component: Hasil,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  }
});

export default router;
