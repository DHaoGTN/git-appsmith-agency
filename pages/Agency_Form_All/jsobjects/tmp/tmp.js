export default {
	serviceAllowed: 'wifi, utilities',
	isWifiAllowed: null,
	isCardAllowed: null,
	isUtilitiesAllowed: null,
	saveResultCode: 0,
	


	setAgencyServicesAllowed: () =>{
		this.isWifiAllowed = this.serviceAllowed.includes('wifi');
		this.isCardAllowed = this.serviceAllowed.includes('card');
		this.isUtilitiesAllowed = this.serviceAllowed.includes('utilities');
		this.isWifiAllowed ? service_wifi_cb.setVisibility(true) : service_wifi_cb.setVisibility(false);
		this.isCardAllowed ? service_card_cb.setVisibility(true) : service_card_cb.setVisibility(false);
		this.isUtilitiesAllowed ? service_utilities_cb.setVisibility(true) : service_utilities_cb.setVisibility(false);
	},

	async saveApplicationToDB () {
		let isChooseWifi = service_wifi_cb.isChecked;
		let isChooseCard = service_card_cb.isChecked;
		let isChooseUtility = service_utilities_cb.isChecked;
		// Save applicants
		let applicantId = await this.saveApplicant();
		if (applicantId) {
			// Save Address
			// showAlert(applicantId);
			await this.saveAddresses(applicantId);
			// Save applications
			let applicationId = await this.saveApplications(applicantId);
			// showAlert(applicationId);
			if (applicationId) {
				if (isChooseWifi) {
					// Save wifi_applications
					await this.saveWifiApplications(applicationId);
				}
				if (isChooseCard) {
					// Save card_applications
					await this.saveCardApplications(applicationId);
				}
				if (isChooseUtility) {
					// Save utility_applications
					await this.saveUtilityApplications(applicationId);
				}
			}
		}
		if (this.saveResultCode == 0) {
			showAlert('Save information success.', 'success');
		} else {
			showAlert('There are an error when saving information. Please try again. Result code: '+this.saveResultCode, 'error');
		}
	},
	async saveApplicant() {
		let applicantId = 0;
		let fistname = firstname_input.text;
		let lastname = lastname_input.text;
		let fistnameKtkn = firstname_ktkn_input.text;
		let lastnameKtkn = lastname_ktkn_input.text;
		let birthday = dateofbirth_dpk.selectedDate;
		let nationality = nationality_input.text;
		let visa = visa_input.text;
		let desiredLang = japanese_cb.isChecked ? '日本語' :
		  vietnamese_cb.isChecked ? 'Tiếng Việt' :
		    chinese_cb.isChecked ? '簡体字' :
		      english_cb.isChecked ? 'English' :
		        korean_cb.isChecked ? '한국어' :
		          taiwan_cb.isChecked ? '繁体字' : '日本語';
		let phone = phone_input.text;
		let email = email_input.text;

		await insert_applicant.run({fistname, lastname, fistnameKtkn, lastnameKtkn, birthday, nationality, visa, desiredLang, phone, email})
		  .then(res => applicantId = JSON.stringify(res[0].id))
			.catch(e => {this.saveResultCode = 1; showAlert(e.message, 'error');});
		return applicantId;
	},
	
	async saveAddresses(applicantId) {
	  let postalCode = address1_input.text;
		let prefecture = address2_input.text;
		let city = address3_input.text;
		let addressDetail = address4_input.text;
		let building = address5_input.text;
		let room = address5_input.text;
		await insert_address.run({applicantId, postalCode, prefecture, city, addressDetail, building, room})
		  .then()
			.catch(e => {this.saveResultCode = 2; showAlert(e.message, 'error');});
  },
	
	async saveApplications(applicantId) {
		let applicationId = 0;
		let userInfo = await appsmith.store.user;
		if (userInfo) {
			const agencyId = JSON.stringify(userInfo.agency_id);
			let serviceTypeCodes = '{';
			let numService = 0;
			if (service_wifi_cb.isChecked) {
				serviceTypeCodes += '光wifi';
				numService++;
			}
			if (service_card_cb.isChecked) {
				numService > 0 ? serviceTypeCodes += ',カードcredit_card' : serviceTypeCodes += 'カードcredit_card';
				numService++;
			}
			if (service_utilities_cb.isChecked) {
				numService > 0 ? serviceTypeCodes += ',電気ガスutility' : serviceTypeCodes += '電気ガスutility';
			}
			serviceTypeCodes += '}';
			await insert_application.run({agencyId, applicantId, serviceTypeCodes})
				.then(res => applicationId = JSON.stringify(res[0].id))
				.catch(e => {this.saveResultCode = 3; showAlert(e.message, 'error');});
		} else {
			this.saveResultCode = 31; // Can not get userInfo in storage
		}
		return applicationId;
	},
	
	async saveWifiApplications(applicationId) {
		let contactDow = contact_dow_sb.selectedOptionValue;
		// showAlert(contactDow);
		let urlFront = '';
		let urlBack = '';
		let statusWifi = '1.未対応';
		await insert_wifi_application.run({applicationId, contactDow, urlFront, urlBack, statusWifi})
		  .then()
			.catch(e => {this.saveResultCode = 4; showAlert(e.message, 'error');});
	},
	
	async saveCardApplications(applicationId) {
		let statusCard = '1.未対応';
		await insert_card_application.run({applicationId, statusCard})
		  .then()
			.catch(e => {this.saveResultCode = 5; showAlert(e.message, 'error');});
	},
	
	async saveUtilityApplications(applicationId) {
		let utilityTypeCode = utility_type_radiogrp.selectedOptionValue;
		let contractTypeCodes = '{電気一括契約electric,ガス一括契約gas}';
		let electricityStartDate = electric_start_date_dpk.selectedDate;
		// electricityStartDate = new Date(electricityStartDate);
		// electricityStartDate.toISOString().split('T')[0];
		// showAlert(electricityStartDate);
		let gasStartDate = gas_start_date_dpk.selectedDate;
		// gasStartDate = new Date(gasStartDate);
		// gasStartDate.toISOString().split('T')[0];
		let gasStartTimeCode = gas_start_time_radiogrp.selectedOptionValue;
		let withWaterSupply = water_radiogrp.selectedOptionValue == 'true' ? true : false;
		let statusUtility = '1.未対応';
		await insert_utility_application.run({applicationId, utilityTypeCode, contractTypeCodes, electricityStartDate, gasStartDate, gasStartTimeCode, withWaterSupply, statusUtility})
		  .then()
			.catch(e => {this.saveResultCode = 6; showAlert(e.message, 'error');});
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

