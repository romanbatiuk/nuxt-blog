export const state = () => ({
	token: true, // null
});

export const mutations = {
	setToken(state, token) {
		state.token = token;
	},
	clearToken() {
		state.token = null;
	},
};

export const actions = {
	async login({ commit, dispatch }, formData) {
		try {
			const token = await new Promise((resolve, reject) => {
				setTimeout(() => resolve('mock-token'), 2000);
			});
			console.log('token', token);
			dispatch('setToken', token);
		} catch (e) {
			commit('setError', e, { root: true });
			throw e;
		}
	},

	setToken({ commit }, token) {
		commit('setToken', token);
	},
};

export const getters = {
	isAuthenticated: (state) => Boolean(state.token),
};
