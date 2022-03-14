<template>
	<el-card class="comment">
		<div class="comment-header">
			<span>Person name</span>
			<span>{{ new Date().toLocaleString() }}</span>
		</div>
		<div class="comment-text">
			Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, laborum.
		</div>
	</el-card>
</template>

<script>
export default {
	props: {
		comment: {
			type: [Object, Number],
			default: () => {},
		},
	},
};
</script>

<style lang="scss" scoped>
.comment {
	margin-bottom: 1rem;
	&-header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 0.5rem;
		font-size: 0.8rem;
	}
	&-text {
		white-space: pre-line;
	}
}
</style>
