import service from "../utils/request";

/**
 * 发送验证码
 * @param params 
 * @returns 
 */
export const sendEmailCode = (params: {}) => {
    return service({
        url: "/uc/send/re/email-code",
        method: "get",
        params,
    });
}

/**
 * 发送重置密码邮件
 * @param params 
 * @returns 
 */
export const sendResetEmailCode = (params: {}) => {
    return service({
        url: "/uc/send/reset/email-code",
        method: "get",
        params,
    });
}