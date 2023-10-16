import { createRouter, createWebHistory } from 'vue-router'
import UrunlerListesi from '../views/UrunlerListesi.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: UrunlerListesi,
  },
  {
    path: '/sepet',
    name: 'SepetDetay',
    component: () => import('../views/SepetDetay.vue')
  },
  {
      path: '/urun/:id',
      name: 'UrunDetay',
      component: () => import('../views/UrunDetay.vue'),
      props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
