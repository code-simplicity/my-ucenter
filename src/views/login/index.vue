<template>
	<div class="login flex-column">
		<div class="login-title">登录</div>
		<div class="login-form flex-center">
			<el-form
				ref="formRef"
				:model="form"
				:rules="rules"
				label-width="90px"
				label-suffix=":"
			>
				<el-form-item label="用户名" prop="form.name">
					<el-input v-model="model"></el-input>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script setup lang="ts" name="Login">
import { ref } from "vue";
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
