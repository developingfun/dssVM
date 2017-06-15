angular
    .module('volunteerMgmt')
    .controller('volunteerListCtrl',volunteerListCtrl);

volunteerListCtrl.$inject = ['$uibModal','volunteerData'];
function volunteerListCtrl ( $uibModal, volunteerData) {
	console.log('volunteerListCtrl .. define');
	var vm = this;
	vm.pageHeader = {
		title : 'Volunteer Helper',
		info : 'Volunteers helping'
	};
	vm.sidebar = {
		content : 'Thank you for your contribution...'
	}
	vm.message ="getting information";
	vm.getData = function() {
		console.log('volunteerListCtrl .. getData');
		vm.message ="getting information........";
		volunteerData.volunteers()
		    .then(function successCallback(response) {
				    vm.message = response.data.length > 0 ? "Volunteers" : "No volunteers";
				    vm.data = { volunteers: response.data };
					},
				  function errorCallback(response) {
					  vm.message ="getting information failed"+response.status;
					  }
			      );

	};
	vm.popupRemarkForm = function(id) {
		var modalInstance = $uibModal.open({
			templateUrl: '/remarkModal/remarkModal.view.html',
			controller: 'remarkModalCtrl as vm',
			resolve : {
				vData : function() {
					return {
						volunteerId : id
					};
				}
			}
		});
		alert(' add remark'+id);
	}
	//href="/volunteer/{{volunteer._id}}/addRemark"
	vm.getData();
}
