export default {
	intervalId: null,

	async checkValidTokenDb(){
		const isTokenValid = this.isTokenValid();
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

	isTokenValid: async() => {
		const tokenInfo = await appsmith.store.token ;
		console.log(tokenInfo['expires_in'] *1000)

		const issuedAt =  Date.now(); 
		const expiresIn =tokenInfo['expires_in'] *1000; 
		const isTokenExpired = Date.now() > (issuedAt + expiresIn);
		console.log(issuedAt, issuedAt + expiresIn)

		return !isTokenExpired;
	},
	// right way  
	isTokenValidd: async () => {
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

	//main loop
	async loopToCheckTokenExist() { 
		if (!this.intervalId) {
			const process = async () => {
				const tokenInfo = appsmith.store.token;
				const token = tokenInfo['id_token'];



				this.checkValidTokenDb();

				const tokenInDb = await check_token_existt.run({token});
				console.log('token in db', tokenInDb)
				const tokenCountInDb= tokenInDb[0]['count'];
				console.log('tokenCountInDb', tokenCountInDb);
				// if ( tokenCountInDb === 0 && token !== undefined ){
				if ( tokenCountInDb === 0 &&  appsmith.mode !== 'EDIT'){
					navigateTo('Login');
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

