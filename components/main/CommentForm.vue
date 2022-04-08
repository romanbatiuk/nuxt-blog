<template>
	<el-form ref="form" :model="controls" :rules="rules" @submit.native.prevent="onSubmit">
		<h1>Добавить комментарий</h1>
		<el-form-item label="Your Name" prop="name">
			<el-input v-model="controls.name" />
		</el-form-item>

		<el-form-item label="Your Comment" prop="text">
			<el-input v-model="controls.text" type="textarea" resize="none" :rows="2"></el-input>
		</el-form-item>

		<el-form-item>
			<el-button type="primary" :loading="loading" native-type="submit" round>Добавить</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
export default {
	props: {
		postId: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			controls: {
				name: '',
				text: '',
			},
			loading: false,
			rules: {
				name: [{ required: true, message: 'Name field is required', trigger: 'blur' }],
				text: [{ required: true, message: 'Please enter your comment', trigger: 'blur' }],
			},
		};
	},
	methods: {
		onSubmit() {
			this.$refs.form.validate(async (valid) => {
				if (valid) {
					this.loading = true;
					const formData = {
						name: this.controls.name,
						text: this.controls.text,
						postId: this.postId,
					};
					try {
						const newCommnet = await this.$store.dispatch('comment/createComment', formData);
						this.$message.success(newCommnet.message);
						this.$emit('created', newCommnet);
					} catch (err) {
						this.loading = false;
						console.log(err);
					}
				}
			});
		},
	},
};
</script>

<style lang="scss" scoped></style>
