export default {

	async startUp () {
		const tokenExist = appsmith.store.token;

		if (tokenExist === undefined){
			// get google authen token
			const response =await auth_get_token.run() ;
			const google_token =await response['id_token'];

			//save token to local storage
			//save user to local storage
			const user = await this.getTokenInfo(google_token);
			storeValue('token', google_token);
			storeValue('user', user);

			// save token to db
			await add_google_token_to_db.run({google_token});


		}
	},

	getTokenInfo : (token)=>{
		
		
		
		const secretKey = 'your_secret_key_here'; // Thay bằng khóa bí mật thực tế

		try {
			const decodedToken = jsonwebtoken.decode(token, secretKey);
			return decodedToken;
		} catch (error) {
			console.error('JWT decoding failed:', error.message);
		}
	}
}