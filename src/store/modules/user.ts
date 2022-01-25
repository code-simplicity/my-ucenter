import { doLogin } from "../../api/user"
import { getToken } from "../../utils/token"
import { getUserInfo } from "../../utils/userInfo"
import constants from "../../utils/constants";
import { ElMessage } from "element-plus";

const state = () => ({
    token: null,
    userInfo: getUserInfo()
})

const getters = {
    token(state) {
        return state.token
    },
    userInfo(state) {
        return state.userInfo
    }
}

const mutations = {
    tokenChange(state, token) {
        state.token = token
        // 设置token存储
    }
}

const actions = {
    // 登录
    login({
        commit,
        dispatch
    }, data) {
        return new Promise((resolve) => {
            doLogin(data, data.captchaVerification).then((res: any) => {
                if (res.code === constants.success) {
                    // commit("tokenChange", res)
                    ElMessage.success({
                        message: res.msg,
                    });
                    resolve(res)
                } else {
                    ElMessage.error({
                        message: res.msg,
                    });
                }
            })
        })

    }
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
};