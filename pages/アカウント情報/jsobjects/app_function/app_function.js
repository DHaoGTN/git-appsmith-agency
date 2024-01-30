export default {



	// ----------- Change email and password function ---------------//
	changeEmail: async()=>{
		const current_email = appsmith.store.user['email'];
		const new_email = change_email_input2.text;
		// const new_email = 'test@gmail.com'
		try{
			const check_email=await check_email_exist.run({new_email})
			const count_new_email= check_email[0]['count']

			if (current_email === new_email){
				return showAlert('Your new email is same with current email', 'error')
			}
			if (count_new_email>0){
				return showAlert('Your new email have existed, please choose another email.', 'error')
			}

			await change_email.run({new_email, current_email})
			await authentication.logout()
			return showAlert('Changed email successfully, please login again', 'success')
		}catch(error){
			showAlert('Something wrong, please login again! \n'+error.message,'error')
		}

	},

	createHash : (password)=>{
		return dcodeIO.bcrypt.hashSync(password,10 );
	},

	verifyHash : (password, hash ) =>{
		return dcodeIO.bcrypt.compareSync(password, hash);
	},

	changePassword: async()=>{
		const email = appsmith.store.user['email']
		const [user] = await find_user_by_email.run({email});

		//user type passwod
		const current_password_typing=  current_password_input.text;
		const new_password_typing = confirm_password_input.text
		console.log('result')

		const result = await this.verifyHash(current_password_typing, user?.hash)
		console.log('result', result)

		// compare type password with db password
		if ( user && this.verifyHash(current_password_typing, user?.hash)){
			const current_password= user.hash;
			console.log('password same')

			const new_password = this.createHash(new_password_typing)
			return await change_password.run({new_password,current_password, email })
				.then(()=>{ showAlert('password changed', 'success')})
				.then( await authentication.logout())
				.catch((error)=>{ 	showAlert('Something wrong, please login again! \n'+error.message,'error')})
		}  else {
			console.log('password not same')
			showAlert('Password is incorrect, please type again.')
		}
	},
}

