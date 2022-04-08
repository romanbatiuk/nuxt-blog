export const actions = {
	async fetchAdminPosts({ commit }) {
		try {
			return await this.$axios.$get(`${this.$config.domain}/api/post/admin`);
		} catch (e) {
			commit('setError', e, { root: true });
			throw e;
		}
	},

	async fetchAdminPostById({ commit }, id) {
		try {
			return await this.$axios.$get(`${this.$config.domain}api/post/admin/${id}`);
		} catch (e) {
			commit('setError', e, { root: true });
			throw e;
		}
	},

	async create({ commit, dispatch }, { title, text, image }) {
		try {
			const formData = new FormData();

			formData.append('title', title);
			formData.append('text', text);
			formData.append('image', image, image.name);

			return await this.$axios.$post('/api/post/admin/', formData);
		} catch (e) {
			commit('setError', e, { root: true });
			throw e;
		}
	},

	async update({ commit }, { id, text }) {
		try {
			return await this.$axios.$put(`/api/post/admin/${id}`, { text });
		} catch (e) {
			commit('setError', e, { root: true });
			throw e;
		}
	},

	async remove({ commit }, id) {
		try {
			return await this.$axios.$delete(`/api/post/admin/${id}`);
		} catch (e) {
			commit('setError', e, { root: true });
			throw e;
		}
	},

	async fetchPosts({ commit }) {
		try {
			return await this.$axios.$get(`${this.$config.domain}/api/post`);
		} catch (e) {
			commit('setError', e, { root: true });
			throw e;
		}
	},

	async fetchPostById({ commit }, id) {
		try {
			return await this.$axios.$get(`${this.$config.domain}/api/post/${id}`);
		} catch (e) {
			commit('setError', e, { root: true });
			throw e;
		}
	},

	async addView({ commit }, { _id, views }) {
		try {
			return await this.$axios.$put(`${this.$config.domain}/api/post/add/view/${_id}`, { views });
		} catch (e) {
			commit('setError', e, { root: true });
			throw e;
		}
	},
};
