/**
 * 1) 先从localStorage 获取
 * 2) 没有在调用uuid 创建新的存储到localStorage
 */
import { v4 as uuidv4 } from 'uuid'
function getUserTempId() {
	let userTempId = localStorage.getItem('USER_TEMP_ID_KEY')
	if (!userTempId) {
		userTempId = uuidv4()
		localStorage.setItem('USER_TEMP_ID_KEY', userTempId)
	}
	return userTempId
}

export { getUserTempId }
