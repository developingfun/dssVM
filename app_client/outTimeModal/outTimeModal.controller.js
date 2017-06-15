angular
    .module('volunteerMgmt')
    .controller('outTimeModalCtrl',outTimeModalCtrl);

outTimeModalCtrl.$inject = ['$uibModalInstance','volunteerData','vData'];
function outTimeModalCtrl ($uibModalInstance, volunteerData, vData) {
	console.log('outTimeModalCtrl'+vData.volunteerId);
	var vm = this;
	vm.vData = vData;

	vm.modal = {
		cancel : function() {
			$uibModalInstance.dismiss('cancel');
		}
	};
	vm.onSubmit = function() {
		vm.formError = "";
		if (!vm.formData.outTime ) {
			vm.formError = "all fields required ";
			return false;
		} else {
			    console.log(" in submit"+vm.formData);
			    var ret = vm.saveOutTime(vm.vData.volunteerId, vm.vData.activityId ,vm.formData);
		}
	}
	vm.saveOutTime = function(volunteerId ,activityId, data) {
		volunteerData.checkOut(volunteerId, activityId ,{
							outTime : data.outTime,
							childrenAffected : data.childrenAffected
						})
				    .then(function successCallback(response) {
						    vm.formError = "OutTime recorded ";
							$uibModalInstance.close(data);
							$uibModalInstance.dismiss('ok');
						    return true;
						    //vm.data = { volunteer: response.data };
							},
						  function errorCallback(response) {
							  vm.formError ="outTime saving failed"+response.status;
							  return false;
							  }
			      		);

	};
}
