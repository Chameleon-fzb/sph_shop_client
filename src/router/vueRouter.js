import VueRouter from 'vue-router'

const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function (location, onResolve, onReject) {
	if (onResolve || onReject)
		return originPush.call(this, location, onResolve, onReject)
	return originPush.call(this, location).catch(err => {
		if (VueRouter.isNavigationFailure(err)) {
			return err
		}
		return Promise.reject(err)
	})
}

VueRouter.prototype.replace = function (location, onResolve, onReject) {
	if (onResolve || onReject) {
		return originReplace.call(this, location, onResolve, onReject)
	}
	return originReplace.call(this, location).catch(err => {
		if (VueRouter.isNavigationFailure(err)) {
			return err
		}
		return Promise.reject(err)
	})
}
export default VueRouter
