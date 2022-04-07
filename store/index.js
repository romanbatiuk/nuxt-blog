export const state = () => ({
	error: null,
});

export const mutations = {
	setError(state, error) {
		state.error = error;
	},

	clearErrro(state) {
		state.error = null;
	},
};

export const actions = {
	nuxtServerInit({ commit, dispatch }) {
		dispatch('auth/autoLogin');
		// if (req.session.user) {
		// 	commit('user', req.session.user);
		// }
	},
};

export const getters = {
	error: (state) => state.error,
};
