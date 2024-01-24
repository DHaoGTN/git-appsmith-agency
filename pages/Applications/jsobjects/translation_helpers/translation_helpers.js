export default {
	translateArray: (inputArray, translationMap) => {
		try {
			if (!Array.isArray(inputArray)) {
				return;			
			}
			return inputArray.map(item => translationMap[item] || item).join(', ');
		} catch (error) {
			console.error("Error occurred in translateArray: ", error);
		}
	},


	translateWord: (word, translationMap) => {
		return translationMap[word] || word;
	},

	createSelectOptions: (word, translationMap) => {
		if(translationMap[word]){		
			return {
				value: word,
				label: translationMap[word]
			}
		}

		const key = Object.keys(translationMap).find(key => translationMap[key] === word);
		if (key) {
			return { value: key, label: word };
		}

		return { value: null, label: null };
	},

	convertObjectToArray: (serviceType) => {
		return Object.keys(serviceType).map(key => {
			return {
				label: serviceType[key],
				value: key
			};
		});
	},

	findKeyByValue(targetValue, object) {
		return Object.keys(object).find(key => object[key] === targetValue);
	}
};
