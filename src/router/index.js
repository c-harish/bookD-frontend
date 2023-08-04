import {
	createRouter,
	createWebHistory
} from 'vue-router'
import HomeView from '../components/HomeView.vue'
import RegisterView from '../components/RegisterView.vue'
import AdminLogin from '../components/AdminLogin.vue'
import UserLogin from '../components/UserLogin.vue'
import AdminDashboard from '../components/AdminDashboard.vue'
import AdminSummary from '../components/AdminSummary.vue'
import UserDashboard from '../components/UserDashboard.vue'
import UserBookings from '../components/UserBookings.vue'
import UserProfile from '../components/UserProfile.vue'

const routes = [
	{
		path: '/',
		name: 'HomeView',
		component: HomeView
	},
	{
		path: '/register',
		name: 'RegisterView',
		component: RegisterView
	},
	{
		path: '/login/user',
		name: 'UserLogin',
		component: UserLogin
	},
	{
		path: '/login/admin',
		name: 'AdminLogin',
		component: AdminLogin
	},
	{
		path: '/admin',
		name: 'AdminDashboard',
		component: AdminDashboard
	},
	{
		path: '/user',
		name: 'UserDashboard',
		component: UserDashboard
	},
	{
		path: '/user/bookings',
		name: 'UserBookings',
		component: UserBookings
	},
	{
		path: '/user/profile',
		name: 'UserProfile',
		component: UserProfile
	},
	{
		path: '/admin/summary',
		name: 'AdminSummary',
		component: AdminSummary
	}
]

const router = createRouter({
	history: createWebHistory(
		process.env.BASE_URL
	),
	routes
})

export default router
