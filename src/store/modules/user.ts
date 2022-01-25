import { doLogin, checkToken, doLogout } from "../../api/user"
import { getToken } from "../../utils/token"
import { getUserInfo, setUserInfo, reomveUserInfo } from "../../utils/userInfo"
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
    },
    userInfoChange(state, userInfo) {
        state.userInfo = userInfo
        setUserInfo(userInfo)
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
                    ElMessage.success({
                        message: res.msg,
                    });
                    // 设置用户信息
                    const userVo = res.data
                    commit("userInfoChange", userVo)
                    resolve(res)
                } else {
                    ElMessage.error({
                        message: res.msg,
                    });
                }
            })
        })
    },
    // 检查是否登录
    async chenkLogin({ commit }) {
        await checkToken().then((res: any) => {
            if (res.code === constants.success) {
                console.log("res", res)
                ElMessage.success({
                    message: res.msg,
                })
            } else {
                ElMessage.error({
                    message: res.msg,
                })
            }
        })
    },
    // 退出登录
    logout() {
        doLogout().then((res: any) => {
            if (res.code === constants.success) {
                // 退出登录成功
                ElMessage.success({
                    message: res.msg,
                })
                // 删除缓存
                localStorage.removeItem("vuex")
                reomveUserInfo();
            }
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