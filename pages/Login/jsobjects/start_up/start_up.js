export default {
	async loggedInByPassword () {

		try{
			const token = await appsmith.store.token;
			const tokenInDb = await check_token_exist.run({token});
			const tokenCountInDb= tokenInDb[0]['count'];
			if (token!== undefined && tokenCountInDb === 1 && appsmith.mode !== 'EDIT'){
				console.log('token count', tokenCountInDb)
				navigateTo('Agency_Form_All');
			}
		}catch(error){
			console.log('do not thing');
		}
	},

	//for test token only
	async createToken () {
		const email= 'test@gmail.com';
		const token = jsonwebtoken.sign({ email }, 'sign', { expiresIn: '1s' }); 
		return token;
	},
};
