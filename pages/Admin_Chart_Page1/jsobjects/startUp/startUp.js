export default {

	async startUp () {
		const tokenExist = appsmith.store.token;

		if (tokenExist === undefined){
			//store token to local
			const response =await auth_get_token.run() ;
			const google_token = response['access_token'];
			await storeValue('token', google_token);

			//store token to db
			const token = appsmith.store.token
			await add_google_token_to_db.run({token});

			//store user to local
			const user =await get_user_by_token.run();
			storeValue('user', user);
		}
	}
}