angular
    .module('volunteerMgmt')
    .controller('registerVolunteerCtrl',registerVolunteerCtrl);

registerVolunteerCtrl.$inject = ['$location','$window','volunteerData'];
function registerVolunteerCtrl ($location, $window, volunteerData) {
	console.log('registerVolunteerCtrl .. define');
	var vm = this;
	vm.pageHeader = {
		title : 'Volunteer helping',
		info : 'Volunteer id '+vm.id
	};
	vm.sidebar = {
		content : 'Thank you for your contribution...'
	}
	vm.message ="getting information";
	vm.getData = function() {
		console.log('registerVolunteerCtrl .. getVolunteer');
		vm.message ="getting information........";
		// if not found ..
		// if found ...
		volunteerData.volunteersFindFirst()
		    .then(function successCallback(response) {
				    vm.message = "redirect to home";
				    console.log('volunteer found'+response.data._id);
				    $window.sessionStorage.setItem("volunteerId",response.data._id);
				    $location.url('/home');

					},
				  function errorCallback(response) {
					  vm.message ="register .. first time visit "+response.status;
					  }
			      );

	};
	vm.onSubmit = function() {
		console.log("registerVolunteerController ... onSubmit");
		vm.formError = "";
		if (!vm.formData.name ||  !vm.formData.phone || !vm.formData.emailId ) {
				console.log("registerVolunteerController ... required information not provided");
				vm.message = "all fields required ";
				return false;
			} else {
				    console.log("registerVolunteerController ... submitted data  "+vm.formData);
				    vm.addVolunteer(vm.formData);
					return true;
			}
		}
	vm.addVolunteer = function(data) {
			volunteerData.registerVolunteer({
								name : data.name ,
								address : data.address ,
								phone : data.phone,
								emailId : data.emailId

							})
					    .then(function successCallback(response) {
							    // redirect to home
							    console.log('volunteer added'+response._id);
							    $window.sessionStorage.setItem("volunteerId",response._id);
				    			$location.url('/home');
							},
							  function errorCallback(response) {
								  vm.formError ="remark saving failed"+response.status;
							  }
				      		);
	};
	vm.getData();
}
