export default {

	logout: () =>{
		// return removeValue('token')
		// .then(() => navigateTo('Login'));
		const token = appsmith.store.token;
		const deteleState = delete_token_in_db.run({token});
		window.localStorage.clear();
		return deteleState			
			.then(() => showAlert("you have been logged out,",'success'))
			.then(() => navigateTo('Login'))
			.catch(e => showAlert(e.message, 'error'));
	},
}

