import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Login from '@/pages/Login'

export default [
	{
		path: '/',
		component: Home
	},
	{
		path: '/login',
		component: Login,
		meta: { isHideFooter: true }
	},
	{
		path: '/register',
		component: Register,
		meta: { isHideFooter: true }
	},
	{
		name: 'search',
		path: '/search/:keyword?',
		component: Search,
		props: route => ({
			keyword: route.params.keyword,
			keyword2: route.query.keyword2
		})
	}
]
