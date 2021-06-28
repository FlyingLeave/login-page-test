import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/',
			component: () => import(/*webpackChunkName: "HomePage"*/ '@/views/HomePage')
		},
		{
			path: '/register',
			alias: '/registration',
			component: () => import(/*webpackChunkName: "RegistrationPage"*/ '@/views/RegistrationPage')
		},
		{
			path: '/login',
			component: () => import(/*webpackChunkName: "LoginPage"*/ '@/views/LoginPage')
		},
		{
			path: '/cabinet',
			component: () => import(/*webpackChunkName: "CabinetPage"*/ '@/views/CabinetPage')
		},
		{
			path: '*',
			component: () => import(/*webpackChunkName: "NotFound"*/ '@/views/404')
		}
	]
})

router.beforeEach( (to, from, next) => {
	let locker = 'open'

	if ( to.path === '/' && locker === 'open' ) {
		let loggedInUser = JSON.parse( localStorage.getItem('loggedInUser' ))
		
		if ( loggedInUser && loggedInUser.jwt ) {
			locker = 'closed'
			
			next()

		} else {
			next('/login')
		}

	} else {
		next()
	}

	if ( to.path === '/cabinet' ) {
		let userData = window.localStorage.getItem('loggedInUser')

		if ( !userData ) next('/login')

		next()
	}

	if ( to.path === '/login' ) {
		let userData = window.localStorage.getItem('loggedInUser')

		if ( userData ) next('/cabinet')

		next()
	}
} )

export default router