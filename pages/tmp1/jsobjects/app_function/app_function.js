export default {

	logout: () =>{
		console.log(appsmith.store.token);
		if (appsmith.store.token !== undefined){
			const tokenInfo = appsmith.store.token;
			const token = tokenInfo['id_token'];
			const deteleState = delete_token_in_db.run({token});
			window.localStorage.clear();
			return deteleState			
				.then(() => showAlert("you have been logged out,",'success'))
				.then(() => navigateTo('Login'))
				.catch(e => showAlert(e.message, 'error'));
		}
		else {
			navigateTo('Login')
		}
	}

}

