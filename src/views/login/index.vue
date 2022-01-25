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
				<el-form-item label="账户" prop="name">
					<el-input
						v-model="user.name"
						placeholder="请输入用户名/邮箱地址"
						:prefix-icon="User"
						autofocus
						clearable
					></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input
						v-model="user.password"
						placeholder="请输入密码"
						type="password"
						:prefix-icon="Unlock"
						clearable
					></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="showVerify">登录</el-button>
					<span class="go-register" @click="toRegister"
						>未注册？注册新账户</span
					>
				</el-form-item>
			</el-form>
		</div>
		<Verify
			mode="pop"
			:captchaType="captchaType"
			:imgSize="{ width: '400px', height: '200px' }"
			ref="verify"
			@success="loginBtn"
		></Verify>
	</div>
</template>
<script setup lang="ts" name="Login">
import { ref, reactive } from "vue";
import { Unlock, User } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import Verify from "@/components/verifition/Verify.vue";
import { ElForm, ElMessage } from "element-plus";
import { Md5 } from "ts-md5";
import { useStore } from "vuex";

// 路由
const router = useRouter();

// vuex
const store = useStore();

// 表单验证
const formRef = ref<InstanceType<typeof ElForm>>();

// 表单数据
const user = reactive({
	name: "",
	password: "",
});

// 验证规则
const rules = reactive({
	name: [
		{
			required: true,
			message: "输入你独一无二的昵称/邮箱地址",
			trigger: "blur",
		},
	],
	password: [
		{
			required: true,
			message: "输入你的密码",
			trigger: "blur",
		},
	],
});

// 展示verify
const verify = ref();
// verify类型
const captchaType = ref("blockPuzzle");

// 展示
const showVerify = () => {
	if (user.name === "") {
		return ElMessage.error({
			message: "输入你独一无二的昵称/邮箱地址",
		});
	}
	if (user.password === "") {
		return ElMessage.error({
			message: "输入你独一无二的昵称/邮箱地址",
		});
	}
	verify.value.show();
};

// 登录
const loginBtn = (data: any) => {
	// 修改密码为MD5加密
	user.password = Md5.hashStr(user.password);
	const params = {
		name: user.name,
		password: user.password,
		captchaVerification: encodeURIComponent(data.captchaVerification),
	};
	//登录
	store.dispatch("user/login", params).then(() => {
		router.replace({
			path: "/home",
		});
	});
};

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
