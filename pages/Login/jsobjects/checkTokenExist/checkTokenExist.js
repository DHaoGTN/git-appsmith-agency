export default {
	intervalId: null,

	async checkTokenExist() {
		try {
			const token = await appsmith.store.token;
			const tokenExists = await check_token_exist({ token });
			const { email } = jsonwebtoken.verify(token, 'secret');
			console.log('token, email', token, email);

			if (tokenExists && email) {
				console.log('Redirecting to Agency_Form_All');
				return navigateTo('Agency_Form_All');
			} else if (tokenExists) {
				console.log('Redirecting to Admin_Chart_Page1');
				return navigateTo('Admin_Chart_Page1');
			} else {
				console.log('Token does not exist or invalid email');
			}
		} catch (error) {
			console.error('Error in checkTokenExist:', error);
		}
	},
};
