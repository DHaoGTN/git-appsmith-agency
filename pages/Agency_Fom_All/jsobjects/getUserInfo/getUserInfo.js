export default {
	getCurrentUser: async()=>{
		const {email} = jsonwebtoken.verify(appsmith.store.token, 'secret');
		// console.log(email);
		return await find_user.run({email});
	},
}