angular
    .module('volunteerMgmt')
    .controller('aboutCtrl',aboutCtrl);

function aboutCtrl () {
	console.log('aboutCtrl');
	var vm = this;
	vm.pageHeader = {
		title : 'Volunteer Helper',
		info : 'About app'
	};
	vm.main = {
		content : 'Thank you for your contribution'
	}
}
