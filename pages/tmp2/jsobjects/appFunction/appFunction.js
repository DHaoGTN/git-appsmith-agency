export default {

	logout: () =>{
		// return removeValue('token')
		// .then(() => navigateTo('Login'));
		const token = appsmith.store.token;
		check_token_exist.run({token});
		const deteleState = deleteToken.run({token});
		return deteleState
			.then (()=> removeValue('token'))
			.then (()=> removeValue('user'))
			.then(() => showAlert("token has been delete,",'succes'))
			// .then(() => navigateTo('Login'))
			.catch(e => showAlert(e.message, 'error'));

	},

  run: async (query, params) => {
		try {
			const decoded = jsonwebtoken.verify(appsmith.store.token, 'gtn-id');
		  showAlert('Token is valid. Decoded payload: '+ decoded, 'info');
			query.run({...params});
		} catch(error) {
			return showAlert('Session expired. Please re-login', 'warning')
				.then(() => appsmith.mode === 'EDIT' ? '' : navigateTo('Login'))
    }
	},
  init: async () => {
    return await this.run(indexContractInfo)
  },
  update: async () => {
	  return await this.run(onSaveToDb)
			.then(() => this.run(indexContractInfo)); 
	}
}

