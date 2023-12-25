export default {

	async startUp () {
		const tokenExist = appsmith.store.token;

		// after login, save token to db if local storage doesnt have token yet. 
		// if local doenst have but can't call api to get token, redirect to login page
		if (tokenExist === undefined){
			try {
				const response = await auth_get_token.run();
				storeValue('token', response);  
				this.getUser();

				const token = response['id_token'];
				await add_google_token_to_db.run({ token })
					.then(() => console.log('Token successfully added to database'))
					.catch((err) => {
					console.error('Error adding token to database:', err);
				});
			} catch (error) {
				console.error('Token is deleted, please login again:', error);
				navigateTo('Login');
			}
		}
	},

	getUser :async ()=>{
		const userInfo = appsmith.store.user;
		if (userInfo === undefined){
			const token = appsmith.store.token.id_token;
			const decodedToken = await jsonwebtoken.decode(token);
			storeValue('user', decodedToken);
			console.log('decode ', decodedToken)
		}
	}



}