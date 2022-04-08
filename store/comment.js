export const actions = {
	async createComment({ commit }, formData) {
		try {
			return await this.$axios.$post('/api/comment', formData);
		} catch (e) {
			commit('setError', e, { root: true });
			throw e;
		}
	},
};
