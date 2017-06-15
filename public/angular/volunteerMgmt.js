angular.module('volunteerMgmt',[]);
var volunteerListCtrl = function($scope, volunteerData ) {
	console.log("loading");
	$scope.message = "Loading ..";
	volunteerData.then(
	        function(response) {
	 		      console.log("success"+response.data);
			      $scope.data = {  volunteers: response.data
				 				};
			     $scope.message = "";
			},
			function(response) {
				$scope.message = "something went wrong";
				console.log("error");
			});
};
var volunteerDataHC = function() {
	return [ {
			              name : 'Ketan',
			              address: 'aurangabad',
			              status: '1',
			              emailId: 'ketaur@gmail.com',
			              phone: '8800000010',
			              skills: ['skill1','skill2'],
			              lastContributed: 21/04/2017
					   },
					   {
						   name : 'Kirti',
						   address: 'shirur',
						   status: '0',
						   emailId: 'kirtik@gmail.com',
						   phone: '8800000020',
						   skills: ['skill1','skill2'],
			               lastContributed: 21/04/2015
					   }
					 ];
};
var volunteerData = function($http) {
	console.log(' volunteerData function called to load data' );
	return $http.get('/api/volunteers');
};

var user = function() {
	return {
		scope: {
			activeUser : '=status'
		},
		templateUrl :  '/angular/userStatus.html'

	};
};
var formatPhoneNo = function() {
	return function (phoneNo) {
		return phoneNo.substring(0,3)+"-"+phoneNo.substring(4);
	};
};

angular
   .module('volunteerMgmt')
   .controller('volunteerListCtrl',volunteerListCtrl)

   .directive('user',user)
   .service('volunteerData',volunteerData);