<template>
	<div class="footer">
		<div class="footer-center flex-column">
			<div class="copy-right">{{ copyRight }}</div>
			<div class="about-info">关于我们 | 加入我们 | 友情链接</div>
		</div>
	</div>
</template>
<script setup>
import { ref } from "vue";
import { copyRight } from "@/config";
</script>
<style lang="scss" scope>
.footer {
	position: absolute;
	bottom: 16px;
	text-align: center;
	width: 100%;
	padding-top: 20px;
	margin-top: 16px;
	border-top: 1px solid #ddd;
	background: $background;

	.footer-center {
		margin: 0 auto;
		color: $light-font-color;
		.copy-right {
			cursor: pointer;
		}
		.about-info {
			cursor: pointer;
		}
	}
}
</style>
