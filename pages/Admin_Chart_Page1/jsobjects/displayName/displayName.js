export default {

	async userName () {
		const tokenExist = appsmith.store.token;

		if (tokenExist === undefined){
			const token =await auth_get_token.run() ;

			const user =await get_user_by_token.run();

			storeValue('token', token);
			storeValue('user', user);

			console.log('user from google display name', user);
			// const name = user[0]['name'];
			// console.log('user db',name);
			// console.log('token', appsmith.store.user['name']);
		}

	}
}