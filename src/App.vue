<template>
	<div id="app">
		<!-- <Header></Header> -->
		<router-view />
		<!-- <Footer></Footer> -->
	</div>
</template>

<script setup>
// import Header from "@/components/header/index.vue";
// import Footer from "@/components/footer/index.vue";
// import { ref } from "vue";
// const verify = ref(0);
// const captchaType = ref("");
// const onShow = (type) => {
// 	captchaType.value = type;
// 	verify.value.show();
// };
// const handleSuccess = (res) => {
// 	console.log(res);
// 	console.log("sucess");
// };
</script>

<style scoped lang="scss">
#app {
	width: 100vw;
	height: 100vh;
	background: $background;
}
</style>
