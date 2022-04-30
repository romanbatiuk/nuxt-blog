<template>
	<el-table :data="posts" style="width: 100%">
		<el-table-column prop="title" label="Title" />

		<el-table-column label="Date">
			<template slot-scope="{ row: { date } }">
				<i class="el-icon-time"></i>
				<span style="margin-left: 10px">{{ date | date('date') }}</span>
			</template>
		</el-table-column>

		<el-table-column prop="views" label="Views">
			<template slot-scope="{ row: { views } }">
				<i class="el-icon-view"></i>
				<span style="margin-left: 10px">{{ views }}</span>
			</template>
		</el-table-column>

		<el-table-column prop="comments" label="Comments">
			<template slot-scope="{ row: { comments } }">
				<i class="el-icon-s-comment"></i>
				<span style="margin-left: 10px">{{ comments.length }}</span>
			</template>
		</el-table-column>

		<el-table-column label="Actions">
			<template slot-scope="{ row }">
				<el-tooltip effect="dark" content="Open article" placement="top">
					<el-button type="primary" icon="el-icon-edit" circle @click="open(row._id)" />
				</el-tooltip>
				<el-tooltip effect="dark" content="Delete article" placement="top">
					<el-button type="danger" icon="el-icon-delete" circle @click="remove(row._id)" />
				</el-tooltip>
			</template>
		</el-table-column>
	</el-table>
</template>

<script>
export default {
	layout: 'admin',
	middleware: ['admin-auth'],
	async asyncData({ store }) {
		const posts = await store.dispatch('post/fetchAdminPosts');
		return { posts };
	},
	head: { title: `All articles | ${process.env.AppName}` },
	methods: {
		open(id) {
			this.$router.push(`/admin/post/${id}`);
		},

		async remove(id) {
			try {
				await this.$confirm('Delete article?', 'Attention!', {
					confirmButtonText: 'Yes',
					cancelButtonText: 'Cancel',
					type: 'warning',
				});

				await this.$store.dispatch('post/remove', id);

				this.posts = this.posts.filter((p) => p._id !== id);

				this.$message.success('Post successfully deleted');
			} catch (e) {
				console.log(e);
			}
		},
	},
};
</script>
