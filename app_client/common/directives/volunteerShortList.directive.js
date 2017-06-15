angular
	.module('volunteerMgmt')
	.directive('volunteerShortList',volunteerShortList);

function volunteerShortList () {
	return {
		restrict: 'EA',
		scope : {
			thisPhone : '=phone',
			thisName : '=name'
		},
		templateUrl: '/common/directives/volunteerShortList.template.html'
	};
}
