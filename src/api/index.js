import { get } from 'lodash'
import ajax from './ajax'
import mockAjax from './mockAjax'

/**
 * 请求三级菜单 GET
 */
export const reqCategoryList = () => ajax('/product/getBaseCategoryList')

/**
 * 请求轮播 GET
 */
export const reqBanner = () => ajax('/cms/banner')

/**
 * ? todyRecommend 今日推荐 GET
 **/
export const reqRecommends = () => mockAjax('/recommends')
/**
 * ? floor GET
 **/
export const reqFloors = () => mockAjax('/floors')
/**
 * ? ranks GET
 */
export const reqRanks = () => mockAjax('/ranks')
/**
 * ? Like GET
 */
export const reqLikes = () => mockAjax('/likes')

/**
 * ? 搜索分页
 **/
export const reqSearch = searchParams => ajax.post('/list', searchParams)

/**
 * ? 请求商品详情
 */
export const reqDetailInfo = skuId =>
	ajax({ url: `/item/${skuId}`, method: 'GET' })

/**
 *? 添加到购物车或更新购物车数量
 */
export const addOrUpdCart = (skuId, skuNum) =>
	ajax({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'POST' })

/**
 * ? 获取购物车列表
 *
 */
export const reqShopCartList = () => ajax('/cart/cartList')

/**
 * ? 修改是否选中
 */
export const reqUpdCartIsCheck = (skuId, isChecked) =>
	ajax({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'GET' })
/**
 * ? 删除购物车商品
 */
export const reqDelCart = skuId =>
	ajax({ url: `/cart/deleteCart/${skuId}`, method: 'DELETE' })
/**
 * ? 注册
 */
export const reqRegister = userInfo =>
	ajax({ url: '/user/passport/register', method: 'Post', data: userInfo })
/**
 * 获取验证码
 **/
export const reqSecurityCode = phone =>
	ajax({
		url: `/user/passport/sendCode/${phone}`,
		method: 'GET'
	})
/**登录 */
export const reqLogin = userInfo =>
	ajax({
		url: '/user/passport/login',
		method: 'POST',
		data: userInfo
	})
