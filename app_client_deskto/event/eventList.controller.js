angular
    .module('volunteerMgmt')
    .controller('eventListCtrl',eventListCtrl);


volunteerListCtrl.$inject = ['$scope','eventData','volunteerData','$uibModal'];
function eventListCtrl ($scope, eventData,volunteerData, $uibModal) {
	console.log('eventListCtrl .. define');
	var vm = this;
	$scope.$watchCollection(
			angular.bind(vm,
						 function() {return vm.data ?  vm.data.events:null;}
						 ),
			function(newArray) {if (newArray) {console.log(' message changed to'+newArray.length)}}
	);
	vm.pageHeader = {
		title : 'Volunteer Helper',
		info : 'Volunteers helping'
	};
	vm.volunteerId = $window.sessionStorage.getItem("volunteerId");;
	if (!vm.volunteerId) {
		console.log('error : redirect to nothing');
	}
	//calendarConfig.dateFormatter = '$moment';
	vm.sidebar = {
		content : 'Thank you for your contribution...'
	}
	vm.message ="getting information";
	vm.getData = function() {
		console.log('volunteerListCtrl .. getData');
		vm.message ="getting information........";
			eventData.events()
			    .then(function successCallback(response) {
					    vm.message = response.data.length > 0 ? "Events" : "Please import events ...";
					    // for each object in vm.data set class deending on date

					    volunteerData.volunteerActivitiesShort(vm.volunteerId)
					    .then(function successCallback(response1) {
							activities = { activities : response1.data};
							var today = new Date();
							angular.forEach(response.data, function(event){
								 var tDate = new Date(event.date);
								 console.log(event._id+" - "+tDate+"  "+today);
								 var index = activities.activities.getIndexBy("eventId", event._id);
								 if ( index != -1 ) {
									activity = activities.activities[index];
									if ( activity.status == "Atteded" ) event.class = "attended";
									if ( activity.status == "Assigned" && activity.inTime != "") {
										event.class = "not-finished";
										if ( tDate < today ) {
											event.class = "action-required";
										}
									}
									if ( activity.status == "Assigned" && activity.inTime == "" ) {
										event.class = "assigned";
										if ( tDate < today ) {
											event.class = "skipped";
										}
									}
									if ( activity.status == "Interested" ) {
										event.class = "interested";
										if ( tDate < today ) {
											event.class = "skipped";
										}
									}
								}
							 	else {
									event.class = "present";
									if ( tDate > today ) {
										 event.class = "future";
									}
									if ( tDate < today ) {
										 event.class = "past";
									}
							 	}
							 	console.log(event._id+" - "+event.class);
							});
							vm.data = { events: response.data };
						} ,function errorCallback(response) {
						 	 vm.message ="getting activities information failed"+response.status;
						 	 var today = new Date();
							 angular.forEach(response.data, function(event){
							 								 var tDate = new Date(event.date);
							 								 console.log(event._id+" - "+tDate+"  "+today);
															event.class = "present";
															if ( tDate > today ) {
																 event.class = "future";
																}
															if ( tDate < today ) {
																 event.class = "past";
															}
							 								console.log(event._id+" - "+event.class);
														});
							vm.data = { events: response.data };
						});


						},
					  function errorCallback(response) {
						  vm.message ="getting information failed"+response.status;
						  }
				      );

	};
	vm.import = function() {
		eventData.importEvent()
			.then(function successCallback(response) {
					vm.getData();
				},
			   function errorCallback(response) {
					 vm.message ="getting information failed"+response.status;
				}
			);
		alert(' import');
	}
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
