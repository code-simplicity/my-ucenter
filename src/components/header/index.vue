<template>
	<div class="header">
		<div class="header-center flex">
			<div class="header-logo">
				{{ systemTitle }}
			</div>
		</div>
	</div>
</template>
<script setup>
import { ref } from "vue";
import { systemTitle } from "@/config";
</script>

<style lang="scss" scoped>
.header {
	height: 50px;
	background: $header-background;
	padding: 0 16px;
	.header-center {
		margin: 0 auto;
		.header-logo {
			color: $black-font-size;
			line-height: 50px;
			font-size: 20px;
			font-weight: 600;
			margin-left: 120px;
		}
	}
}
</style>
