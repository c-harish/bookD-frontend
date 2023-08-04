import 'bootstrap/dist/css/bootstrap.css'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import HomeNavbar from './components/HomeNavbar.vue'
import UserNavbar from './components/UserNavbar.vue'
import UserDashboard from './components/UserDashboard.vue'
import UserBookings from './components/UserBookings.vue'
import UserProfile from './components/UserProfile.vue'

import AdminNavbar from './components/AdminNavbar.vue'
import AdminDashboard from './components/AdminDashboard.vue'
import AdminSummary from './components/AdminSummary.vue'



const app = createApp(App)
app.use(router)
app.component('home-navbar', HomeNavbar)
app.component('user-dashboard', UserDashboard)
app.component('user-navbar', UserNavbar)
app.component('user-bookings', UserBookings)
app.component('user-profile', UserProfile)

app.component('admin-dashboard', AdminDashboard)
app.component('admin-navbar', AdminNavbar)
app.component('admin-summary', AdminSummary)


app.mount('#app')

import 'bootstrap/dist/js/bootstrap.js'
