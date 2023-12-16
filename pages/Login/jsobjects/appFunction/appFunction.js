export default {

	createHash : (password)=>{
		return dcodeIO.bcrypt.hashSync(password,10 );
	},
	verifyHash : (password, hash ) =>{
		return dcodeIO.bcrypt.compareSync(password, hash);
	},
	createToken : (email ) =>{
		return jsonwebtoken.sign({email}, 'secret', {expiresIn: 60 * 60});
	},

	signUp:() =>{
		const name = Name_su.text;
		const email = Email_su.text;
		const pass = Password_su.text;
		const password = this.createHash(pass);
		console.log(password);
		return sign_up.run({name, email,password})
			.then(() => showAlert("Your account hass been created, Please log in",'succes'))
		// .then (()=> storeValue("token", this.createToken(email)))
		// .then (() => navigateTo('Page2'))
			.catch(e => showAlert(e.message, 'error'));
	},

	signIn:async () =>{
		// const email = Email_si.text;
		// const password = Password_si.text;
		const email = 'test@gmail.com';
		const password = 'asdasd123';
		const [user] = await find_user.run({email});

		if ( user && this.verifyHash(password, user?.password)){
			const token = this.createToken(email);

			await add_token.run({token})
			await storeValue('user', user )
			await storeValue('token', token)
				.then( () => navigateTo('Agency_Form_All'))}  
		else {
			showAlert("Invalid email or password", "error")
		}
	}

}