export default {

	logout: () =>{
		// return removeValue('token')
		// .then(() => navigateTo('Login'));
		const tokenInfo = appsmith.store.token;
		const token = tokenInfo['id_token'];
		console.log('token logout', token)
		const deteleState = delete_token_in_db.run({token});
		window.localStorage.clear();
		return deteleState			
			.then(() => showAlert("you have been logged out,",'success'))
			.then(() => navigateTo('Login'))
			.catch(e => showAlert(e.message, 'error'));
	},
}

