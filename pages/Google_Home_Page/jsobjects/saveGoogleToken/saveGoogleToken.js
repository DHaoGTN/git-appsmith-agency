export default {
	save: function() {
		setTimeout(async () => {
			const checkToken = appsmith.store.token;
			
			if (checkToken === undefined){
				const token =await auth_get_token.data['access_token'];
				storeValue('token', token);

				await add_google_token_to_db.run({token})

				if (token){
					const user =await get_user.data;
					storeValue('user',user);
					console.log('user',user);
				}

			}
		}, 3000); 
	},

	runEveryFiveSeconds: function() {
		setInterval(() => {
			const token = auth_get_token.data['access_token'];
			const result =check_token_exist.run({token});
			console.log(result);
		}, 5000); // Hàm này sẽ chạy sau mỗi 5 giây
	}
}
