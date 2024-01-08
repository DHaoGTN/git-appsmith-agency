export default {
	
	logout: async () =>{
		const token = appsmith.store.token;
		// check_token_exist.run({token});
		// use try catch incase there is token in local storage to compare with token in db
		try{
			await delete_token_in_db.run({token});
			await window.localStorage.clear()
		}catch(error){
			return navigateTo("Login")
		}
		return  showAlert("you have been logged out,",'success')
			.then(() => navigateTo('Login'))
			.catch(e => showAlert(e.message, 'error'));
	},

	checkToken: () =>{
		const token =appsmith.store.token;
		console.log(token);
	},

	// ----------- Change email and password function ---------------//
	changeEmail: async()=>{
		const current_email = appsmith.store.email;
		const new_email = change_email_input2.text;
		// const new_email = 'test@gmail.com'
		const check_email=await check_email_exist.run({new_email})
		const count_new_email= check_email[0]['count']
		console.log('count new email', count_new_email)
		if (current_email === new_email){
			return showAlert('Your new email is same with current email', 'error')
		}
		if (count_new_email>0){
			return showAlert('Your new email have existed, please choose another email or login', 'error')
		}

		await change_email.run({new_email, current_email})
		await this.logout()
		return showAlert('changed email successfully,  please login again', 'success')

	},

	createHash : (password)=>{
		return dcodeIO.bcrypt.hashSync(password,10 );
	},

	verifyHash : (password, hash ) =>{
		return dcodeIO.bcrypt.compareSync(password, hash);
	},

	changePassword: async()=>{
		const email = appsmith.store.email
		const [user] = await find_user_by_email.run({email});

		//user type passwod
		const current_password_typing=  current_password_input.text;
		const new_password_typing = confirm_password_input.text


		// compare type password with db password
		if ( user && this.verifyHash(current_password_typing, user?.hash)){
			const current_password= user.hash;
			console.log('password same')
			//change password logic
			// create new password hash
			const new_password = this.createHash(new_password_typing)
			return await change_password.run({new_password,current_password, email })
				.then(()=>{ showAlert('password change', 'success')})
				.catch((e)=>{ showAlert(e, 'error')})

			//store new hasht to selected email and old hash

		}  else {
			console.log('password not same')
			showAlert('Password is incorrect, please type again.')

		}
		// if same , change password

		// else showalert
	},


}

