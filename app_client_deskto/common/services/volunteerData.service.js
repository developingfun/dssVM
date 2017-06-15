angular
	.module('volunteerMgmt')
	.service('volunteerData',volunteerData);

function volunteerData ($http) {
	var volunteersRegistered = function() {
		return $http.get('/api/volunteers/count');
	};
	var volunteersFindFirst = function() {
		return $http.get('/api/volunteers/findFirst');
	};
	var volunteers = function() {
		return $http.get('/api/volunteers');
	};
	var volunteerById = function(id) {
		return $http.get('/api/volunteers/'+id);
	};
	var registerVolunteer = function(info) {
		return $http.post('/api/volunteers',info);
	};
	var addRemark = function(id, remark ) {
		return $http.post('/api/volunteers/'+id+'/remark',remark);
	};
	var showInterestInEvent = function(id, eventId ) {
			return $http.post('/api/volunteer/'+id+'/showInterest/'+eventId);
	};
	var revertInterestInEvent = function(id, eventId ) {
			return $http.post('/api/volunteer/'+id+'/revertInterest/'+eventId);
	};
	var confirmAttendence = function(id, eventId ) {
		return $http.post('/api/volunteer/'+id+'/confirmAttendence/'+eventId);
	};
	var checkIn = function(id, activityId, inTime ) {
			return $http.post('/api/volunteer/'+id+'/inTime/'+activityId,inTime);
	};
	var volunteerActivitiesAssigned = function(id) {
			return $http.get('/api/volunteers/'+id+'/activity/Assigned');
	};
	var volunteerActivitiesAttended = function(id) {
				return $http.get('/api/volunteers/'+id+'/activity/Attended');
	};
	var volunteerActivitiesInterested = function(id) {
				return $http.get('/api/volunteers/'+id+'/activity/Interested');
	};
	var volunteerActivities = function(id) {
				return $http.get('/api/volunteers/'+id+'/activity/All');
	};
	var volunteerActivitiesShort = function(id) {
			return $http.get('/api/volunteers/'+id+'/activity');
	};
	return {
		volunteers : volunteers ,
		volunteerById : volunteerById,
		addRemark : addRemark,
		volunteerActivitiesAssigned : volunteerActivitiesAssigned,
		volunteerActivitiesAttended : volunteerActivitiesAttended,
		volunteerActivitiesInterested : volunteerActivitiesInterested,
		showInterestInEvent : showInterestInEvent,
		revertInterestInEvent : revertInterestInEvent,
		confirmAttendence : confirmAttendence,
		volunteersFindFirst : volunteersFindFirst,
		registerVolunteer : registerVolunteer,
		checkIn : checkIn,
		volunteerActivitiesShort : volunteerActivitiesShort,
		volunteerActivities : volunteerActivities
	};
}
