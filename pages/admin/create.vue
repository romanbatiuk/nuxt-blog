<template>
	<div class="page-wrap">
		<el-form ref="form" :model="controls" :rules="rules" @submit.native.prevent="onSubmit">
			<h2>Создать новый пост</h2>
			<el-form-item label="Название поста" prop="title">
				<el-input v-model="controls.title" type="text"></el-input>
			</el-form-item>

			<el-form-item label="Текст в формате .md или .html" prop="text">
				<el-input v-model="controls.text" type="textarea" :rows="10" resize="none"></el-input>
			</el-form-item>

			<el-upload
				ref="upload"
				class="mb"
				drag
				action="https://jsonplaceholder.typicode.com/posts/"
				:auto-upload="false"
				:on-change="handleImageChange"
			>
				<i class="el-icon-upload"></i>
				<div class="el-upload__text">Перетащите картинку <em>или нажмите</em></div>
				<div slot="tip" class="el-upload__tip">файлы с расширением jpg/png</div>
			</el-upload>

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
			image: null,
		};
	},
	methods: {
		handleImageChange(file, filelist) {
			this.image = file.raw;
		},

		onSubmit() {
			this.$refs.form.validate(async (valid) => {
				if (valid && this.image) {
					this.loading = true;
					const formData = {
						title: this.controls.title,
						text: this.controls.text,
						image: this.image,
					};
					try {
						await this.$store.dispatch('post/create', formData);
						this.controls.title = '';
						this.controls.text = '';
						this.image = null;
						this.$refs.upload.clearFiles();
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
