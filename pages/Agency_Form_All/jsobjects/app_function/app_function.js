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
			await window.localStorage.clear()
		}catch(error){
			return navigateTo("Login")
		}
		return  showAlert("you have been logged out,",'success')
			.then(() => navigateTo('Login'))
			.catch(e => showAlert(e.message, 'error'));
	},

	checkToken: () =>{
		const token =appsmith.store.token;
		console.log(token);
	},

	// ----------- Change email and password function ---------------//
	changeEmail: async()=>{
		const current_email = appsmith.store.email;
		const new_email = change_email_input2.text;
		// const new_email = 'test@gmail.com'
		const check_email=await check_email_exist.run({new_email})
		const count_new_email= check_email[0]['count']
		console.log('count new email', count_new_email)
		if (current_email === new_email){
			return showAlert('Your new email is same with current email', 'error')
		}
		else if (count_new_email>0){
			return showAlert('Your new email have existed, please choose another email or login', 'error')
		}
		else {
			await change_email.run({new_email, current_email})
			await this.logout()
			return showAlert('changed email successfully,  please login again', 'success')
		}		

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
		let applicant_id = this.saveApplicant();
		showAlert(applicant_id);
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
		let desiredLang = japanese_cb.isChecked ? '日本語' :
		vietnamese_cb.isChecked ? 'Tiếng Việt' :
		chinese_cb.isChecked ? '簡体字' :
		english_cb.isChecked ? 'English' :
		korean_cb.isChecked ? '한국어' :
		taiwan_cb.isChecked ? '繁体字' : 'none';
		let phone = phone_input.text;
		let email = email_input.text;
		let address = address1_input.text+" - "+address2_input.text+" - "+address3_input.text+" - "+address4_input.text+" - "+address5_input.text;

		return insert_applicant.run({fistname, lastname, fistnameKtkn, lastnameKtkn, birthday, nationality, visa, desiredLang, phone, email, address});
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

