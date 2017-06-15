angular
    .module('volunteerMgmt')
    .controller('inTimeModalCtrl',inTimeModalCtrl);

inTimeModalCtrl.$inject = ['$uibModalInstance','volunteerData','vData'];
function inTimeModalCtrl ($uibModalInstance, volunteerData, vData) {
	console.log('inTimeModalCtrl'+vData.volunteerId);
	var vm = this;
	vm.vData = vData;

	vm.modal = {
		cancel : function() {
			$uibModalInstance.dismiss('cancel');
		}
	};
	vm.onSubmit = function() {
		vm.formError = "";
		if (!vm.formData.inTime ) {
			vm.formError = "all fields required ";
			return false;
		} else {
			    console.log(vm.formData);
			    var ret = vm.saveInTime(vm.vData.volunteerId, vm.vData.activityId ,vm.formData);
		}
	}
	vm.saveInTime = function(volunteerId ,activityId, data) {
		volunteerData.checkIn(volunteerId, activityId ,{
							inTime : data.inTime
						})
				    .then(function successCallback(response) {
						    vm.formError = "InTime recorded ";
						    $uibModalInstance.close(data);
							$uibModalInstance.dismiss('ok');
						    return true;
						    //vm.data = { volunteer: response.data };
							},
						  function errorCallback(response) {
							  vm.formError ="inTime saving failed"+response.status;
							  return false;
							  }
			      		);

	};
}
