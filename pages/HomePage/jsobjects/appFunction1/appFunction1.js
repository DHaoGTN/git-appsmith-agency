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
		return removeValue('token')
		.then(() => navigateTo('Login'));
		// const token = appsmith.store.token;
		// checkTokenExist.run({token});
		// const deteleState = deleteToken.run({token});
		// return deteleState			
			// .then(() => showAlert("token has been delete,",'succes'))
			// .then(() => navigateTo('Login'))
			// .catch(e => showAlert(e.message, 'error'));

	}
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNzAyNTMxMTk4LCJleHAiOjE3MDI1MzQ3OTh9.R3KEFCpFWWsrzV2Q60-a6ua_ihdzTMlnbWId6HFKyaw