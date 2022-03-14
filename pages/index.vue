<template>
	<el-row type="flex" justify="center">
		<el-col :xs="24" :sm="18" :md="12" :lg="10">
			<app-post v-for="(post, index) in 3" :key="index"> </app-post>
		</el-col>
	</el-row>
</template>

<script>
import AppPost from '@/components/main/Post';
export default {
	name: 'IndexPage',
	components: { AppPost },
	head: {
		title: 'HomePage',
	},
};
</script>
