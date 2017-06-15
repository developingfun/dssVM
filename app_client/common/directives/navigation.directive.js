angular
	.module('volunteerMgmt')
	.directive('navigation',navigation);

function navigation () {
	return {
		restrict: 'EA',
		scope : {
			id : '@'
		},
		templateUrl: '/common/directives/navigation.template.html'
	};
}
