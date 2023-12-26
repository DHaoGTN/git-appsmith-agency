export default {
	serviceAllowed: 'wifi, utilities',
	isWifiAllowed: null,
	isCardAllowed: null,
	isUtilitiesAllowed: null,
	logout: async () =>{
		const token = appsmith.store.token;
		// check_token_exist.run({token});
		// use try catch incase there is token in local storage to compare with token in db
		try{
			await delete_token_in_db.run({token});
		}catch(error){
			return navigateTo("Login")
		}
		return await window.localStorage.clear()
			.then(() => showAlert("you have been logged out,",'succes'))
			.then(() => navigateTo('Login'))
			.catch(e => showAlert(e.message, 'error'));
	},

	checkToken: () =>{
		const token =appsmith.store.token;
		console.log(token);
	},

	setAgencyServicesAllowed: () =>{
		this.isWifiAllowed = this.serviceAllowed.includes('wifi');
		this.isCardAllowed = this.serviceAllowed.includes('card');
		this.isUtilitiesAllowed = this.serviceAllowed.includes('utilities');
		this.isWifiAllowed ? cb_service_wifi.setVisibility(true) : cb_service_wifi.setVisibility(false);
		this.isCardAllowed ? cb_service_card.setVisibility(true) : cb_service_card.setVisibility(false);
		this.isUtilitiesAllowed ? cb_service_utilities.setVisibility(true) : cb_service_utilities.setVisibility(false);
	},

	saveApplicationToDB: () =>{
		// Save applicants

		// Save wifi_applications

		// Save card_applications

		// Save utility_applications

		// Save applications
	},


	// serviceWifi: null,
	// serviceCard: null,
	// serviceUtilities: null,
	// getParams: () =>{
	// this.serviceWifi = appsmith.URL.queryParams.wifi;
	// this.serviceCard = appsmith.URL.queryParams.card;
	// this.serviceUtilities = appsmith.URL.queryParams.utilities;
	// showAlert('wifi '+this.serviceWifi+', card '+this.serviceCard+', utilities '+this.serviceUtilities);
	// },
}

