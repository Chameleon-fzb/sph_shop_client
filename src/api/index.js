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

/* mock数据的接口请求函数 */

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
