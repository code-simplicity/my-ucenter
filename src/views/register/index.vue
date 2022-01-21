<template>
	<div class="register flex-column">
		<div class="register-title">注册</div>
		<div class="register-form flex-center">
			<el-form
				ref="formRef"
				:model="form"
				:rules="rules"
				label-width="90px"
				label-suffix=":"
			>
				<el-form-item label="邮箱地址" prop="email">
					<el-input v-model="form.email"></el-input>
				</el-form-item>
				<el-form-item label="用户昵称" prop="name">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="form.password"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm(formRef)"
						>注册</el-button
					>
					<span class="go-login">我已注册，直接登录</span>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";

const form = reactive({
	email: "",
	name: "",
	password: "",
});

const rules = reactive({
	email: [
		{
			required: true,
			message: "必须输入邮箱地址",
			trigger: "blur",
		},
	],
	name: [
		{
			required: true,
			message: "请输入一个独一无二的昵称吧",
			trigger: "blur",
		},
	],
	password: [
		{
			required: true,
			message: "请输入密码",
			trigger: "blur",
		},
	],
});

// 注册
const submitForm = () => {
	console.log("submitForm");
};

// 重置
const resetForm = () => {
	console.log("resetForm");
};
</script>
<style lang="scss" scope>
.register {
	width: 790px;
	background: $center-background;
	padding: 16px;
	.register-title {
		margin-bottom: 16px;
		font-size: 20px;
		font-weight: 500;
	}
	.register-form {
		width: 100%;
		height: 100%;
		.el-input {
			width: 300px;
		}
		.go-login {
			margin-left: 16px;
			cursor: pointer;
			font-size: 14px;
			&:hover {
				color: $hover;
			}
		}
	}
}
</style>
