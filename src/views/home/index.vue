<template>
	<div class="home">
		<div class="home-login" v-if="checkLogin && userInfo">
			<div class="avatar">
				<el-avatar :size="80" :src="userInfo.avatar"></el-avatar>
			</div>
			<div class="user-name">
				<span>{{ userInfo.userName }}</span>
			</div>
			<div class="action">
				<el-button type="primary" @click="toPassword">重置密码</el-button>
				<el-button type="danger" @click="logout">退出登录</el-button>
			</div>
		</div>
		<div class="home-logout flex-center" v-else>
			<div class="no-login">
				<el-button type="primary" @click="toLogout">登录</el-button>
			</div>
			<div class="no-register">
				<el-button type="warning" @click="toRegister">注册</el-button>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts" name="Home">
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { doLogout } from "../../api/user";
import { useRouter } from "vue-router";

const router = useRouter();

//声明store
const store = useStore();
// 获取用户信息
const userInfo = computed(() => store.getters["user/userInfo"]);

// 退出登录
const logout = () => {
	store.dispatch("user/logout");
	// 路由重定向
	router.replace({
		path: "/login",
	});
};

// 检查是否登录
const checkLogin = computed(() => store.getters["user/token"]);

// 去登录
const toLogout = () => {
	router.replace({
		path: "/login",
	});
};

// 去注册
const toRegister = () => {
	router.replace({
		path: "/register",
	});
};

// 重置密码
const toPassword = () => {
	router.push({
		path: "/forgot",
	});
};
</script>
<style lang="scss" scope>
.home {
	width: 790px;
	background: $center-background;
	padding: 16px;
	.home-login {
		.avatar {
		}
		.user-name {
			margin: 6px 0px 10px 0;
			span {
				font-size: 24px;
				color: $light-font-color;
			}
		}
	}
	.home-logout {
		.no-login {
			margin-right: 10px;
		}
	}
}
</style>
