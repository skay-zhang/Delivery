import axios from 'axios'
import { ElMessage } from 'element-plus'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let path = getPath();
// let path = 'http://127.0.0.1:38950/api';

const request = axios.create({
    baseURL: path,
    timeout: 10000
})

request.interceptors.request.use(
    config => {
        let token = localStorage.getItem("app:token");
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

request.interceptors.response.use(
    response => {
        let code = parseInt(response.data.code);
        if (code >= 10010 && code <= 10012) {
            localStorage.removeItem("app:token");
            ElMessage.error(response.data.message);
            return false;
        } else return response.data
    }, err => {
        if (err.code === 'ERR_NETWORK') ElMessage.error('无法连接服务器');
        else ElMessage.error('请求出错');
        throw err.code;
    }
)

function getPath() {
    let location = window.location;
    return location.protocol + '//' + location.host + '/api';
}

export default request