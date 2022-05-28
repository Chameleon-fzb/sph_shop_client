// import Home from '@/pages/Home'
const Home = () => import('@/pages/Home')
const Search = () => import('@/pages/Search')
const Login = () => import('@/pages/Login')
const Register = () => import('@/pages/Register')
const Detail = () => import('@/pages/Detail')
const AddCartSuccess = () => import('@/pages/AddCartSuccess')
const ShopCart = () => import('@/pages/ShopCart')
const Trade = () => import('@/pages/Trade')
const Pay = () => import('@/pages/Pay')
const PaySuccess = () => import('@/pages/PaySuccess')
const Center = () => import('@/pages/Center')
const MyOrder = () => import('@/pages/Center/MyOrder')
const GroupOrder = () => import('@/pages/Center/GroupOrder')
import store from '@/store'

export default [
	{
		path: '/',
		component: Home
	},
	{
		path: '/login',
		component: Login,
		meta: { isHideFooter: true },
		beforeEnter: (to, from, next) => {
			const token = store.state.user.token
			if (token) {
				next('/')
			} else {
				next()
			}
		}
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
		component: AddCartSuccess,
		beforeEnter: (to, from, next) => {
			let skuNum = to.query.skuNum
			let skuInfo = sessionStorage.getItem('SKU_INFO_KEY')
			if (skuNum && skuInfo) {
				next()
			} else {
				next('/')
			}
		}
	},
	{
		path: '/shopCart',
		component: ShopCart
	},
	{
		path: '/trade',
		component: Trade,
		beforeEnter: (to, from, next) => {
			if (from.path === '/shopCart') {
				next()
			} else {
				next('/')
			}
		}
	},
	{
		path: '/pay',
		component: Pay,
		beforeEnter: (to, from, next) => {
			if (from.path === '/trade') {
				next()
			} else {
				next('/')
			}
		}
	},
	{
		path: '/paySuccess',
		component: PaySuccess,
		beforeEnter: (to, from, next) => {
			if (from.path === '/pay') {
				next()
			} else {
				next('/')
			}
		}
	},
	{
		path: '/center',
		component: Center,
		// redirect: '/center/myOrder'
		children: [
			{
				path: 'myOrder',
				component: MyOrder
			},
			{
				path: 'groupOrder',
				component: GroupOrder
			},
			{
				path: '',
				//重定向到我的订单
				redirect: 'myOrder'
			}
		]
	}
]
