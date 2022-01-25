
/**
 * 获取用户信息
 * @returns 
 */
export const getUserInfo = () => {
    return JSON.parse(localStorage.getItem("user_info"))
}

/**
 * 设置用户信息
 * @param userInfo 
 * @returns 
 */
export const setUserInfo = (userInfo: any) => {
    return localStorage.setItem("user_info", JSON.stringify(userInfo))
}

/**
 * 删除用户信息
 * @returns 
 */
export const reomveUserInfo = () => {
    return localStorage.removeItem("user_info")
}