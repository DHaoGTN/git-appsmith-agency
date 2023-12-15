export default {
	intervalId: null,
	startCountingAndLogging() {
		if (!this.intervalId) {
			const process = async () => {
				// console.log(appsmith.store.token);
				var token = appsmith.store.token;
				// const tokendb = await checkTokenExist.run({token});
				// console.log('tokendb', tokendb);
				// return tokendb.data;
				if (!token || token == "") {
					navigateTo('Login');
				}
			};

			this.intervalId = setInterval(process, 5000);
		}
	},

	stopCountingAndLogging() {
		if (this.intervalId) {
			clearInterval(this.intervalId);
			this.intervalId = null;
		}
	},
};
