angular
    .module('volunteerMgmt')
    .controller('importCtrl',importCtrl);


importCtrl.$inject = ['eventData','notificationData'];
function importCtrl ( eventData,notificationData) {
	console.log('importCtrl .. define');
	var vm = this;
	vm.pageHeader = {
		title : 'Temorary Links for imort',
		info : 'Volunteers helping'
	};

	vm.message ="getting information";
	vm.importEvent = function() {
		eventData.importEvent()
			.then(function successCallback(response) {
					vm.message ="events imort done";
				},
			   function errorCallback(response) {
					 vm.message ="getting information failed"+response.status;
				}
			);
		alert(' import');
	}
	vm.importNotice = function() {
			notificationData.importNotice()
				.then(function successCallback(response) {
						vm.message ="notice imort done";
					},
				   function errorCallback(response) {
							console.log(response);
						 vm.message ="getting information failed"+response.status;
					}
				);
			alert(' import');
	}
}
