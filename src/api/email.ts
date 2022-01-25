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