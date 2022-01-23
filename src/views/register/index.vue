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
				<el-form-item label="邮箱" prop="email">
					<el-input
						v-model="form.email"
						placeholder="请输入邮箱"
						@blur="checkEmailCode"
						:prefix-icon="Message"
						clearable
					></el-input>
					<el-button
						class="margin-left"
						type="primary"
						:icon="Message"
						@click="doSendEmaolCode"
						:disabled="isSendEmailBtn"
						>{{ sendEmailBtnText }}</el-button
					>
				</el-form-item>
				<el-form-item label="验证码" prop="captcha">
					<el-input
						v-model="form.captcha"
						placeholder="请输入验证码"
						@blur="checkEmailCode"
						:prefix-icon="CircleCheck"
						clearable
					></el-input>
				</el-form-item>
				<el-form-item label="昵称" prop="name">
					<el-input
						v-model="form.name"
						placeholder="用户昵称"
						:disabled="isEmailCodeCompleted"
						:prefix-icon="User"
						clearable
					></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input
						v-model="form.password"
						placeholder="密码"
						:disabled="isEmailCodeCompleted"
						type="password"
						:prefix-icon="Unlock"
						clearable
					></el-input>
				</el-form-item>
				<el-form-item>
					<el-button
						type="primary"
						@click="registerForm"
						:disabled="isEmailCodeCompleted"
						>注册</el-button
					>
					<span class="go-login">我已注册，直接登录</span>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script setup lang="ts" name="Register">
import { ref, reactive, Ref } from "vue";
import { Message, User, Unlock, CircleCheck } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { Md5 } from "ts-md5/dist/md5";
import { sendEmailCode } from "@/api/email";
import { registerUser } from "@/api/user";
import constants from "@/utils/constants";
const form = reactive({
	email: "",
	name: "",
	password: "",
	captcha: "",
});

// 逻辑常量，验证码没有填写之前不可以点击
const isEmailCodeCompleted: Ref<boolean> = ref(true);
// 禁止发送按钮
const isSendEmailBtn: Ref<boolean> = ref(false);
// 按钮文字发生改变
const sendEmailBtnText: Ref<string> = ref("获取验证码");

// 响应式路由
const router = useRouter();

// 验证规则
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
	captcha: [
		{
			required: true,
			message: "请输入邮箱验证码",
			trigger: "blur",
		},
	],
});

// 发送验证码
const doSendEmaolCode = () => {
	// 发送之前检查邮箱地址
	// 不可以为空
	if (form.email === "") {
		// 验证码不可以为空
		ElMessage.error({
			message: "请输入正确的邮箱地址",
		});
		return;
	}
	// 邮箱验证正则表达式
	const reg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
	if (!reg.test(form.email)) {
		ElMessage.warning({
			message: "邮箱格式不正确",
		});
		return;
	}
	// 封装邮箱数据
	const params = {
		email: form.email,
	};
	// 发送邮箱验证码
	sendEmailCode(params).then((res: any) => {
		if (res.code === constants.success) {
			ElMessage.success({
				message: res.msg,
			});
			console.log(res);
			// 禁止发送按钮
			isSendEmailBtn.value = true;
			// 出现倒计时60s
			countDown();
		} else {
			ElMessage.error({
				message: res.msg,
			});
		}
	});
};

/**
 * 开始倒计时
 */
const countDown = () => {
	let time = 60;
	const sendTime = setInterval(() => {
		time--;
		if (time < 0) {
			clearInterval(sendTime);
			sendEmailBtnText.value = "获取验证码";
			// 按钮可以点击
			isSendEmailBtn.value = false;
		} else {
			// 重新发送
			sendEmailBtnText.value = "重新发送（" + time + "）";
		}
	}, 1000);
};

/**
 * 检查邮箱和验证码输入框是否有内容输入
 */
const checkEmailCode = () => {
	// 检查邮箱和验证码是否有内容
	if (form.email !== "" && form.captcha !== "") {
		isEmailCodeCompleted.value = false;
	}
};

// 注册用户
const registerForm = (): void => {
	form.password = Md5.hashStr(form.password);
	// 封装数据
	const params = {
		email: form.email,
		name: form.name,
		password: form.password,
	};
	registerUser(form.captcha, params).then((res: any) => {
		if (res.code === constants.success) {
			ElMessage.success({
				message: res.msg,
			});
			// 跳转到登录界面
			router.push({
				path: "/login",
			});
		} else {
			// 失败
			ElMessage.error({
				message: "注册失败，请检查重试！",
			});
		}
	});
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
			width: 250px;
		}
		.go-login {
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
