angular
	.module('volunteerMgmt')
	.filter('subsetArray',subsetArray);

function subsetArray () {
	return function(input, currentPage,pageSize) {
	       	if ( input )return input.slice((currentPage-1)*pageSize,(currentPage*pageSize));
	};
}
