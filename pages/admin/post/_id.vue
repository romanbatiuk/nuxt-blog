<template>
	<div class="page-wrap">
		<el-breadcrumb separator-class="el-icon-arrow-right" class="mb">
			<el-breadcrumb-item to="/admin/list">Посты</el-breadcrumb-item>
			<el-breadcrumb-item>{{ post.title }}</el-breadcrumb-item>
		</el-breadcrumb>

		<el-form ref="form" :model="controls" :rules="rules" @submit.native.prevent="onSubmit">
			<el-form-item label="Текст в формате .md или .html" prop="text">
				<el-input v-model.trim="controls.text" type="textarea" :rows="10" resize="none"></el-input>
			</el-form-item>

			<div class="mb post-info">
				<small><i class="el-icon-time"></i> {{ post.date | date }}</small>

				<small>
					<i class="el-icon-view"></i>
					<span style="margin-left: 10px">{{ post.views }}</span>
				</small>
			</div>

			<el-form-item>
				<el-button type="primary" native-type="submit" round :loading="loading">Обновить</el-button>
			</el-form-item>
		</el-form>
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
		const post = await store.dispatch('post/fetchAdminPostById', params.id);
		return { post };
	},
	data() {
		return {
			controls: {
				text: '',
			},
			rules: {
				text: [{ required: true, message: 'Текст не должен быть пустым', trigger: 'blur' }],
			},
			loading: false,
		};
	},
	head() {
		return { title: `${this.post.title} |  ${process.env.AppName}` };
	},
	mounted() {
		this.controls.text = this.post.text;
	},
	methods: {
		onSubmit() {
			this.$refs.form.validate(async (valid) => {
				if (valid) {
					this.loading = true;
					try {
						const formData = {
							text: this.controls.text,
							id: this.post._id,
						};
						await this.$store.dispatch('post/update', formData);
						this.$message.success('Пост обновлен');
						this.loading = false;
					} catch (e) {
						console.log(e);
						this.loading = false;
					}
				}
			});
		},
	},
};
</script>

<style lang="scss">
.page-wrap {
	width: 600px;
}
</style>
