export default {
	const currentState = false;
	checkbox1_state () {
		const currentState = appsmith.store.checkboxState;
		const newState = !currentState;
		storeValue('checkboxState', newState);
		return newState;
	},

	checkbox3_state () {
		const currentState = appsmith.store.checkbox3State;
		const newState = !currentState;
		storeValue('checkbox3State', newState);
		return newState;
	},
}
