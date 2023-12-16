export default {
	run :async(query, params)=>{
		// try {
		console.log('local storage: ', localStorage.getItem('token'));
		// const {email} = jsonwebtoken.verify(appsmith.store.token, 'secret');
		// console.log ('token', appsmith.store.token)
		// return query.run({...params, email}) ;
		// }
		// catch (error){
		// return showAlert("Session expired. Please re-login", 'warning')
		// .then(() => navigateTo('Login'))
		// }
	},

	getUser: async()=>{
		return await this.run(get_user)
	},

	getCurrentUser: async()=>{
		return await this.run(find_user)
	},

	getYearHasContract: async()=>{
		return await this.run(yearHaveContract);
	},

	logout: () =>{
		// return removeValue('token')
		// .then(() => navigateTo('Login'));
		const token = appsmith.store.token;
		check_token_exist.run({token});
		const deteleState = deleteToken.run({token});
		return deteleState			
			.then (()=> removeValue('token'))
			.then(() => showAlert("token has been delete,",'succes'))
			.then(() => navigateTo('Login'))
			.catch(e => showAlert(e.message, 'error'));

	}
}

