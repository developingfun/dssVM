angular
    .module('volunteerMgmt')
    .controller('volunteerDetailCtrl',volunteerDetailCtrl);

volunteerDetailCtrl.$inject = ['$routeParams','volunteerData'];
function volunteerDetailCtrl ($routeParams , volunteerData) {
	console.log('volunteerDetailCtrl .. define');
	var vm = this;
	vm.id = $routeParams.id;
	vm.pageHeader = {
		title : 'Volunteer helping',
		info : 'Volunteer id '+vm.id
	};
	vm.sidebar = {
		content : 'Thank you for your contribution...'
	}
	vm.message ="getting information";
	vm.getData = function() {
		console.log('volunteerDetailCtrl .. getData');
		vm.message ="getting information........";
		volunteerData.volunteerById(vm.id)
		    .then(function successCallback(response) {
				    vm.message = "Volunteers details ";
				    vm.data = { volunteer: response.data };
					},
				  function errorCallback(response) {
					  vm.message ="getting information failed"+response.status;
					  }
			      );

	};
	vm.getData();
}
