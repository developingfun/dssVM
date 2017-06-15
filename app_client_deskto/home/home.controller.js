angular
    .module('volunteerMgmt')
    .controller('homeCtrl',homeCtrl);
homeCtrl.$inject = ['$location','$scope','$window','volunteerData','eventData','$uibModal'];
function homeCtrl ($location,$scope,$window,volunteerData,eventData,$uibModal) {
	console.log('homeCtrl');
	var vm = this;

	vm.volunteerId = $window.sessionStorage.getItem("volunteerId");;
	if (!vm.volunteerId) {
		console.log('error : redirect to nothing');
	}
	$scope.oneAtATime = true;

	vm.pageHeader = {
		title : 'Ready to contribute ..',
		info : 'Events scheduled'
	};
	vm.notifications = [
		{messageText : "events for next month loaded"},
		{messageText : "you are invited for annual event on 09 July"},
		{messageText : "Thank you for volunteering on 03 june"},
		{messageText : "Survey going on .."}
		];
	vm.sidebar = {
		content : 'Thank you for your contribution'
	}
	$scope.$watchCollection(
		angular.bind(vm,
					 function() {return vm.interestedActivities ?  vm.interestedActivities.interestedActivities:null;}
					 ),
		function(newArray) {if (newArray) {console.log(' message changed to'+newArray.length)}}
	);
	$scope.$watchCollection(
		angular.bind(vm,
					function() { return vm.events ? vm.events.events:null;}
					),
		function(newArray) {if (newArray) {console.log(' message changed to'+newArray.length)}}
	);
	$scope.$watchCollection(
		angular.bind(vm,
					 function() { return vm.assignedActivities? vm.assignedActivities.assignedActivities:null;}
					 ),
		function(newArray) {if (newArray) {console.log(' message changed to'+newArray.length)}}
	);

	vm.message ="getting information";
    vm.setHeadings = function(whichHeading) {
		if (( whichHeading == 0 ) || (whichHeading == 1)) {
			if ( ! vm.events.events instanceof Array) {
				vm.eventMessage = "No events";
			} else {
				console.log(" in setHeadings .. with 0/3 "+vm.events.events.length);
				if ( vm.events.events.length == undefined || vm.events.events.length == 0  ){
					vm.eventMessage = "No events";
				} else {
					vm.eventMessage = "Activities in near future";
				}
			}
		}
		if (( whichHeading == 0 ) || (whichHeading == 2)) {
			if ( ! vm.interestedActivities.interestedActivities instanceof Array) {
				vm.activityInterestedMessage = "Interest not shown in any activity";
			} else {
				console.log(" in setHeadings .. with 0/3 "+vm.interestedActivities.interestedActivities.length);
				if ( vm.interestedActivities.interestedActivities.length == undefined  || vm.interestedActivities.interestedActivities.length == 0 ){
					vm.activityInterestedMessage = "Interest not shown in any activity";
				} else {
					vm.activityInterestedMessage = "Activities you have shown interest";
				}
			}
		}
		if (( whichHeading == 0 ) || (whichHeading == 3)) {
			if ( ! vm.assignedActivities.assignedActivities instanceof Array) {
				vm.activityAssignedMessage = "No events";
			} else {
				console.log(" in setHeadings .. with 0/3 "+vm.assignedActivities.assignedActivities.length);
				if ( vm.assignedActivities.assignedActivities.length == undefined || vm.assignedActivities.assignedActivities.length == 0 ){
					vm.activityAssignedMessage = "Activities not commited";
				} else {
					vm.activityAssignedMessage = "Activities you are commited to";
				}
			}
		}
	}
	vm.getData = function() {
		console.log('** homeCtrl');
		vm.activityAssignedMessage ="getting information........";
		vm.activityInterestedMessage ="getting information........";
		vm.eventMessage ="getting information........";
		eventData.events()
			.then(
				function successCallback(response) {
					vm.events = { events: response.data };
					console.log("events loaded ... load activities");
					vm.setHeadings(1);
					volunteerData.volunteerActivitiesInterested(vm.volunteerId)
							.then(function successCallback(response1) {
										console.log("success volunteerActivitiesInterested");
										vm.interestedActivities = { interestedActivities: response1.data };
										vm.setHeadings(2);
										console.log("filter events");
								    	angular.forEach(vm.interestedActivities.interestedActivities, function(activity){
									                     console.log(activity.eventId);
									                     var index = vm.events.events.getIndexBy("_id", activity.eventId);
														 var event = vm.events.events.splice(index,1);
									                     console.log(" event "+event._id+"removed from event array");
               							});
								   },
								   function errorCallback(response1) {
									  console.log("error volunteerActivitiesInterested");
									  vm.message = vm.message + "interestedActivities fetch failed"+response1.status;
									  vm.activityInterestedMessage = "error loading activities";
									}
			     			);
			     	volunteerData.volunteerActivitiesAssigned(vm.volunteerId)
							.then(function successCallback(response2) {
									vm.assignedActivities = { assignedActivities: response2.data };
									vm.setHeadings(3);
								    console.log("filter events");
									angular.forEach(vm.assignedActivities.assignedActivities, function(activity){
												       console.log(activity._id+ " inTime #"+activity.inTime+"#");
									                   var index = vm.events.events.getIndexBy("_id", activity.eventId);
													   var event = vm.events.events.splice(index,1);
									                   console.log(" event "+event._id+"removed from event array");

													});
								  },
								  function errorCallback(response2) {
									  console.log("error volunteerActivitiesAssigned");
									  vm.message = vm.message + "assignedActivities fetch  failed"+response2.status;
									  vm.activityInterestedMessage = "error loading activities";
								  }
							);
					},
					function errorCallback(response) {
							vm.message = vm.message +"event fetch  failed"+response.status;
							vm.eventMessage = "error loading events";
					}
			     );



	};
	vm.showInterest = function(volunteerId,eventId) {
			console.log("volunteerId "+volunteerId+" eventId "+eventId);
			volunteerData.showInterestInEvent(volunteerId,eventId)
					.then(function successCallback(response) {
						var index = vm.events.events.getIndexBy("_id", eventId);
						var activity = vm.events.events.splice(index,1);
						console.log(activity);
						var newActivity = { _id: response.data.id,
											eventId: eventId ,
											date: activity[0].date ,
											startTime: activity[0].startTime ,
											area:activity[0].area,
											coOrdinator: activity[0].coOrdinator,
											coOrdinatorPhone: activity[0].coOrdinatorPhone,
											activity: activity[0].activity,
											inTime : '',
											outTime : '',
											childrenAffected : 0
										};
						if ( ! vm.interestedActivities.interestedActivities instanceof Array) {
							vm.interestedActivities.interestedActivities.push(newActivity);
						} else	{
							vm.interestedActivities.interestedActivities = [newActivity];
						}
						vm.setHeadings(0);
					},
					function errorCallback(response) {
						vm.message = vm.message + "interestedActivities insert failed"+response.status;
					}
			     );
	}
	vm.revertInterest = function(volunteerId,eventId) {
				volunteerData.revertInterestInEvent(volunteerId,eventId)
						.then(function successCallback(response) {
							var index = vm.interestedActivities.interestedActivities.getIndexBy("eventId", eventId);
							var activity = vm.interestedActivities.interestedActivities.splice(index,1);
							var newActivity = { _id: activity.eventId,
												date: activity[0].date ,
												startTime: activity[0].startTime ,
												area:activity[0].area,
												coOrdinatorPhone: activity[0].coOrdinatorPhone,
												coOrdinator: activity[0].coOrdinator,
												activity: activity[0].activity

											};
							if ( ! vm.events.events instanceof Array) {
								vm.events.events = [newActivity];
							} else {
								vm.events.events.push(newActivity);
							}
							vm.setHeadings(0);
						},
						function errorCallback(response) {
							vm.message = vm.message + "interestedActivities remove failed"+response.status;
						}
				     );
	}
	vm.confirmAttendence = function(volunteerId,eventId) {
				console.log("volunteerId "+volunteerId+" eventId "+eventId);
				volunteerData.confirmAttendence(volunteerId,eventId)
						.then(function successCallback(response) {
							var index = vm.interestedActivities.interestedActivities.getIndexBy("eventId", eventId);
							var activity = vm.interestedActivities.interestedActivities.splice(index,1);
							console.log(activity);
							var newActivity =  { _id: activity[0]._id,
													eventId: activity[0].eventId ,
													date: activity[0].date ,
													startTime: activity[0].startTime ,
													area:activity[0].area,
													coOrdinator: activity[0].coOrdinator,
													coOrdinatorPhone: activity[0].coOrdinatorPhone,
													activity: activity[0].activity,
													inTime : '',
													outTime : '',
													childrenAffected : 0
												};
							console.log(" tye 1 "+typeof(vm.assignedActivities));
							console.log(" tye 2"+typeof(vm.assignedActivities.assignedActivities));
							if ( vm.assignedActivities.assignedActivities instanceof Array) {
								vm.assignedActivities.assignedActivities = [newActivity];
							} else {
								vm.assignedActivities.assignedActivities.push(newActivity);
							}
							vm.setHeadings(0);
						},
						function errorCallback(response) {
							vm.message = vm.message + "confirmAttendence update failed"+response.status;
						}
				     );
	}
	vm.popupCheckIn = function(id,activityId) {
		var index = vm.assignedActivities.assignedActivities.getIndexBy("_id", activityId);
		var activity = vm.assignedActivities.assignedActivities[index];
			var modalInstance = $uibModal.open({
				templateUrl: '/inTimeModal/inTimeModal.view.html',
				controller: 'inTimeModalCtrl as vm',
				resolve : {
					vData : function() {
						return {
							volunteerId : id,
							activityId : activityId,
							area : activity.area,
							eDate : activity.date,
							startTime : activity.startTime,
							activity : activity.activity
						};
					}
				}
			});
			modalInstance.result.then(function(parameter) {
				activity.inTime = parameter.inTime;
			    console.log(parameter); // logs 'testParameter'
			});
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
