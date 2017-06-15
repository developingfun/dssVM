angular
    .module('volunteerMgmt')
    .controller('remarkModalCtrl',remarkModalCtrl);

remarkModalCtrl.$inject = ['$uibModalInstance','volunteerData','vData'];
function remarkModalCtrl ($uibModalInstance, volunteerData, vData) {
	console.log('remarkModalCtrl'+vData.volunteerId);
	var vm = this;
	vm.vData = vData;

	vm.modal = {
		cancel : function() {
			$uibModalInstance.dismiss('cancel');
		}
	};
	vm.onSubmit = function() {
		vm.formError = "";
		if (!vm.formData.date ||  !vm.formData.dssStaff || !vm.formData.remarks ) {
			vm.formError = "all fields required ";
			return false;
		} else {
			    console.log(vm.formData);
			    vm.addRemark(vm.vData.volunteerId, vm.formData);
				return false;
		}
	}
	vm.addRemark = function(volunteerId , data) {
		volunteerData.addRemark(volunteerId, {
							date : new Date(data.date) ,
							dssStaff : data.dssStaff ,
							remarks : data.remarks
						})
				    .then(function successCallback(response) {
						    vm.formError = "Remark added ";
						    //vm.data = { volunteer: response.data };
							},
						  function errorCallback(response) {
							  vm.formError ="remark saving failed"+response.status;
							  }
			      		);
		return false;
	};
}
