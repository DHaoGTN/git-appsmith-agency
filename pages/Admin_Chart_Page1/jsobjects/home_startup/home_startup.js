export default {
	
	checkIsTokenNotExist: function() {
		showAlert(0, 'info');
    var token = "";
	  token = appsmith.store.token;
		var countToken = check_token_exist.run(token);
	  showAlert(countToken, 'info');
	  if (!countToken || countToken == 0) {
		  navigateTo('Login');
	  }
  },
  startRepeatCheck: function() {
    setInterval(this.checkIsTokenNotExist, 8000);
  }
};


// intervalId: null,
// startCountingAndLogging() {
		// if (!this.intervalId) {
			// const process = async () => {
				// // console.log(appsmith.store.token);
				// var token = "";
				// token = appsmith.store.token;
				// showAlert(token, 'info');
				// // const tokendb = await checkTokenExist.run({token});
				// // console.log('tokendb', tokendb);
				// // return tokendb.data;
				// if (!token || token == "") {
					// navigateTo('Login');
				// }
			// };
// 
			// this.intervalId = setInterval(process, 8000);
		// }
	// },
// 
	// stopCountingAndLogging() {
		// if (this.intervalId) {
			// clearInterval(this.intervalId);
			// this.intervalId = null;
		// }
	// },