export default {
		serviceAllowed: 'wifi, utilities',
	  isWifiAllowed: null,
	  isCardAllowed: null,
	  isUtilitiesAllowed: null,
	  
	setAgencyServicesAllowed: () =>{
		this.isWifiAllowed = this.serviceAllowed.includes('wifi');
		this.isCardAllowed = this.serviceAllowed.includes('card');
		this.isUtilitiesAllowed = this.serviceAllowed.includes('utilities');
		this.isWifiAllowed ? service_wifi_cb.setVisibility(true) : service_wifi_cb.setVisibility(false);
		this.isCardAllowed ? service_card_cb.setVisibility(true) : service_card_cb.setVisibility(false);
		this.isUtilitiesAllowed ? service_utilities_cb.setVisibility(true) : service_utilities_cb.setVisibility(false);
	},

	async saveApplicationToDB () {
		// Save applicants
		let applicantId = this.saveApplicant();
		showAlert(applicantId);
		// Save applications
		let applicationsId = this.saveApplications(applicantId);
		// Save wifi_applications

		// Save card_applications

		// Save utility_applications

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
	},
	
	async saveApplications(applicantId) {
		const agencyId = await appsmith.store.agency_id;
		let serviceCodeTypes = [];
		if (service_wifi_cb.isChecked)
			serviceCodeTypes.push('wifi');
		if (service_card_cb.isChecked)
			serviceCodeTypes.push('card');
		if (service_utilities_cb.isChecked)
			serviceCodeTypes.push('utilities');
		return insert_application.run({agencyId, applicantId, serviceCodeTypes});
	},
	
	async saveWifiApplications(applicationId) {
		const agencyId = await appsmith.store.agency_id;
		let serviceCodeTypes = [];
		if (service_wifi_cb.isChecked)
			serviceCodeTypes.push('wifi');
		if (service_card_cb.isChecked)
			serviceCodeTypes.push('card');
		if (service_utilities_cb.isChecked)
			serviceCodeTypes.push('utilities');
		return insert_application.run({agencyId, applicantId, serviceCodeTypes});
	},
}