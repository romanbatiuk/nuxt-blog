<template>
	<el-card shadow="always" :style="{ width: '500px' }">
		<h3 class="text-center">Войти в панель администратора</h3>
		<el-form ref="form" :model="controls" :rules="rules" @submit.native.prevent="onSubmit">
			<el-form-item label="Логин" prop="login">
				<el-input v-model.trim="controls.login"></el-input>
			</el-form-item>
			<div class="mb2">
				<el-form-item label="Пароль" prop="password">
					<el-input v-model="controls.password" type="password"></el-input>
				</el-form-item>
			</div>
			<el-form-item>
				<el-button type="primary" native-type="submit" round :loading="loading">Войти</el-button>
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
				login: [{ required: true, message: 'Введите логин', trigger: 'blur' }],
				password: [
					{ required: true, message: 'Введите пароль', trigger: 'blur' },
					{ min: 6, message: 'Минимальная длина пароля 6 символов', trigger: 'blur' },
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
				this.$message.info('Вам нужно войти в систему');
				break;
			case 'session':
				this.$message.warning('Время сессии истекло, зайдите заново');
				break;
			case 'logout':
				this.$message.info('Вы вышли из системы');
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
