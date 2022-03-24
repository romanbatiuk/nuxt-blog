<template>
	<div class="page-wrap">
		<el-form ref="form" :model="controls" :rules="rules" @submit.native.prevent="onSubmit">
			<h2>Создать новый пост</h2>
			<el-form-item label="Название поста" prop="title">
				<el-input v-model.trim="controls.title" type="text"></el-input>
			</el-form-item>

			<el-form-item label="Текст в формате .md или .html" prop="text">
				<el-input v-model="controls.text" type="textarea" :rows="10" resize="none"></el-input>
			</el-form-item>

			<div class="wrap-buttons">
				<el-button type="success" plain @click="previewDialog = true">Предпросмотр</el-button>
				<el-button type="primary" native-type="submit" round :loading="loading">Создать</el-button>
			</div>
		</el-form>

		<!-- modal -->
		<el-dialog title="Предпросмотр" :visible.sync="previewDialog">
			<div :key="controls.text">
				<vue-markdown>{{ controls.text }}</vue-markdown>
			</div>
		</el-dialog>
		<!-- modal -->
	</div>
</template>

<script>
export default {
	layout: 'admin',
	middleware: ['admin-auth'],
	data() {
		return {
			controls: {
				text: '',
				title: '',
			},
			rules: {
				text: [{ required: true, message: 'Текст не должен быть пустым', trigger: 'blur' }],
				title: [{ required: true, message: 'Название поста может быть пустым', trigger: 'blur' }],
			},
			loading: false,
			previewDialog: false,
		};
	},
	methods: {
		onSubmit() {
			this.$refs.form.validate(async (valid) => {
				if (valid) {
					this.loading = true;
					const formData = {
						title: this.controls.title,
						text: this.controls.text,
					};
					try {
						await this.$store.dispatch('post/create', formData);
						this.controls.title = '';
						this.controls.text = '';
						this.$message.success('Пост был успешно создан!');
					} catch (err) {
						console.log(err);
					} finally {
						this.loading = false;
					}
				} else {
					this.$message.warning('Форма не валидна');
				}
			});
		},
	},
};
</script>

<style lang="scss">
.page-wrap {
	width: 600px;
	.wrap-buttons {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
}
</style>
