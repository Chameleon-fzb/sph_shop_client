import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Login from '@/pages/Login'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'

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
			keyword: route.params.keyword
		})
	},
	{
		name: 'detail',
		path: '/detail/:skuId',
		component: Detail,
		props: route => ({
			skuId: route.params.skuId
		})
	},

	{
		path: '/addCartSuccess',
		component: AddCartSuccess
	},
	{
		path: '/shopCart',
		component: ShopCart
	},
	{
		path: '/trade',
		component: Trade
	},
	{
		path: '/pay',
		component: Pay
	}
]
