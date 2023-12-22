export default {
  serviceWifi: null,
	serviceCard: null,
	serviceUtilities: null,
	
	logout: () =>{
		// return removeValue('token')
		// .then(() => navigateTo('Login'));
		const token = appsmith.store.token;
		check_token_exist.run({token});
		const deteleState = delete_token_in_db.run({token});
		window.localStorage.clear();
		return deteleState

			.then(() => showAlert("you have been logged out,",'succes'))
			.then(() => navigateTo('Login'))
			.catch(e => showAlert(e.message, 'error'));
	},

	checkToken: () =>{
		const token =appsmith.store.token;
		console.log(token);
	},

	getParams: () =>{
		this.serviceWifi = appsmith.URL.queryParams.wifi;
		this.serviceCard = appsmith.URL.queryParams.card;
		this.serviceUtilities = appsmith.URL.queryParams.utilities;
		showAlert('wifi '+this.serviceWifi+', card '+this.serviceCard+', utilities '+this.serviceUtilities);
	},
}

