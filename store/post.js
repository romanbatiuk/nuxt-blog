const posts = [
	{ _id: 'id_1', title: 'Post', date: new Date(), views: 22, comments: [1, 2] },
	{ _id: 'id_2', title: 'Post 2', date: new Date(), views: 22, comments: [1, 2] },
	{ _id: 'id_3', title: 'Post 3', date: new Date(), views: 22, comments: [1, 2] },
	{ _id: 'id_4', title: 'Post 4', date: new Date(), views: 22, comments: [1, 2] },
];

export const actions = {
	async fetchAdminPosts() {
		return await new Promise((resolve) => {
			setTimeout(() => {
				resolve(posts);
			}, 500);
		});
	},

	// eslint-disable-next-line require-await
	async update({ commit }, { id, text }) {
		console.log(id, text);
	},

	async remove(id) {},

	async fetchAdminPostById({ commit }, id) {
		return await new Promise((resolve) => {
			setTimeout(() => {
				resolve(posts.find((p) => p._id === id));
			}, 500);
		});
	},
};
