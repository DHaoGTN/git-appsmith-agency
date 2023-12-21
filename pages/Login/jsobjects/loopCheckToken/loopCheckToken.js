export default {
	intervalId: null,
	isTokenValid : () =>{
		const token = appsmith.store.token;
		try {
			jsonwebtoken.verify(token, 'gtn-id');
			return true; 
		} catch (error) {
			return false; 
		}
	},

	async loopCheckTokenInDb(){
		const isTokenValid = this.isTokenValid();
		if (isTokenValid){
			console.log('still valid, continue')
		}
		else {
			console.log('token exprire, delete token in db')
			const token = appsmith.store.token;
			delete_token_in_db.run({token});
			console.log('deleted token in db ')

		}
	},

	async loopToCheckTokenExist() { 
		if (!this.intervalId) {
			const process = async () => {
				const token = appsmith.store.token;

				this.loopCheckTokenInDb();

				const tokenInDb = await check_token_exist.run({token});
				const tokenCountInDb= tokenInDb[0]['count'];
				console.log('tokenCountInDb', tokenCountInDb);
				if ( tokenCountInDb !== 0 && appsmith.mode !== 'EDIT'){
				  navigateTo('Agency_Form_All');
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

