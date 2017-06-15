angular
	.module('volunteerMgmt')
	.directive('footerDss',footerDss);

function footerDss () {
	return {
		restrict: 'EA',
		templateUrl: '/common/directives/footerDss.template.html'
	};
}
