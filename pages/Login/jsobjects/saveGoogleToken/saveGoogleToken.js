export default {

	save: function() {
		const token =  auth_get_token.data['access_token'] ;
		storeValue('token', token)
		add_token.run({token})
		console.log(token);
	}
}