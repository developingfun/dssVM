angular
	.module('volunteerMgmt')
	.directive('navigation',navigation);

function navigation () {
	return {
		restrict: 'EA',
		templateUrl: '/common/directives/navigation.template.html'
	};
}
