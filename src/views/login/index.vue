<template>
	<div class="login flex-column">
		<div class="login-title">登录</div>
		<div class="login-form flex-center">
			<el-form
				ref="formRef"
				:model="user"
				:rules="rules"
				label-width="90px"
				label-suffix=":"
			>
				<el-form-item label="账户" prop="user_name">
					<el-input
						v-model="user.user_name"
						placeholder="请输入用户名/邮箱地址"
						:prefix-icon="User"
						clearable
					></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input
						v-model="user.password"
						placeholder="请输入密码"
						:prefix-icon="Unlock"
						clearable
					></el-input>
				</el-form-item>
				<el-form-item label="验证码" prop="captcha">
					<el-input
						v-model="user.captcha"
						placeholder="请输入密码"
						:prefix-icon="CircleCheck"
						clearable
					></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="loginBtn">注册</el-button>
					<span class="go-register" @click="toRegister"
						>未注册？注册新账户</span
					>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script setup lang="ts" name="Login">
import { ref, reactive } from "vue";
import { Unlock, User, CircleCheck } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
// 路由
const router = useRouter();
// 表单数据
const user = reactive({
	user_name: "",
	password: "",
	captcha: "",
});
const rules = reactive({});

// 登录
const loginBtn = () => {};

// 注册
const toRegister = () => {
	router.push({
		path: "/register",
	});
};
</script>
<style lang="scss" scope>
.login {
	width: 790px;
	background: $center-background;
	padding: 16px;
	.login-title {
		margin-bottom: 16px;
		font-size: 20px;
		font-weight: 500;
	}
	.login-form {
		width: 100%;
		height: 100%;
		.el-input {
			width: 250px;
		}
		.go-register {
			margin-left: 16px;
			cursor: pointer;
			font-size: 14px;
			color: $light-font-color;
			&:hover {
				color: $hover;
			}
		}
	}
}
</style>
