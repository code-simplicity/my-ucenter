<template>
	<div class="layout">
		<Header></Header>
		<div class="layout-center flex-center">
			<router-view />
		</div>
		<Footer></Footer>
	</div>
</template>
<script setup lang="ts" name="Layout">
import { ref } from "vue";
import Header from "@/components/header/index.vue";
import Footer from "@/components/footer/index.vue";
</script>
<style lang="scss" scope>
.layout {
	width: 100vw;
	height: 100vh;
	.layout-center {
		margin: 20px;
	}
}
</style>
