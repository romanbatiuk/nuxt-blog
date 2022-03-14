<template>
	<el-form ref="form" :model="controls" :rules="rules" @submit.native.prevent="onSubmit">
		<h1>Add Comment</h1>
		<el-form-item label="Your Name" prop="name">
			<el-input v-model.trim="controls.name" />
		</el-form-item>

		<el-form-item label="Your Comment" prop="text">
			<el-input v-model="controls.text" type="textarea" resize="none" :rows="2"></el-input>
		</el-form-item>

		<el-form-item>
			<el-button type="primary" :loading="loading" native-type="submit" round
				>Add Comment</el-button
			>
		</el-form-item>
	</el-form>
</template>

<script>
export default {
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
			this.$refs.form.validate((valid) => {
				if (valid) {
					this.loading = true;
					const formData = {
						name: this.controls.name,
						text: this.controls.text,
						postId: '',
					};
					console.log(formData);
					try {
						setTimeout(() => {
							this.$message.success('Comment has been added');
							this.$emit('created');
						}, 3000);
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
