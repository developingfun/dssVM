angular
	.module('volunteerMgmt')
	.service('notificationData',notificationData);

function notificationData ($http) {
	var notifications = function(id) {
		return $http.get('/api/notices/'+id);
	};
	var importNotice = function() {
			console.log('notificationDataService importEvent');
			return $http.get('/api/notice/import');
	};
	return {
		notifications : notifications,
		importNotice : importNotice
	};
}
