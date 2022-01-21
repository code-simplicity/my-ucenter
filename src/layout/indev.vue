<template>
	<div class="layout">
		<Header></Header>
		<router-view />
		<Footer></Footer>
	</div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import Header from "@/components/header/index.vue";
import Footer from "@/components/footer/index.vue";
</script>
<style lang="scss" scope>
.layout {
	width: 100%;
	height: 100%;
}
</style>
