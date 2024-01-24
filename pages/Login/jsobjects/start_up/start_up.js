export default {
	async checkIfLoggedIn () {

		try{
			const token = await appsmith.store.token;
			const tokenInDb = await check_token_exist.run({token});
			const tokenCountInDb= tokenInDb[0]['count'];
			// if (token!== undefined && tokenCountInDb === 1 && appsmith.mode !== 'EDIT'){
			if (token!== undefined && tokenCountInDb === 1 ){
				console.log('token count', tokenCountInDb)
				navigateTo('Affiliate Form');
			}
		}catch(error){
			console.log('do no thing');
			// showAlert('Something wrong, please login again! \n'+error.message,'error')
		}
	},

	//for test token only
	async createToken () {
		const email= 'test@gmail.com';
		const token = jsonwebtoken.sign({ email }, 'sign', { expiresIn: '1s' }); 
		return token;
	},
};
