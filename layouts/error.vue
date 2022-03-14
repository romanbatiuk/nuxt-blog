<template>
	<div class="error-layout">
		<div class="error-content">
			<h1 class="error-title">Page Not Found</h1>
			<nuxt-link to="/">Go Home</nuxt-link>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.error-layout {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
}
.error-content {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 4rem;
}

.error-title {
	color: rgb(177, 14, 14);
	margin-bottom: 1rem;
}
</style>
