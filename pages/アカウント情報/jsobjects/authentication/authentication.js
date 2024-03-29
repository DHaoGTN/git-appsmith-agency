export default {
	////----------- AUTHENTICATION FUNCTION------------////
	async startUp() {
		const token = await appsmith.store.token;
		const tokenInDb = await check_token_exist.run({ token });
		const tokenCountInDb = tokenInDb[0]["count"];

		if (token !== undefined && tokenCountInDb === 1) {
			console.log("do nothing");
		} else if (
			token === undefined &&
			tokenCountInDb === 0 &&
			appsmith.mode !== "EDIT"
		) {
			navigateTo("ログイン");
		}
	},

	async createToken() {
		const email = "test@gmail.com";
		const token = jsonwebtoken.sign({ email }, "gtn-id", { expiresIn: "30s" });
		return token;
	},

	isTokenValid: () => {
		const token = appsmith.store.token;
		try {
			jsonwebtoken.verify(token, "gtn-id");
			return true;
		} catch (error) {
			return false;
		}
	},

	logout: async () => {
		const token = appsmith.store.token;
		// use try catch incase there is token in local storage to compare with token in db
		try {
			await delete_token_in_db.run({ token });
			await window.localStorage.clear();
		} catch (error) {
			showAlert(messages.Error.COMMON_ERROR+'\nError:'+ error.message, "error")
			return navigateTo("ログイン");
		}
		return showAlert(messages.Success.LOGOUT_SUCCESS, "success")
			.then(() => navigateTo("ログイン"))
			.catch((error) => showAlert(messages.Error.COMMON_ERROR+'\nError:'+ error.message, "error"));
	},

	checkToken: () => {
		const token = appsmith.store.token;
		console.log(token);
	},

	////-------------------main loop ---------------------////
	intervalId: null,
	async checkValidTokenInDb() {
		try {
			const isTokenValid = this.isTokenValid();
			if (isTokenValid) {
				console.log("token still valid, continue");
			} else {
				console.log("token exprire, delete token in db");
				const token = appsmith.store.token;
				delete_token_in_db.run({ token });
				showAlert(
					messages.Error.SESSION_EXPIRED,
					"error"
				);
				console.log("deleted token in db ");
			}
		} catch (error) {
			showAlert(messages.Error.COMMON_ERROR+'\nError:'+ error.message, "error")
		}
	},

	async loopToCheckTokenExist() {
		if (!this.intervalId) {
			const process = async () => {
				try {
					const token = appsmith.store.token;
					console.log("token", token);

					//check if current token is still valid or not
					this.checkValidTokenInDb();

					// if token is not valid, count in db is 0, else do nothing
					const tokenInDb = await check_token_exist.run({ token });
					console.log("token in db", tokenInDb);
					const tokenCountInDb = tokenInDb[0]["count"];
					console.log("tokenCountInDb", tokenCountInDb);
					// if ( tokenCountInDb === 0 && appsmith.mode !== 'EDIT' ){
					if (tokenCountInDb === 0) {
						showAlert(messages.Error.SESSION_EXPIRED,'error')
						this.logout();
						console.log("navigate to ログイン");
					}
					console.log("token still valid");
				} catch (error) {
					showAlert(messages.Error.COMMON_ERROR+'\nError:'+ error.message, "error")
				}
			};
			this.intervalId = setInterval(process, 5000);
		}
	},

	stopCountingAndLogging() {
		if (this.intervalId) {
			clearInterval(this.intervalId);
			this.intervalId = null;
		}
	},
};
