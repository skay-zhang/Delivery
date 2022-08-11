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
  download(file, monitor) {
    return request({
      url: '/down/' + file.code,
      method: 'GET',
      responseType: 'blob',
      timeout: 0,
      onDownloadProgress: event => {
        monitor(file,event);
      }
    });
  }
}

export default api