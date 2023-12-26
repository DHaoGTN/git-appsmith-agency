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
		this.isWifiAllowed ? service_wifi_cb.setVisibility(true) : service_wifi_cb.setVisibility(false);
		this.isCardAllowed ? service_card_cb.setVisibility(true) : service_card_cb.setVisibility(false);
		this.isUtilitiesAllowed ? service_utilities_cb.setVisibility(true) : service_utilities_cb.setVisibility(false);
	},

	saveApplicationToDB: () =>{
		// Save applicants

		// Save wifi_applications

		// Save card_applications

		// Save utility_applications

		// Save applications
	},
  saveApplicant: () =>{
		let fistname = firstname_input.text;
		let lastname = lastname_input.text;
		let fistnameKtkn = firstname_ktkn_input.text;
		let lastnameKtkn = lastname_ktkn_input.text;
		let birthday = dateofbirth_input.selectedDate;
		let nationality = nationality_input.text;
		let visa = visa_input.text;
		let desired_lang = japanese_cb.isChecked ? '日本語' :
		                     vietnamese_cb.isChecked ? 'Tiếng Việt' :
		                       chinese_cb.isChecked ? '簡体字' :
		                         english_cb.isChecked ? 'English' :
		                           korean_cb.isChecked ? '한국어' :
		                             taiwan_cb.isChecked ? '繁体字' : 'none';
		let phone = phone_input.text;
		let email = email_input.text;
	}

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

