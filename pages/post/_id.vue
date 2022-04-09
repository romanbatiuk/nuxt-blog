<template>
	<article class="post">
		<header class="post-header">
			<div class="post-header__title">
				<h1>{{ post.title }}</h1>
				<nuxt-link to="/"><i class="el-icon-back"></i></nuxt-link>
			</div>
			<div class="post-header__info">
				<small><i class="el-icon-time"></i> {{ post.date | date }}</small>
				<small><i class="el-icon-view el-i"></i> {{ post.views }}</small>
			</div>
			<div class="post-header__img"><img :src="image" :alt="post.title" /></div>
		</header>
		<main class="post-content">
			<vue-markdown>{{ post.text }}</vue-markdown>
		</main>
		<footer>
			<!-- app-comment-form -->
			<app-comment-form v-if="commentForm" :post-id="post._id" @created="createCommentHandler" />
			<!-- app-comment-form -->

			<div v-if="post.comments.length" class="comments">
				<app-comment v-for="comment in post.comments" :key="comment._id" :comment="comment" />
			</div>
			<div v-else class="text-center"><b>Комментариев нет</b></div>
		</footer>
	</article>
</template>

<script>
import AppComment from '@/components/main/Comment';
import AppCommentForm from '@/components/main/CommentForm';
export default {
	components: { AppComment, AppCommentForm },

	validate(contex) {
		return Boolean(contex.params.id);
	},

	async asyncData({ store, params }) {
		const post = await store.dispatch('post/fetchPostById', params.id);
		await store.dispatch('post/addView', post);
		return { post };
	},

	data() {
		return {
			commentForm: true,
		};
	},
	head() {
		return { title: `${this.post.title} | ${process.env.AppName}` };
	},
	computed: {
		image() {
			return `/images${this.post.imageUrl}`;
		},
	},
	methods: {
		createCommentHandler({ comment }) {
			this.post.comments.unshift(comment);
			this.commentForm = false;
		},
	},
};
</script>

<style lang="scss" scoped>
.post {
	max-width: 600px;
	margin: 0 auto;

	&-header {
		margin-bottom: 1.5rem;
		&__title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 1rem;
		}
		&__info {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 0.5rem;
		}
		&__img {
			img {
				width: 100%;
				height: auto;
			}
		}
	}
	&-content {
		margin-bottom: 2rem;
	}
	&-footer {
		margin-bottom: 2rem;
	}
}
</style>
