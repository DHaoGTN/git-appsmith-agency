export default {
	myFun1 () {
		// Lấy trạng thái hiện tại của checkbox từ store
		const currentState = appsmith.store.checkboxState;

		// Đảo ngược trạng thái và lưu trở lại vào store
		const newState = !currentState;
		storeValue('checkboxState', newState);

		// Trả về trạng thái mới
		return newState;
	},
}
