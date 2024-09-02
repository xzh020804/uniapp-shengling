import { uniFetch } from './uni-fech'

//获取信息
export const getMessage = (query) =>
	uniFetch.get('/driver/messages/page', query)
