angular
	.module('volunteerMgmt')
	.service('eventData',eventData);

function eventData ($http) {
	var events = function() {
		console.log('eventDataService events');
		return $http.get('/api/events');
	};
	var eventById = function(id) {
		return $http.get('/api/events/'+id);
	};
	var importEvent = function() {
		console.log('eventDataService importEvent');
		return $http.get('/api/event/import');
	};
	return {
		events : events ,
		eventById : eventById,
		importEvent : importEvent
	};
}
