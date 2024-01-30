export default {
	async update() {
		const selected = tbl_application.triggeredRow;

		await this.updateStatus(selected.id, selected.wifi_status, "wifi_applications", translation_map.wifiApplicationStatus, "WiFi");
		await this.updateStatus(selected.id, selected.utility_status, "utility_applications", translation_map.utilityApplicationStatus, "Utility");
		await this.updateStatus(selected.id, selected.credit_card_status, "credit_card_applications", translation_map.creditCardApplicationStatus, "Credit card");

		handler_filter.getFilteredApplications();
	},

	async updateStatus(id, status, tableName, translationMap, statusType) {
		if (status) {
			const result = await update_status.run({
				tableName: tableName,
				status: translation_helpers.findKeyByValue(status, translationMap),
				id: id
			});
			if (result[0].affectedRows === 1) {
				showAlert(`${statusType} status updated successfully!`, 'success');
			} else {
				showAlert(`${statusType} status update failed`, "error");
			}
		}
	}
}
