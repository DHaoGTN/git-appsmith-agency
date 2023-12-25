export default {
	intervalId: null,

	checkTokenValid: async () => {
		const tokenInfo = appsmith.store.token;
		const token = tokenInfo.id_token;

		try {
			const decodedToken = await jsonwebtoken.decode(token);
			if (!decodedToken) {
				console.log('something wrong with this token')
				return false;
			}

			const expirationTime = decodedToken.exp;
			const currentTime = Math.floor(Date.now() / 1000);

			if (currentTime > expirationTime) {
				console.log('Token expired');
				return false;
			} else {
				console.log('Token valid');
				return true;
			}
		} catch (error) {
			console.error('error with this token', error);
			return false;
		}
	},

	async checkValidTokenDb(){
		const isTokenValid = this.checkTokenValid();
		if (isTokenValid){
			console.log('still valid, continue')
		}
		else {
			console.log('token exprired, delete token in db')
			const token = appsmith.store.token;
			delete_token_in_db.run({token});
			console.log('deleted token in db ')
		}
	},

	//main loop
	async loopToCheckTokenExist() { 
		if (!this.intervalId) {
			const process = async () => {
				const tokenInfo = appsmith.store.token;
				const token = tokenInfo['id_token'];
				this.checkValidTokenDb();

				const tokenInDb = await check_token_exist.run({token});
				console.log('token in db', tokenInDb)
				const tokenCountInDb= tokenInDb[0]['count'];
				console.log('tokenCountInDb', tokenCountInDb);
				if ( tokenCountInDb === 0 &&  appsmith.mode !== 'EDIT'){
					navigateTo('Login');
					console.log('navigateTo login ');
					console.log('other page had log out, please log in again')
				}
			};
			this.intervalId = setInterval(process, 10000);
		}
	},

	stopCountingAndLogging() {
		if (this.intervalId) {
			clearInterval(this.intervalId);
			this.intervalId = null;
		}
	},
};

