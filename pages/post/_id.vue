<template>
	<article class="post">
		<header class="post-header">
			<div class="post-header__title">
				<h1>Post title</h1>
				<nuxt-link to="/"><i class="el-icon-back"></i></nuxt-link>
			</div>
			<div class="post-header__info">
				<small><i class="el-icon-time"></i>{{ new Date().toLocaleString() }}</small>
				<small><i class="el-icon-view el-i"></i> 43</small>
			</div>
			<div class="post-header__img">
				<img src="https://cf.bstatic.com/images/hotel/840x460/330/330517833.jpg" alt="Post title" />
			</div>
		</header>
		<main class="post-content">
			Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam in delectus rerum alias rem
			beatae odio ratione consectetur debitis quam tenetur aspernatur, sequi voluptates! Sapiente
			sequi voluptatum quas impedit dolore?
		</main>
		<footer>
			<!-- app-comment-form -->
			<app-comment-form v-if="commentForm" @created="createCommentHandler" />
			<!-- app-comment-form -->

			<div v-if="true" class="comments">
				<app-comment v-for="(comment, index) in 4" :key="index" :comment="comment" />
			</div>
			<div v-else class="text-center"><b>Comment are no</b></div>
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
	data() {
		return {
			commentForm: true,
		};
	},
	methods: {
		createCommentHandler() {
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
