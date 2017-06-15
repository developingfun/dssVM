angular
	.module('volunteerMgmt')
	.directive('pageHeader',pageHeader);

function pageHeader() {
	return {
		restrict: 'EA',
		scope : {
			content : '=content'
		},
		templateUrl: '/common/directives/pageHeader.template.html'
	};
}
