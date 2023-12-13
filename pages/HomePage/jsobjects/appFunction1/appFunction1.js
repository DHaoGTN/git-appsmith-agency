export default {
	run :async(query, params)=>{
		try {
			const {email} = jsonwebtoken.verify(appsmith.store.token, 'secret');
			return query.run({...params, email}) ;
		}
		catch (error){
			return showAlert("Session expired. Please re-login", 'warning')
				.then(() => navigateTo('login'))
		}
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
		return removeValue('token')
			.then(() => navigateTo('Login'));
	}
}