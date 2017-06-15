angular
    .module('volunteerMgmt')
    .controller('activityLogCtrl',activityLogCtrl);


activityLogCtrl.$inject = ['volunteerData','$uibModal'];
function activityLogCtrl ( volunteerData, $uibModal) {
	console.log('activityLogCtrl .. define');
	var vm = this;

	vm.pageHeader = {
		title : 'Activities ... ',
		info : 'Volunteers helping'
	};
	vm.volunteerId = $window.sessionStorage.getItem("volunteerId");;
	if (!vm.volunteerId) {
			console.log('error : redirect to nothing');
	}

	vm.message ="getting information";
	vm.currentPage = 1;
    vm.itemsPerPage = 2;
	vm.getData = function() {
		console.log('activityLogCtrl .. getData');
		vm.message ="getting information........";
			volunteerData.volunteerActivities(vm.volunteerId)
			    .then(function successCallback(response) {
					    vm.message = response.data.length > 0 ? "Activities " : "No activities you are commited to ...";
					    // for each object in vm.data set class deending on date
						var today = new Date();
						angular.forEach(response.data, function(activity){
								var tDate = new Date(activity.date);

								console.log(activity._id+" - "+tDate+"  "+today+ " status "+activity.status);
								if ( activity.status == "Atteded" ) activity.class = "attended";
								if ( activity.status == "Assigned" && activity.inTime != "") {
									activity.class = "not-finished";
									if ( tDate < today ) {
										activity.class = "action-required";
									}
								}
								if ( activity.status == "Assigned" && activity.inTime == "" ) {
									activity.class = "assigned";
									if ( tDate < today ) {
										activity.class = "skipped";
									}
								}
								if ( activity.status == "Interested" ) {
									activity.class = "interested";
									if ( tDate < today ) {
										activity.class = "skipped";
									}
								}
							 	console.log(activity._id+" - "+activity.class);
							});
							vm.data = { activities: response.data };
							vm.totalItems = vm.data.activities.length;
							console.log(vm.totalItems+" - "+vm.currentPage+" - "+vm.itemsPerPage);
						} ,function errorCallback(response) {
						 	 vm.message ="getting activities information failed"+response.status;
						});

	};

	vm.showEventDetails = function(id) {
			var modalInstance = $uibModal.open({
					templateUrl: '/event/eventDetail.view.html',
					controller: 'eventDetailCtrl as vm',
					resolve : {
						eData : function() {
									return {
										eventId : id
									};
								}
							}
				});
	}
	vm.getData();
}
