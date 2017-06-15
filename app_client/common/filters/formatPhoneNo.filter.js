angular
	.module('volunteerMgmt')
	.filter('formatPhoneNo',formatPhoneNo);

function formatPhoneNo () {
	return function(phoneNo) {
		if (typeof(phoneNo) == 'undefined' || phoneNo == null || phoneNo.length == 0 )
		{
			return "?";
		}
		if ( phoneNo.length > 3 )
		{
			return phoneNo.substr(0,3)+ "-"+phoneNo.substr(3);
		}
		return phoneNo;
	};
}
