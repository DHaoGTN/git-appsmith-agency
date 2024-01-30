export default {

	test : async()=>{
		await get_agency_info.run()
		await get_table_data.run().catch(showAlert('loi asdsadasd '))
		// .then(await get_table_data.run())

		// return await 	get_agency_info.run()
		// .then(await get_table_data.run())
		// .catch((e) => showAlert(e, 'error'))
	}}