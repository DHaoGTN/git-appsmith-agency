export default {

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

	submitPattern: () =>{
		//{{navigateTo("Agency_Form_All", {"pattern": RadioGroupPattern.selectedOptionValue})}}
		{{navigateTo("Agency_Form_All", {
			"wifi": service_wifi.isChecked,
			"card": service_card.isChecked,
			"utilities": service_utilities.isChecked,
		})}}
	},
}

