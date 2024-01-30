export default {
	isServiceLoaded: false,
	isStatusLoaded: false,
	totalRecord: 0,

	getStatusSelect: (serviceParam) => {
		try {
			const serviceFilter = serviceParam || service_select.selectedOptionValue;
			switch (serviceFilter){
				case "wifi":
					return translation_helpers.convertObjectToArray(translation_map.wifiApplicationStatus);
				case "utility":
					return translation_helpers.convertObjectToArray(translation_map.utilityApplicationStatus);
				case "credit_card":
					return translation_helpers.convertObjectToArray(translation_map.creditCardApplicationStatus);
				default:
					break;
			}
		} catch (error) {
			console.error("Error in getStatus:", error);
		}
	},

	updateStatusSelectState: async() =>{
		const serviceFilter = service_select.selectedOptionValue;
		if(serviceFilter){
			status_muti_select.setDisabled(false)
		} else {
			status_muti_select.setDisabled(true)
		}
	},

	refreshPage:() => {
		this.isServiceLoaded = true;
		this.isStatusLoaded = true;
		resetWidget('agency_select');
		resetWidget('service_select');
		resetWidget('status_select');
		resetWidget('tbl_application');
		this.getFilteredApplications();
	},

	listApplication:(applications)=>{
		return applications[0].data.map(item => JSON.parse(item));
	},

	addSingleQuotes: (value) => {
		return value === null ? null : `'${value}'`;
	},

	getFilteredApplications: async() => {
		try{
			const serviceFilter = service_select.selectedOptionValue;
			const statusFilter = status_muti_select.selectedOptionValues;
			let serviceStatus = {
				wifi: null,
				utility: null,
				credit_card: null
			};

			if (serviceFilter && statusFilter && statusFilter.length > 0) {
				serviceStatus[serviceFilter] = statusFilter;
			}
			const agencyId = await appsmith.store.user.agency_id;

			const queryParams = {
				agencyId: agencyId,
				service: postgres_helpers.convertStringToPostgresArray(serviceFilter),
				wifiStatus: serviceStatus.wifi,
				utilityStatus: serviceStatus.utility,
				creditStatus: serviceStatus.credit_card,
			};

			await list_applications_full.run(queryParams);

			const count = await count_application.run(queryParams);
			this.totalRecord = count[0].count;
			if(this.totalRecord === 0){
				showAlert('No have any record', 'warning');
			}
		}catch(error){
			console.log(error)
		}
	},
}