<template>
	<div>
		<h1>Analytics</h1>
		<BarChart title="Number of views" :labels="views.labels" :data="views.data" />
		<BarChart title="Number of comments" :labels="comments.labels" :data="comments.data" />
	</div>
</template>

<script>
import BarChart from '@/components/admin/BarChart.vue';
export default {
	components: {
		BarChart,
	},
	layout: 'admin',
	middleware: ['admin-auth'],

	async asyncData({ store }) {
		const { views, comments } = await store.dispatch('post/getAnalytics');
		return { views, comments };
	},

	head: { title: `Analytics | ${process.env.AppName}` },
};
</script>
