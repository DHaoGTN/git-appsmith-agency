export default {
	async loggedInByPassword () {
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
	}




};
