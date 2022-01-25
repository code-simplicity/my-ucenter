import service from "../utils/request";

/**
 * 注册用户
 * @param param 
 * @param data 
 * @returns 
 */
export const registerUser = (param: string, data: {}) => {
    return service({
        url: `/uc/user?emailCode=${param}`,
        method: "post",
        data,
    })
}

/**
 * 登录
 * @param data 
 * @param param 
 * @returns 
 */
export const doLogin = (data: {}, param: string) => {
    return service({
        url: `/uc/user/login?verifition=${param}`,
        method: "post",
        data
    })
}

/**
 * 检查是否存在token
 * @returns 
 */
export const checkToken = () => {
    return service({
        url: "/uc/user/check/token",
        method: "get",
    })
}

/**
 * 退出登录
 * @returns 
 */
export const doLogout = () => {
    return service({
        url: "/uc/user/logout",
        method: "get",
    })
}