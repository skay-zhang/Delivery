import request from './request'

// 初始化接口
const api = {
    init() {
        return request({
            url: '/init',
            method: 'GET'
        })
    },
    getList() {
        return request({
            url: '/list',
            method: 'GET'
        })
    },
    download(code) {
        return request({
            url: '/down/' + code,
            method: 'GET',
            responseType: "blob"
        });
    }
}

export default api