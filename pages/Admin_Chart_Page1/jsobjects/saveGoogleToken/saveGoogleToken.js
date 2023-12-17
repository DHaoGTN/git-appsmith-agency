export default {
	intervalId: null,

	startLoopToSaveToken: function() {
		if (!this.intervalId) {
			this.intervalId = setInterval(async () => {
				const token = appsmith.store.token;
				if (token === undefined) {
					await auth_get_token.run();
					const user = await get_user_by_token.run();
					storeValue('user', user);
					console.log('store token roi');
				} else {
					console.log('stop token roi');
					this.stopCountingAndLogging();
				}
			}, 2000);
		}
	},

	stopCountingAndLogging: function() {
		if (this.intervalId) {
			clearInterval(this.intervalId);
			this.intervalId = null;
		}
	},
};
