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
        url: `/uc/login?verifition=${param}`,
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
        url: "/uc/check/token",
        method: "get",
    })
}