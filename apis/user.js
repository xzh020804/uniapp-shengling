import { uniFetch } from './uni-fech.js'

//通过密码登录
export const loginByPassword = (data) => {
	return uniFetch.post('/driver/login/account', data)
}

//获取用户信息
export const getUserInfo = () => {
	return uniFetch.get('/driver/users')
}

//获取车辆信息
export const getTruckInfo = () => uniFetch.get('/driver/users/truck')
