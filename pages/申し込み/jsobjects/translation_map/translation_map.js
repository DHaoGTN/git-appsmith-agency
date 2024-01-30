export default {
	serviceType: {
		"wifi": "光",
		"utility": "電気ガス",
		"credit_card": "カード"
	},

	wifiApplicationStatus : {
		"service_not_required": "0. サービス不要",
		"not_handle": "1. 未対応",
		"application_form_failed": "2. 申込フォーム入力失敗",
		"application_form_completed": "3. 申込フォーム入力完了",
		"no_address_on_residence_card": "4. 在留カードの裏に住所記載なし",
		"handled": "5. 対応済み",
		"contracted_before_activation": "6. 契約済み - 開通前",
		"contracted_activated": "7. 契約済み - 開通済み",
		"other": "8. その他",
		"application_cancelled": "9. 申込取り消し"
	},

	utilityApplicationStatus : {
		"service_not_required": "0. サービス不要",
		"not_handle": "1. 未対応",
		"agreement_email_sent_failed": "2. 規約同意メール送信失敗",
		"agreement_email_sent_not_agreed": "3. 規約同意メール送信 - 未同意",
		"application_form_failed": "4. 申込フォーム入力失敗",
		"application_form_completed": "5. 申込フォーム入力完了",
		"contracted_before_activation": "6. 契約済み - 開通前",
		"contracted_activated": "7. 契約済み - 開通済み",
		"other": "8. その他",
		"application_cancelled": "9. 申込取り消し"
	},

	creditCardApplicationStatus: {
		"service_not_required": "0. サービス不要",
		"not_handle": "1. 未対応",
		"in_progress": "2. 対応中",
		"informed_url_sent": "3. 案内済み - URL送付済み",
		"informed_cannot_guide": "4. 案内済み - 案内不可",
		"informed_gtn_service_not_used": "5. 案内済み - GTNサービス未使用",
		"informed_no_reply": "6. 案内済み - 返信なし",
		"informed_duplicate_application": "7. 案内済み - 重複申込",
		"spam_post": "8. 迷惑投稿",
		"passed_to_another_department": "9. 他部署パス",
		"issued": "10. 発行済み",
		"issue_declined": "11. 発行謝絶",
		"issue_cancelled": "12. 発行取り消し",
		"other": "13. その他",
		"application_cancelled": "14. 申込取り消し"
	},

	bankClassification: {
		"savings": "普通",
		"checking": "当座",
		"deposit": "定期"
	},

	contactDayOfWeeks: {
		"monday": "月曜日",
		"tuesday": "火曜日",
		"wednesday": "水曜日",
		"thursday": "木曜日",
		"friday": "金曜日",
		"saturday": "土曜日",
		"sunday": "日曜日"
	},

	correspondenceDestinationType: {
		"affiliate": "GTNアフィリエイト",
		"mobile": "GTNモバイル",
		"credit_card": "GTNカード",
		"agency": "代理店",
		"utility_company": "供給会社"
	},

	utilityContractType: {
		"electric": "電気一括契約",
		"water_supply": "水道一括契約",
		"gas": "ガス一括契約",
		"no_contract": "一括契約なし"
	},

	utilityType: {
		"both": "電気とガス",
		"electric": "電気のみ",
		"gas": "ガスのみ"
	},

	yesNoTranslations: {
		"true": "有",
		"false": "無"
	},

	language: {
		"japanese": "日本語",
		"vietnamese": "Tiếng Việt",
		"chinese": "簡体字",
		"english": "English",
		"korean": "한국어",
		"taiwan": "繁体字"
	},

}