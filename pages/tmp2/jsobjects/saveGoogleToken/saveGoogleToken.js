export default {
	intervalId: null,

	startLoopToSaveToken: function() {
		if (!this.intervalId) {
			this.intervalId = setInterval(async () => {
				const token = appsmith.store.token;
				if (token === undefined) {
					try {
						const google_response= await auth_get_token.run();
						const google_token =await google_response['access_token'];
						await add_google_token_to_db.run({google_token});
						console.log(' da add token to db');
						const user = await get_user_by_token.run();
						storeValue('user', user);
						console.log('store token roi');
					}
					catch (error){
						console.log('co error, stop loop');
						this.stopCountingAndLogging();
					}
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
