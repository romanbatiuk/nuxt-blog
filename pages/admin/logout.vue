<template>
	<h1>Cleaning up the data</h1>
</template>

<script>
export default {
	layout: 'admin',
	middleware: ['admin-auth'],

	beforeCreate() {
		this.$store.dispatch('auth/logout');
		this.$router.push('/admin/login?message=logout');
	},
};
</script>
