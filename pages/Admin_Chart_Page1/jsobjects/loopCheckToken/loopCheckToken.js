export default {
	intervalId: null,

	async loopToCheckTokenExist() { 
		if (!this.intervalId) {
			const process = async () => {

				const token = appsmith.store.token;

				const tokenExist=await check_token_exist.run({token});
				const tokenCount = tokenExist[0]['count'];

				if (tokenCount ===0){
					console.log('token da bi xoa');
					return navigateTo('Login');
				}


			};

			this.intervalId = setInterval(process, 8000);
		}
	},



	stopCountingAndLogging() {
		if (this.intervalId) {
			clearInterval(this.intervalId);
			this.intervalId = null;
		}
	},
};