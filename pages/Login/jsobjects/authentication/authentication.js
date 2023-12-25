export default {

	createHash : (password)=>{
		return dcodeIO.bcrypt.hashSync(password,10 );
	},

	verifyHash : (password, hash ) =>{
		return dcodeIO.bcrypt.compareSync(password, hash);
	},

	createToken : (email ) =>{
		return jsonwebtoken.sign({email}, 'gtn-id', {expiresIn: 600});
	},

	signUp: async () =>{
		const name = Name_su.text;
		const email = Email_su.text;

		const check_email =await check_email_exist.run({email});
		const count_email= check_email[0]['count'];
		console.log('count', count_email)   ;
		if (count_email === 0  ){
			if (name.length=== 0) {
				return showAlert('Please type your name', 'error')
			}
			else if (Password_su.text != confirm_password_su.text){
				return showAlert('Your password is not match', 'error')
			}
			else if (name.length != 0 ){
				const pass = Password_su.text;
				const password = this.createHash(pass);
				return insert_user_info.run({ email,password,name})
					.then(() => showAlert("Your account hass been created, Please log in",'success'))
					.catch(e => showAlert(e.message, 'error'));
			}
		}
		else {
			return showAlert('Your email have been registed, please login or try another email', 'error')
		}
	},

	signIn:async () =>{
		const email = Email_si.text;
		const password = Password_si.text;
		// const email = 'test@gmail.com';
		// const password = 'asdasd123';
		const [user] = await find_user.run({email});
		if ( user && this.verifyHash(password, user?.password)){
			const token = this.createToken(email);
			await add_token_to_db.run({token})
			await storeValue('user', user )
			await storeValue('token', token)
				.then( () => navigateTo('Agency_List_Form_Pattern'))}  
		else {
			showAlert("Invalid email or password", "error")
		}
	}

}