import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import MarketPage from '../views/MarketPage.vue'
import DetailPage from '../views/DetailPage.vue'
import LoginPage from '../views/LoginPage.vue'
import AddGamePage from '../views/AddGamePage.vue'
import ProfilePage from '../views/ProfilePage.vue'
import { authService } from '@/services/directus.service';
import { toastController } from '@ionic/vue';

const loginRequiredRouteGuard = async () => {
  const userAccessToken = localStorage.getItem("auth_token");
  if (!userAccessToken) {
    const errorToast = await toastController.create({
      message: "You must first login or register",
      duration: 3000,
      color: "tertiary"
    });

    await errorToast.present();

    return { name: "Login" }
  }

  const userAccessTokenExpiresAt = localStorage.getItem("auth_expires_at") as unknown as number;
  if (userAccessTokenExpiresAt < new Date().getTime()) {

    const errorToast = await toastController.create({
      message: "User session is expired. Login again.",
      duration: 3000,
      color: "warning"
    });

    await errorToast.present();

    await authService.logout();
    return { name: "Login" }
  }
} 

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/market',
    name: 'Market',
    component: MarketPage
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: DetailPage,
    beforeEnter: [loginRequiredRouteGuard]
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/add',
    name: 'Add',
    component: AddGamePage,
    beforeEnter: [loginRequiredRouteGuard]
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfilePage,
    beforeEnter: [loginRequiredRouteGuard]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
