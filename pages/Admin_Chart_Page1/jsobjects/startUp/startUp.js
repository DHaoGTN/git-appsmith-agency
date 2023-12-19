export default {

	async startUp () {
		const tokenExist = appsmith.store.token;

		if (tokenExist === undefined){

			try {
				// Get Google authentication token
				const response = await auth_get_token.run();
				storeValue('token', response);  // Lưu trữ token
				this.getUser();

				// Thực thi hàm thêm token vào cơ sở dữ liệu'
				const token = response['id_token'];
				await add_google_token_to_db.run({ token })
					.then(() => console.log('Token successfully added to database'))
					.catch((err) => {
					console.error('Error adding token to database:', err);
					// Xử lý lỗi phát sinh khi thêm token vào cơ sở dữ liệu
				});
			} catch (error) {
				console.error('Token is deleted, please login again:', error);
				// navigateTo('Login');
			}
		}
	},

	getUser :async ()=>{
		const userInfo = appsmith.store.user;
		if (userInfo === undefined){
			const token = appsmith.store.token.id_token;
			const decodedToken = await jsonwebtoken.decode(token);
			storeValue('user', decodedToken);
			console.log('decode ', decodedToken)
		}
	}



}