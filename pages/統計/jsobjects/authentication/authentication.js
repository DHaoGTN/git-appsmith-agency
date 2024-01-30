export default {
	////----------- AUTHENTICATION FUNCTION------------////
	async startUp () {
		const token = await appsmith.store.token;
		const tokenInDb = await check_token_exist.run({token});
		const tokenCountInDb= tokenInDb[0]['count'];

		if (token!== undefined && tokenCountInDb === 1){
			console.log('do nothing');
		}

		else if (token === undefined && tokenCountInDb ===0 && appsmith.mode !== 'EDIT'){
			navigateTo('Login');
		}
	},

	async createToken () {
		const email= 'test@gmail.com';
		const token = jsonwebtoken.sign({ email }, 'gtn-id', { expiresIn: '30s' }); 
		return token;
	},

	isTokenValid : () =>{
		const token = appsmith.store.token;
		try {
			jsonwebtoken.verify(token, 'gtn-id');
			return true; 
		} catch (error) {
			return false; 
		}
	},


	logout: async () =>{
		const token = appsmith.store.token;
		// check_token_exist.run({token});
		// use try catch incase there is token in local storage to compare with token in db
		try {
			await delete_token_in_db.run({token});
			await window.localStorage.clear()
		} catch(error){
			return navigateTo("Login")
		}
		return  showAlert("you have been logged out,",'success')
			.then(() => navigateTo('Login'))
			.catch(e => showAlert(e.message, 'error'));
	},
	
	


	checkToken: () =>{
		const token =appsmith.store.token;
		console.log(token);
	},

	////-------------------main loop ---------------------////
	intervalId: null,
	async checkValidTokenInDb (){
		try{
			const isTokenValid = this.isTokenValid();
			if (isTokenValid){
				console.log('token still valid, continue')
			}
			else {
				console.log('token exprire, delete token in db')
				const token = appsmith.store.token;
				delete_token_in_db.run({token});
				showAlert('Your session have been expired, please log in again', 'error')
				console.log('deleted token in db ')
			}
		}catch(error){
			showAlert('Something wrong, please login again! \n'+error.message,'error')
		}
	},

	async loopToCheckTokenExist() { 
		if (!this.intervalId) {
			const process = async () => {
				try{
					const token = appsmith.store.token;
					console.log('token', token)

					//check if current token is still valid or not
					this.checkValidTokenInDb();

					// if token is not valid, count in db is 0, else do nothing
					const tokenInDb = await check_token_exist.run({token});
					console.log('token in db', tokenInDb)
					const tokenCountInDb= tokenInDb[0]['count'];
					console.log('tokenCountInDb', tokenCountInDb);
					// if ( tokenCountInDb === 0 && appsmith.mode !== 'EDIT' ){
					if ( tokenCountInDb === 0  ){
						this.logout()
						console.log('navigate to login')
					}
					console.log('token still valid')
				}catch(error){
					showAlert('Something wrong, please login again! \n'+error.message,'error')
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
