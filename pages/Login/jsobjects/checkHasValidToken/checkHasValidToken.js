export default {
	async loggedInByPassword () {
		const token = await appsmith.store.token;
		const tokenInDb = await check_token_exist.run({token});
		const tokenCountInDb= tokenInDb[0]['count'];

		if (token!== undefined && tokenCountInDb === 1){
			navigateTo('Agency_Form_All');
		}

		else if (token === undefined && tokenCountInDb ===0){
			console.log('do notthing');
		}
	},

	async createToken () {
		const email= 'test@gmail.com';
		const token = jsonwebtoken.sign({ email }, 'sign', { expiresIn: '1s' }); 
		return token;
	},
};
