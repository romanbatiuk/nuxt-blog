<template>
	<div class="page-wrap">
		<el-breadcrumb separator-class="el-icon-arrow-right" class="mb">
			<el-breadcrumb-item to="/admin/list">Посты</el-breadcrumb-item>
			<el-breadcrumb-item>{{ post.title }}</el-breadcrumb-item>
		</el-breadcrumb>
	</div>
</template>

<script>
export default {
	layout: 'admin',
	middleware: ['admin-auth'],
	validate({ params }) {
		return Boolean(params.id);
	},
	async asyncData({ store, params }) {
		const post = await store.dispatch('post/fetchAdminById', params.id);
		return { post };
	},
};
</script>

<style lang="scss">
.page-wrap {
	width: 600px;
}
</style>
