angular
	.module('volunteerMgmt')
	.directive('pageHeader',pageHeader);

pageHeader.$inject = ['notificationData','$window'];
function pageHeader(notificationData,$window) {
	return {
		restrict: 'EA',
		scope: false,
		link: function(scope, elem, attr) {
			volunteerId = $window.sessionStorage.getItem("volunteerId");;
			notificationData.notifications(volunteerId)
				.then(
						function successCallback(response) {
							scope.notifications = { notifications: response.data };
							console.log(scope.notifications);
						},
					    function errorCallback(response1) {
							scope.notifications = [
									{messageText : "Not able to get notices ... sorry"}

								];
						}
					);
			},
		templateUrl: '/common/directives/pageHeader.template.html'
	};
}
