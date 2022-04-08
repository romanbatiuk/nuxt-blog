<template>
	<el-card shadow="hover" :body-style="{ padding: 0 }" class="post">
		<header slot="header" class="post-header">
			<h3>{{ post.title }}</h3>
			<small><i class="el-icon-time"></i>{{ new Date(post.date).toLocaleString() }}</small>
		</header>
		<div class="post-body">
			<img :src="image" class="post-image" :alt="post.title" />
		</div>
		<footer class="post-footer">
			<el-button type="primary" round @click="openPost">Open</el-button>
			<span><i class="el-icon-message"></i> {{ post.comments.length }}</span>
		</footer>
	</el-card>
</template>

<script>
export default {
	props: {
		post: {
			type: Object,
			required: true,
		},
	},
	computed: {
		image() {
			return `/images${this.post.imageUrl}`;
		},
	},
	methods: {
		openPost() {
			this.$router.push(`/post/${this.post._id}`);
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
