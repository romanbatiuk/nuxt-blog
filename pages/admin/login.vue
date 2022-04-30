<template>
	<el-card shadow="always" :style="{ width: '500px' }">
		<h3 class="text-center">Login to admin panel</h3>
		<el-form ref="form" :model="controls" :rules="rules" @submit.native.prevent="onSubmit">
			<el-form-item label="Login" prop="login">
				<el-input v-model.trim="controls.login"></el-input>
			</el-form-item>
			<div class="mb2">
				<el-form-item label="Password" prop="password">
					<el-input v-model="controls.password" type="password"></el-input>
				</el-form-item>
			</div>
			<el-form-item>
				<el-button type="primary" native-type="submit" round :loading="loading">Sign In</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script>
export default {
	layout: 'empty',
	data() {
		return {
			controls: {
				login: '',
				password: '',
			},
			rules: {
				login: [{ required: true, message: 'Enter login', trigger: 'blur' }],
				password: [
					{ required: true, message: 'Enter password', trigger: 'blur' },
					{ min: 6, message: 'Minimum password length 6 characters', trigger: 'blur' },
				],
			},
			loading: false,
		};
	},
	head: { title: `Login | ${process.env.AppName}` },
	mounted() {
		const { message } = this.$route.query;

		switch (message) {
			case 'login':
				this.$message.info('You need to login');
				break;
			case 'session':
				this.$message.warning('Session timed out, please login again');
				break;
			case 'logout':
				this.$message.info('You are logged out');
				break;
		}
	},
	methods: {
		onSubmit() {
			this.$refs.form.validate(async (valid) => {
				if (valid) {
					this.loading = true;
					try {
						const formData = {
							login: this.controls.login,
							password: this.controls.password,
						};
						await this.$store.dispatch('auth/login', formData);
						this.$router.push('/admin');
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
