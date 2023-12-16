export default {
	async checkTokenExist() {
		const token = await appsmith.store.token;
		const tokenInDb = await check_token_exist.run({token});
		const tokenCountInDb= tokenInDb[0]['count'];
		// console.log(tokenCountInDb)
		console.log('token',token);
		console.log('count', tokenCountInDb);
		if (token!== undefined && tokenCountInDb === 1){
			console.log('chuyen huong sang trang emai pass');
			navigateTo('Agency_Form_All');
		}
		else if (token !== undefined & tokenCountInDb ===0){
			console.log('chuyen huong sang trang gmail');
			navigateTo('Google_Home_Page');
		}
		else if (token === undefined && tokenCountInDb ===0){
			console.log('chua login, k can lam gi');
		}

		// Assuming you have imported and defined `check_token_exist` and `navigateTo` functions.
		// const tokenExists = await check_token_exist({ token });
		// const { email } = jsonwebtoken.verify(token, 'secret');
		// console.log('token, email', token, email);
		// console.log('tokenExists', tokenExists);

		// if (tokenExists && email) {
		//   console.log('Redirecting to Agency_Form_All');
		//   return navigateTo('Agency_Form_All');
		// } else if (tokenExists) {
		//   console.log('Redirecting to Admin_Chart_Page1');
		//   return navigateTo('Admin_Chart_Page1');
		// } else {
		//   console.log('Token does not exist or invalid email');
		// }
	},
};
