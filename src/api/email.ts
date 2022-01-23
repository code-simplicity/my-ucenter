import service from "@/utils/request";

export const sendEmailCode = (params: {}) => {
    return service({
        url: "/uc/send/re/email-code",
        method: "get",
        params,
    });
}