export default {

	logout:  () =>{
		// return removeValue('token')
		// .then(() => navigateTo('Login'));
		const token = appsmith.store.token;
		check_token_exist.run({token});
		const deteleState = deleteToken.run({token});
		window.localStorage.clear()
		return deteleState			
			.then(() => showAlert("token has been delete,",'succes'))
			.then(() => navigateTo('Login'))
			.catch(e => showAlert(e.message, 'error'));

	}
}

