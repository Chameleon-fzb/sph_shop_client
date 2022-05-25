/**
 * 1) 先从localStorage 获取
 * 2) 没有在调用uuid 创建新的存储到localStorage
 */
import { v4 as uuidv4 } from 'uuid'

const TOKEN_KEY = 'TOKEN_KEY'

function getUserTempId() {
	let userTempId = localStorage.getItem('USER_TEMP_ID_KEY')
	if (!userTempId) {
		userTempId = uuidv4()
		localStorage.setItem('USER_TEMP_ID_KEY', userTempId)
	}
	return userTempId
}

/**保存 token 到 localStorage */
function setToken(token) {
	if (!token) return
	localStorage.setItem(TOKEN_KEY, token)
}
/**从 localStorage 获取 token */
function getToken() {
	let token = localStorage.getItem(TOKEN_KEY)
	return token
}
/* 删除 token */
function removeToken() {
	localStorage.removeItem(TOKEN_KEY)
}
export { getUserTempId, getToken, setToken, removeToken }
