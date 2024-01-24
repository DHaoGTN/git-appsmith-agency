export default {
	convertArrayToPostgresArray:(arr) => {
		if (!arr || arr.length === 0) {
			return '{}';
		}
		const formattedArray = arr.map(element => `"${element}"`);
		return `{${formattedArray.join(',')}}`;
	},

	convertStringToPostgresArray(str) {
		console.log(str)
		if (str === null || str === undefined || str === '') {
			return '{}';
		}
		return `{${JSON.stringify(str)}}`;
	},
}