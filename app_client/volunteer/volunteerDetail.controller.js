angular
    .module('volunteerMgmt')
    .controller('volunteerDetailCtrl',volunteerDetailCtrl);

volunteerDetailCtrl.$inject = ['$routeParams','volunteerData'];
function volunteerDetailCtrl ($routeParams , volunteerData) {
	console.log('volunteerDetailCtrl .. define');
	var vm = this;
	vm.volunteerId = $routeParams.id;
	vm.pageHeader = {
		title : 'Me ..',
		info : 'Volunteer id '+vm.volunteerId
	};

	vm.message ="getting information";
	vm.getData = function() {
		console.log('volunteerDetailCtrl .. getData');
		vm.message ="getting information........";
		volunteerData.volunteerById(vm.volunteerId)
		    .then(function successCallback(response) {
				    vm.message = "";
				    vm.data = { volunteer: response.data };
					},
				  function errorCallback(response) {
					  vm.message ="getting information failed"+response.status;
					  }
			      );

	};
	vm.getData();
}
