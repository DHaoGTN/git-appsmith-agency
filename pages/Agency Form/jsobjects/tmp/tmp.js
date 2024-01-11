export default {
	serviceAllowed: '{wifi, utility}',
	isWifiAllowed: null,
	isCardAllowed: null,
	isUtilitiesAllowed: null,
	resultCode: 0,
	VALIDATE_NO_CHOICE: 0,
	VALIDATE_CHOICE_ENOUGH: 1,
	VALIDATE_CHOICE_NOT_ENOUGH: 2,
	VALIDATE_DATA_INCORRECT: 3,

	async setAgencyServicesAllowed() {
		let userInfo = await appsmith.store.user;
		if (userInfo) {
			const agencyId = JSON.stringify(userInfo.agency_id);
			await find_service_allowed.run({agencyId})
				.then(res => this.serviceAllowed = JSON.stringify(res[0].service_type_codes))
				.catch(e => {showAlert("Can not retrieve service type code. "+e.message, 'error');});
			// showAlert(this.serviceAllowed);
			this.isWifiAllowed = this.serviceAllowed.includes('wifi');
			this.isCardAllowed = this.serviceAllowed.includes('credit_card');
			this.isUtilitiesAllowed = this.serviceAllowed.includes('utility');
			service_wifi_cb.setVisibility(this.isWifiAllowed);
			service_card_cb.setVisibility(this.isCardAllowed);
			service_utilities_cb.setVisibility(this.isUtilitiesAllowed);
		} else {
			showAlert("Can not retrieve user info. ", 'error');
		}
	},

	async submitForm() {
		if (this.validateFormAll()) {
			if (await this.saveApplicationAll()) {
				await this.sendToAutoFill();
				await this.sendEmailToPoC();	
			}
		}
	},
	async sendToAutoFill() {
		// TODO: Later, call RPA api
	},
	async sendEmailToPoC() {
		let titleEmailGTN = 'Affiliate test title GTN';
		let titleEmailAgency = 'Affiliate test title Agency';
		let titleEmailCustomer = 'Affiliate test title Customer';
		let bodyEmailGTN = 'Affiliate test body GTN';
		let bodyEmailAgency = 'Affiliate test body Agency';
		let bodyEmailCustomer = 'Affiliate test body Customer';

		let userInfo = await appsmith.store.user;
		if (userInfo) {
			const agencyId = JSON.stringify(userInfo.agency_id);
			const currentEmail = JSON.stringify(userInfo.email); // current agency account
			let agencyEmail = '';
			await find_agency_email.run({agencyId})
				.then(res => agencyEmail = JSON.stringify(res[0].email))
				.catch(e => {this.resultCode = 71; showAlert(e.message, 'error');});

			// 1. Send to Agency
			await this.sendEmail(currentEmail+', '+agencyEmail, titleEmailAgency, bodyEmailAgency, 72);
			// 2. Send to GTN
			await this.sendEmail('d.hao@gtn-vietnam.com', titleEmailGTN, bodyEmailGTN, 73);
		}
		let customerEmail = email_input.text;
		// 3. Send to Customer
		await this.sendEmail(customerEmail, titleEmailCustomer, bodyEmailCustomer, 74);

		if (this.resultCode == 0) {
			showAlert('Email was sent successfully.', 'success');
		} else {
			showAlert('There are an error when sending email. Please try again. Result code: '+this.resultCode, 'error');
		}
	},
	async sendEmail(emails, title, body, resultCodeIfFailed) {
		if (emails == '' || title == '' || body == '') {
			return false;
		}
		await send_emails.run({emails, title, body})
			.then()
			.catch(e => {this.resultCode = resultCodeIfFailed; showAlert(e.message, 'error');});
	},

	validateFormAll:() =>{
		if (this.validateFormApplicant() == this.VALIDATE_CHOICE_ENOUGH && 
				(this.validateFormWifi() == this.VALIDATE_CHOICE_ENOUGH || 
				 this.validateFormCard() == this.VALIDATE_CHOICE_ENOUGH ||
				 this.validateFormUtility() == this.VALIDATE_CHOICE_ENOUGH) &&
				(this.validateFormWifi() != this.VALIDATE_CHOICE_NOT_ENOUGH && 
				 this.validateFormCard() != this.VALIDATE_CHOICE_NOT_ENOUGH && 
				 this.validateFormUtility() != this.VALIDATE_CHOICE_NOT_ENOUGH) &&
				this.validateFormAgreement() == this.VALIDATE_CHOICE_ENOUGH
			 ) {
			return true;
		}
		showAlert('Please fill all of required fields and check data correctly.', 'warn'); 
		return false;
	},
	validateFormApplicant:() =>{
		if (!firstname_input.isValid ||
				!lastname_input.isValid ||
				!firstname_ktkn_input.isValid ||
				!lastname_ktkn_input.isValid ||
				!dateofbirth_dpk.isValid ||
				!nationality_input.isValid ||
				!visa_input.isValid ||
				// (!japanese_cb.isChecked && !vietnamese_cb.isChecked && !chinese_cb.isChecked && !english_cb.isChecked && !korean_cb.isChecked && !taiwan_cb.isChecked) ||
				!lang_radiogrp.isValid ||
				!phone_input.isValid ||
				!email_input.isValid ||
				!email_cf_input.isValid ||
				!address1_input.isValid ||
				!address2_input.isValid ||
				!address3_input.isValid ||
				!address4_input.isValid
			 ) {
			return this.VALIDATE_CHOICE_NOT_ENOUGH;
		}
		if (email_input.text != email_cf_input.text)
			return this.VALIDATE_DATA_INCORRECT;
		return this.VALIDATE_CHOICE_ENOUGH;
	},
	validateFormWifi:() =>{
		if (service_wifi_cb.isChecked) {
			if (contact_dow_sb.selectedOptionValue == '' ||
					resident_front_fpk.files.length == 0 ||
					resident_back_fpk.files.length == 0
				 )
				return this.VALIDATE_CHOICE_NOT_ENOUGH;
			return this.VALIDATE_CHOICE_ENOUGH;
		}
		return this.VALIDATE_NO_CHOICE;
	},
	validateFormCard:() =>{
		if (service_card_cb.isChecked) {
			return this.VALIDATE_CHOICE_ENOUGH;
		}
		return this.VALIDATE_NO_CHOICE;
	},
	validateFormUtility:() =>{
		if (service_utilities_cb.isChecked) {
			if (utility_type_radiogrp.selectedOptionValue == '' ||
					contract_type_cbgrp.selectedValues == '' ||
					water_radiogrp.selectedOptionValue == '' ||
					(utility_type_radiogrp.selectedOptionValue == 'both' && (
				electric_start_date_dpk.selectedDate == '' || 
				gas_start_date_dpk.selectedDate == '' || 
				gas_start_time_radiogrp.selectedOptionValue == ''
			)) ||
					(utility_type_radiogrp.selectedOptionValue == 'electric' && electric_start_date_dpk.selectedDate == '') ||
					(utility_type_radiogrp.selectedOptionValue == 'gas' && (
				gas_start_date_dpk.selectedDate == '' || 
				gas_start_time_radiogrp.selectedOptionValue == ''
			))
				 )
				return this.VALIDATE_CHOICE_NOT_ENOUGH;
			return this.VALIDATE_CHOICE_ENOUGH;
		}
		return this.VALIDATE_NO_CHOICE;
	},
	validateFormAgreement:() =>{
		if (agreement1_cb.isChecked && agreement2_cb.isChecked) {
			return this.VALIDATE_CHOICE_ENOUGH;
		}
		return this.VALIDATE_CHOICE_NOT_ENOUGH;
	},

	// async saveApplicationAll() {
		// let isChooseWifi = service_wifi_cb.isChecked;
		// let isChooseCard = service_card_cb.isChecked;
		// let isChooseUtility = service_utilities_cb.isChecked;
		// 
		// let applicantId = await this.saveApplicant();
		// if (applicantId) {
			// await this.saveAddresses(applicantId);
			// let applicationId = await this.saveApplications(applicantId);
			// if (applicationId) {
				// if (isChooseWifi) {
					// await this.saveWifiApplications(applicationId);
				// }
				// if (isChooseCard) {
					// await this.saveCardApplications(applicationId);
				// }
				// if (isChooseUtility) {
					// await this.saveUtilityApplications(applicationId);
				// }
			// }
		// }
		// if (this.resultCode == 0) {
			// showAlert('Application was created successfully. We will inform by sending email to person in charge for this application.', 'success');
			// return true;
		// } else {
			// showAlert('There are an error when saving information. Please try again. Result code: '+this.resultCode, 'error');
	    // return false;
		// }
	// },
	async saveApplicationAll() { // add rollback
		let isChooseWifi = service_wifi_cb.isChecked;
		let isChooseCard = service_card_cb.isChecked;
		let isChooseUtility = service_utilities_cb.isChecked;
		
		let applicantId = await this.saveApplicant();
		let applicationId = 0;
		if (applicantId) {
			try {
				if (!(await this.saveAddresses(applicantId))) {
            throw new Error("Failed to save addresses");
        }
				applicationId = await this.saveApplications(applicantId);
				if (applicationId) {
					if (isChooseWifi) {
						if (!(await this.saveWifiApplications(applicationId))) {
								throw new Error("Failed to save wifi");
						}
					}
					if (isChooseCard) {
						if (!(await this.saveCardApplications(applicationId))) {
								throw new Error("Failed to save card");
						}
					}
					if (isChooseUtility) {
						if (!(await this.saveUtilityApplications(applicationId))) {
								throw new Error("Failed to save addresses");
						}
					}
				} else {
					throw new Error("Failed to save applications");
				}
			} catch(error) {
				switch (this.resultCode) {
					case 2: // save Address failed
						rollback_applicant.run({applicantId});
						break;
					case 3: // save Application failed
					case 31: // save Application failed
						rollback_applicant.run({applicantId});
						rollback_address.run({applicantId});
						break;
					case 4: // save Wifi failed
					case 41: // save Wifi failed
						rollback_applicant.run({applicantId});
						rollback_address.run({applicantId});
						rollback_application.run({applicationId});
						break;
					case 5: // save Card failed
						rollback_applicant.run({applicantId});
						rollback_address.run({applicantId});
						rollback_application.run({applicationId});
						rollback_wifi_application.run({applicationId});
						break;
					case 6: // save Utility failed
						rollback_applicant.run({applicantId});
						rollback_address.run({applicantId});
						rollback_application.run({applicationId});
						rollback_wifi_application.run({applicationId});
						rollback_card_application.run({applicationId});
						break;
				}
			}
		}
		if (this.resultCode == 0) {
			showAlert('Application was created successfully. We will inform by sending email to person in charge for this application.', 'success');
			return true;
		} else {
			showAlert('There are an error when saving information. Please try again. Result code: '+this.resultCode, 'error');
			return false;
		}
	},
	async saveApplicant() {
		let applicantId = 0;
		let fistname = firstname_input.text;
		let lastname = lastname_input.text;
		let fistnameKtkn = firstname_ktkn_input.text;
		let lastnameKtkn = lastname_ktkn_input.text;
		let birthday = dateofbirth_dpk.formattedDate;
		let nationality = nationality_input.text;
		let visa = visa_input.text;
		// let desiredLang = japanese_cb.isChecked ? '日本語' :
		// vietnamese_cb.isChecked ? 'Tiếng Việt' :
		// chinese_cb.isChecked ? '簡体字' :
		// english_cb.isChecked ? 'English' :
		// korean_cb.isChecked ? '한국어' :
		// taiwan_cb.isChecked ? '繁体字' : '日本語';
		let desiredLang = lang_radiogrp.selectedOptionValue;
		let phone = phone_input.text;
		let email = email_input.text;

		await insert_applicant.run({fistname, lastname, fistnameKtkn, lastnameKtkn, birthday, nationality, visa, desiredLang, phone, email})
			.then(res => applicantId = JSON.stringify(res[0].id))
			.catch(e => {this.resultCode = 1; showAlert(e.message, 'error');});
		return applicantId;
	},

	async saveAddresses(applicantId) {
		let isSuccess = false;
		let postalCode = address1_input.text;
		let prefecture = address2_input.text;
		let city = address3_input.text;
		let addressDetail = address4_input.text;
		let building = address5_input.text;
		let room = address6_input.text;
		await insert_address.run({applicantId, postalCode, prefecture, city, addressDetail, building, room})
			.then(res => {isSuccess = true})
			.catch(e => {this.resultCode = 2; showAlert(e.message, 'error');});
		return isSuccess;
	},

	async saveApplications(applicantId) {
		let applicationId = 0;
		let userInfo = await appsmith.store.user;
		if (userInfo) {
			const agencyId = JSON.stringify(userInfo.agency_id);
			let serviceTypeCodes = [];
			service_wifi_cb.isChecked ? serviceTypeCodes.push('wifi') : '';
			service_card_cb.isChecked ? serviceTypeCodes.push('credit_card') : '';
			service_utilities_cb.isChecked ? serviceTypeCodes.push('utility') : '';
			serviceTypeCodes = this.convertArrayToPostgresArray(serviceTypeCodes);

			await insert_application.run({agencyId, applicantId, serviceTypeCodes})
				.then(res => applicationId = JSON.stringify(res[0].id))
				.catch(e => {this.resultCode = 3; showAlert(e.message, 'error');});
		} else {
			this.resultCode = 31; // Can not get userInfo in storage
		}
		return applicationId;
	},

	async saveWifiApplications(applicationId) {
		let isSuccess = false;
		let contactDow = contact_dow_sb.selectedOptionValue;
		let urlFront = resident_front_fpk.files[0].name;
		let urlBack = resident_back_fpk.files[0].name;
		let isUploadFrontSuccess = false;
		await upload_resident_front_image.run()
			.then(res => isUploadFrontSuccess = true)
			.catch();
		let isUploadBackSuccess = false;
		await upload_resident_back_image.run()
			.then(res => isUploadBackSuccess = true)
			.catch();
		let statusWifi = 'not_handle';
		if (isUploadFrontSuccess && isUploadFrontSuccess) {
			await insert_wifi_application.run({applicationId, contactDow, urlFront, urlBack, statusWifi})
				.then(res => {isSuccess = true})
				.catch(e => {this.resultCode = 4; showAlert(e.message, 'error');});
		} else {
			this.resultCode = 41;
		}
		return isSuccess;
	},

	async saveCardApplications(applicationId) {
		let isSuccess = false;
		let statusCard = 'not_handle';
		await insert_card_application.run({applicationId, statusCard})
			.then(res => {isSuccess = true})
			.catch(e => {this.resultCode = 5; showAlert(e.message, 'error');});
		return isSuccess;
	},

	async saveUtilityApplications(applicationId) {
		let isSuccess = false;
		let utilityTypeCode = utility_type_radiogrp.selectedOptionValue;
		let contractTypeCodes = this.convertArrayToPostgresArray(contract_type_cbgrp.selectedValues);
		let electricStartDate = utilityTypeCode == 'gas' ? null : (electric_start_date_dpk.formattedDate == '' ? null : electric_start_date_dpk.formattedDate);
		let gasStartDate = utilityTypeCode == 'electric' ? null : (gas_start_date_dpk.formattedDate == '' ? null : gas_start_date_dpk.formattedDate);
		let gasStartTimeCode = utilityTypeCode == 'electric' ? null : (gas_start_time_radiogrp.selectedOptionValue == '' ? null : gas_start_time_radiogrp.selectedOptionValue);
		let withWaterSupply = water_radiogrp.selectedOptionValue == 'true' ? true : false;
		let statusUtility = 'not_handle';
		await insert_utility_application.run({applicationId, utilityTypeCode, contractTypeCodes, electricStartDate, gasStartDate, gasStartTimeCode, withWaterSupply, statusUtility})
			.then(res => {isSuccess = true})
			.catch(e => {this.resultCode = 6; showAlert(e.message, 'error');});
		return isSuccess;
	},

	/**
	* For convert array like ["a", "b"] to {"a", "b"} (insert postgres enum array)
	*/
	convertArrayToPostgresArray: (array) =>{
		const formattedString = `{${array.join(", ")}}`;
		return formattedString;
	},
	validateEmail: (email) => {
		return String(email)
			.toLowerCase()
			.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
	},

}

