export default {
	intervalId: null,

	async loopToCheckTokenExist() { 
		if (!this.intervalId) {
			const process = async () => {
				const token = appsmith.store.token;

				const tokenInDb = await check_token_existt.run({token});
				const tokenCountInDb= tokenInDb[0]['count'];
				console.log('tokenCountInDb', tokenCountInDb);
				if ( tokenCountInDb === 0){
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

