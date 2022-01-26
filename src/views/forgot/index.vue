<template>
	<div class="forgot flex-column">
		<div class="forgot-title">重置密码</div>
		<div class="forgot-form flex-center">
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
						placeholder="请输入邮箱地址"
						:prefix-icon="Message"
						clearable
					></el-input>
					<el-button
						class="margin-left"
						type="primary"
						:icon="Message"
						@click="showVerify"
						:disabled="isSendEmailBtn"
						>{{ sendEmailBtnText }}</el-button
					>
				</el-form-item>
				<el-form-item label="验证码" prop="captcha">
					<el-input
						v-model="form.captcha"
						placeholder="请输入验证码"
						:prefix-icon="CircleCheck"
						clearable
					></el-input>
				</el-form-item>
				<el-form-item label="昵称" prop="userName">
					<el-input
						v-model="form.userName"
						placeholder="请输入用户昵称"
						:prefix-icon="User"
						clearable
					></el-input>
				</el-form-item>
				<el-form-item label="新密码" prop="password">
					<el-input
						v-model="form.password"
						placeholder="请输入新密码"
						type="password"
						:prefix-icon="Unlock"
						clearable
					></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="updateForm">重置</el-button>
					<el-button @click="toBack">返回</el-button>
				</el-form-item>
			</el-form>
		</div>
		<Verify
			mode="pop"
			:captchaType="captchaType"
			:imgSize="{ width: '400px', height: '200px' }"
			ref="verify"
			@success="doSendEmailCode"
		></Verify>
	</div>
</template>
<script setup lang="ts" name="Forget">
import { ref, reactive, Ref, computed } from "vue";
import { Message, User, Unlock, CircleCheck } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import type { ElForm } from "element-plus";
import { useRouter } from "vue-router";
import { Md5 } from "ts-md5/dist/md5";
import { sendEmailCode } from "../../api/email";
import { registerUser } from "../../api/user";
import constants from "../../utils/constants";
import Verify from "@/components/verifition/Verify.vue";
import { useStore } from "vuex";

// 响应式路由
const router = useRouter();

// vuex
const store = useStore();

// 表单数据
let form = reactive({
	email: "",
	userName: "",
	password: "",
	captcha: "",
});

const formRef = ref<InstanceType<typeof ElForm>>();

// 获取用户信息
const userInfo = computed(() => store.getters["user/userInfo"]);

// 初始化表单，用户登录以后可以存储信息
const init = () => {
	if (userInfo && userInfo.value !== "") {
		form = userInfo.value;
	}
};

init();

// 验证规则
const rules = reactive({
	email: [
		{
			required: true,
			message: "必须输入邮箱地址",
			trigger: "blur",
		},
	],
	userName: [
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

// 逻辑常量，验证码没有填写之前不可以点击
const isEmailCodeCompleted: Ref<boolean> = ref(true);
// 禁止发送按钮
const isSendEmailBtn: Ref<boolean> = ref(false);
// 按钮文字发生改变
const sendEmailBtnText: Ref<string> = ref("获取验证码");
// 展示verify
const verify = ref();
// verify类型
const captchaType = ref("blockPuzzle");

// 展示验证码
const showVerify = () => {
	// 检查邮箱是否正确
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
	verify.value.show();
};

// 发送验证码
const doSendEmailCode = (data: any) => {
	// 封装邮箱数据
	const params = {
		verifition: data.captchaVerification,
		email: form.email,
	};
	// 发送邮箱验证码
	sendEmailCode(params).then((res: any) => {
		if (res.code === constants.success) {
			ElMessage.success({
				message: res.msg,
			});
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
			isSendEmailBtn.value = true;
		} else {
			// 重新发送
			sendEmailBtnText.value = "重新发送（" + time + "）";
		}
	}, 1000);
};

// 重置密码
const updateForm = (): void => {
	form.password = Md5.hashStr(form.password);
	// 封装数据
	const params = {
		email: form.email,
		name: form.userName,
		password: form.password,
	};
};

// 返回上一个页面
const toBack = () => {
	router.go(-1);
};
</script>
<style lang="scss" scope>
.forgot {
	width: 790px;
	background: $center-background;
	padding: 16px;
	.forgot-title {
		margin-bottom: 16px;
		font-size: 20px;
		font-weight: 500;
	}
	.forgot-form {
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
