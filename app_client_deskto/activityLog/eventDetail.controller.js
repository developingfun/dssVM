angular
    .module('volunteerMgmt')
    .controller('eventDetailCtrl',eventDetailCtrl);


eventDetailCtrl.$inject = ['$uibModalInstance','eventData','eData'];
function eventDetailCtrl ($uibModalInstance, eventData, eData) {
	console.log('eventDetailCtrl .. define');
	var vm = this;
	vm.eData = eData;

	vm.modal = {
		cancel : function() {
				$uibModalInstance.dismiss('cancel');
		}
	};
	vm.getData = function() {
		console.log('eventDetailCtrl .. getData');

			eventData.eventById(vm.eData.eventId)
			    .then(function successCallback(response) {
					   vm.data = { event: response.data };
						},
					  function errorCallback(response) {
						  vm.message ="getting information failed"+response.status;
						}
			);

	};
	vm.getData();
}
