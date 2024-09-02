import { uniFetch } from './uni-fech'

//获取任务列表

export const getTask = (query) => uniFetch.get('/driver/tasks/list', query)

//获取任务详情
export const getTaskDetail = (id) => uniFetch.get(`/driver/tasks/details/${id}`)

//延迟提货
export const delayTask = (data) => uniFetch.put('/driver/tasks/delay', data)

//提货
export const pickupTask = (data) =>
	uniFetch.post('/driver/tasks/takeDelivery', data)

//上报异常
export const postExcept = (data) =>
	uniFetch.post('/driver/tasks/reportException', data)

//任务交付
export const postTask = (data) => uniFetch.post('/driver/tasks/deliver', data)

//回车登记
export const taskRecord = (data) =>
	uniFetch.post('/driver/tasks/truckRegistration', data)
