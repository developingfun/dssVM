Array.prototype.getIndexBy = function (name, value) {
    for (var i = 0; i < this.length; i++) {
        if (this[i][name] == value) {
            return i;
        }
    }
    return -1;
}
angular.module('volunteerMgmt',['ngRoute','ui.bootstrap']);
function config ($routeProvider,$locationProvider) {
	$routeProvider
		.when('/', {
			  	templateUrl : 'register/registerVolunteer.view.html',
			  	controller: 'registerVolunteerCtrl',
			  	controllerAs: 'vm'
	      })
 		.when('/home', {
		  	templateUrl : 'home/home.view.html',
		  	controller: 'homeCtrl',
		  	controllerAs: 'vm'

	      })
	    .when('/volunteer/:id', {
		      templateUrl : 'volunteer/volunteerDetail.view.html',
			  controller: 'volunteerDetailCtrl',
			  controllerAs: 'vm'
			})
		.when('/event', {
			  templateUrl: 'event/eventList.view.html',
			  controller: 'eventListCtrl',
			  controllerAs: 'vm'
		  })
		.when('/import', {
			  templateUrl: 'import/import.view.html',
			  controller: 'importCtrl',
			  controllerAs: 'vm'
		  })
		.when('/activityLog', {
			  templateUrl: 'activityLog/activityLog.view.html',
			  controller: 'activityLogCtrl',
			  controllerAs: 'vm'
		  })
	      .otherwise({redirectTo: '/'});


}
angular
    .module('volunteerMgmt').run([
  '$rootScope',
  function($rootScope) {
    // see what's going on when the route tries to change
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
      // next is an object that is the route that we are starting to go to
      // current is an object that is the route where we are currently
      var currentPath = current ? current.originalPath : "NA";
      var nextPath = next.originalPath;

      console.log('Starting to leave %s to go to %s', currentPath, nextPath);
    });
  }
]);
angular
    .module('volunteerMgmt')
    .config(['$routeProvider','$locationProvider',config]);
