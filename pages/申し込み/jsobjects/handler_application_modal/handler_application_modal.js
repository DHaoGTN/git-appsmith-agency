export default {
	wifiVisibility: false,
	creditCardVisibility: false,
	utilityVisibility: false,
	correspondenceVisibility: false,

	serviceTypes: {
		wifi: "光",
		card: "カード",
		utility: "電気ガス",
	},

	statusGetDataWifi: false,
	statusGetDataCreditCard: false,
	statusGetDataUtility: false,

	triedGetApplicants: async()=>{
		try{
			// console.log(this.tabCreditCard);
			// console.log(application_tab.tabsObj.tabe9g5m3lcq0.label);
			// console.log(application_tab.tabsObj.taboisgt0490e.label);
			// console.log(application_tab.tabsObj.tabvzfazjcplm.label);
			// console.log(application_tab.tabsObj.tab1.label);
			// console.log(application_tab.tabsObj.tab2.label);
			// console.log(application_tab);
		}catch(error){
			console.error(error)
		}
	},

	async setupApplicationTab() {
		try {
			await Promise.all([
				get_applicants_detail.run(),
				list_language.run()
			]);

			const correspondences = await list_correspondences.run();
			this.correspondenceVisibility = correspondences.length > 0;

			const services = tbl_application.selectedRow.service;
			console.log(services.includes(this.serviceTypes.wifi));
			this.wifiVisibility = services.includes(this.serviceTypes.wifi);
			this.creditCardVisibility = services.includes(this.serviceTypes.card);
			this.utilityVisibility = services.includes(this.serviceTypes.utility);
		} catch (error) {
			console.error("Error setting up application tab:", error);
		}
	},

	handlerTabSelect: async() => {
		try {
			const selectedTab = application_tab.selectedTab;
			const tabsObj = application_tab.tabsObj;
			const utilityTabLabel = tabsObj.tabe9g5m3lcq0.label;
			const wifiTabLabel = tabsObj.tab1.label;
			const creditCardTabLabel = tabsObj.tab2.label;

			switch (selectedTab) {
				case wifiTabLabel:
					await this.processWifiTab();
					await read_image_front.run();
					await read_image_back.run();
					break;
				case creditCardTabLabel:
					await this.processCreditCardTab();
					break;
				case utilityTabLabel:
					await this.processUtilityTab();
					break;
				default:
					console.log('No matching tab found.');
			}
		} catch (error) {
			console.error("Error setting up application tab:", error);
		}
	},

	processWifiTab: async () => {
		if (!this.statusGetDataWifi) {
			await get_wifi_application_details.run();
			this.statusGetDataWifi = true;
		}
	},

	processCreditCardTab: async () => {
		if (!this.statusGetDataCreditCard) {
			await get_credit_application.run();
			this.statusGetDataCreditCard = true;
		}
	},

	processUtilityTab: async () => {
		if (!this.statusGetDataUtility) {
			await list_gas_start_time_type.run();
			await get_utility_application_detail.run();
			await list_utility_companies.run();
			this.statusGetDataUtility = true;
		}
	},

	closeApplicationModel: async() => {
		this.statusGetDataUtility = false;
		this.statusGetDataWifi = false;
		this.statusGetDataCreditCard = false;
		this.correspondenceVisibility = false;
		this.wifiVisibility= false;
		this.creditCardVisibility= false;
		this.utilityVisibility= false;
		this.correspondenceVisibility= false;
	},

	getApplicationDetails: (data) => {
		if (data && data.length > 0) {
			return data[0].id;
		} else {
			return null;
		}
	},
};
