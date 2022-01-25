<template>
	<div class="home">
		<div class="avatar">
			<el-avatar :size="80" :src="userInfo.avatar"></el-avatar>
		</div>
		<div class="user-name">
			<span>{{ userInfo.userName }}</span>
		</div>
		<div class="action">
			<el-button type="primary">修改密码</el-button>
			<el-button type="info">退出登录</el-button>
		</div>
	</div>
</template>
<script setup lang="ts" name="Home">
import { ref, computed } from "vue";
import { useStore } from "vuex";

//声明store
const store = useStore();

// 获取用户信息
const userInfo = computed(() => store.getters["user/userInfo"]);
</script>
<style lang="scss" scope>
.home {
	width: 790px;
	background: $center-background;
	padding: 16px;
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
</style>
