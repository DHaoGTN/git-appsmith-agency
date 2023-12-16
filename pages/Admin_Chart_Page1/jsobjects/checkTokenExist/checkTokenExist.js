export default {

	async isHasToken  () {
		const token= await appsmith.store.token;
		const isHasToken= await check_token_exist.run({token});
		console.log(isHasToken);
	}
}