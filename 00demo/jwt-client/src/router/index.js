import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {requireAuth: true}
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {requireAuth: false}
    }
  ]
})
export default router;

router.beforeEach((to, from, next) => {
	if (to.meta.requireAuth) {
		const token = localStorage.getItem('token');
		if (token) {
			next();
		} else {
			next('/login');
		}
	} else {
		next();
	}
})
