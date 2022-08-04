import request from './request'

// 初始化接口
const api = {
    init(){
        return request({
            url: '/init',
            method: 'GET'
        })
    },
    getList(){
        return request({
            url: '/list',
            method: 'GET'
        })
    }
}

export default api