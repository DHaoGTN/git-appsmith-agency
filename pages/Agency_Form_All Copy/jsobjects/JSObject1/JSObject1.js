export default {
	myFun1 () {
		document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') {
            // The tab has become active
            showAlert('InfoModal'); // Replace 'InfoModal' with your modal's name
        }
    });
	},
}