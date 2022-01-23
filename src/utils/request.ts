import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
const baseUrl: any = import.meta.env.VITE_BASE_URL
// const baseUrl = "http://localhsot:40100"

import constants from './constants'

const showStatus = (status: any) => {
    if (status === 403) {
        // 登录
    } else {
        ElMessage.error({
            message: `请求错误${status}`
        })
    }
}

const service = axios.create({
    // baseUrl: baseUrl,
    timeout: 10 * 60000,
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})

// 设置响应式数据
service.defaults.responseType = "json";

service.defaults.baseURL = baseUrl

service.defaults.withCredentials = true;

service.defaults.validateStatus = () => {
    return true
}

// 请求统一处理
service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        config.withCredentials = true
        return config
    },
    // 抛出异常
    (error) => {
        console.log(error)
        ElMessage.error({
            message: "服务器异常，请联系管理员."
        })
        return Promise.reject(error)
    }
)

// 响应拦截
service.interceptors.response.use(
    (response: AxiosResponse) => {
        const { data, status } = response
        if (status === constants.status) {
            return Promise.resolve(data)
        } else {
            showStatus(status)
        }
    },
    (error) => {
        console.log(error)
        const badMessage = error.message || error
        const code = parseInt(badMessage.toString().replace("Error: Request failed with status code ", ""))
        showStatus({
            code,
            message: badMessage
        })
        return Promise.reject(error)
    }
)

export default service