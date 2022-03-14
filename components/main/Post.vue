<template>
	<el-card shadow="hover" :body-style="{ padding: 0 }" class="post">
		<header slot="header" class="post-header">
			<h3>Post title</h3>
			<small><i class="el-icon-time"></i>{{ new Date().toLocaleString() }}</small>
		</header>
		<div class="post-body">
			<img
				src="https://cf.bstatic.com/images/hotel/840x460/330/330517833.jpg"
				class="post-image"
				alt="post-image"
			/>
		</div>
		<footer class="post-footer">
			<el-button type="primary" round @click="openPost">Open</el-button>
			<span><i class="el-icon-message"></i> 12</span>
		</footer>
	</el-card>
</template>

<script>
export default {
	methods: {
		openPost() {
			console.log('openPost');
		},
	},
};
</script>

<style lang="scss" scoped>
.post {
	border: 1px solid #ebeef5;
	margin-bottom: 1.5rem;
	&-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	&-image {
		width: 100%;
		height: auto;
	}
	&-footer {
		padding: 1rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
}
</style>
