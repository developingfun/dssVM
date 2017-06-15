var request = require('request');
var apiOptions = {
	server : "http://localhost:3000"
};
var renderVolunteerList = function(req,res,apiResponse) {

	var message;
	/*
	if(!(apiResponse instanceof Array)) {
		message = "lookup error";
		apiResponse = [];
    } else {
		if ( !apiResponse.length ) {
			message = "No volunteers";
		}
	}
    */
	res.render('volunteer-list', {
		title: 'Volunteers' ,
	    pageHeader : {
	 	   title : 'Volunteers',
		   info : 'volunteers basic information'
	    },
	    /*volunteers : apiResponse,*/
	    message : message
	});
};
module.exports.list = function (req,res) {
	/*
	var requestOptions, path;
	path = '/api/volunteers';
	requestOptions = {
		url : apiOptions.server + path,
		method : "GET",
		json : {},
		qs : {}
	};
	request(requestOptions,
	        function(err,response,body) {

				renderVolunteerList(req,res,body);
			}
	);*/
			renderVolunteerList(req,res,"");
};
var renderVolunteerDetails = function(req,res,apiResponse) {

	res.render('volunteer-detail', {
		title: 'Volunteers' ,
	    pageHeader : {
	 	   title : 'Volunteers',
		   info : 'volunteers basic information'
	    },
	    volunteer : apiResponse

	});
};


module.exports.info = function (req,res) {
	var requestOptions, path;
		path = '/api/volunteers/' + req.params.phoneNo;
		requestOptions = {
			url : apiOptions.server + path,
			method : "GET",
			json : {}
		};
		request(requestOptions,
		        function(err,response,body) {
					renderVolunteerDetails(req,res,body);
				}
		);

};

var renderVolunteerForm = function(req,res,apiResponse) {
	res.render('volunteer-new', { title: 'Add Volunteer' });
}
// show form
module.exports.new = function (req,res) {
	renderVolunteerForm(req,res);
};
// add to database
module.exports.add = function (req,res) {
	var requestOptions, path;
	path = '/api/volunteers/' ;
	console.log(req.body.prefActivity);
	postdata = {
		name: req.body.name,
		address: req.body.address,
		emailId: req.body.emailId,
		phone: req.body.phone,
		occupation: req.body.occupation,
		orientationDate: req.body.orientationDate,
		prefActivity: req.body.prefActivity,
		prefDays: req.body.prefDays,
		prefArea: req.body.prefArea,
		skills: req.body.skill,
		remarks:[{date: req.body.remDate1,
		          dssStaff: req.body.remStaff1,
		          remark: 'created'
				  }]
	};
	requestOptions = {
		url : apiOptions.server + path,
		method : "POST",
		json : postdata
	};
	request(requestOptions,
	       function(err,response,body) {
			   if (response.statusCode === 201) {
				   res.redirect('/volunteer');
			   }
			   else
			   {
				   res.render('generic-text',{
					   title : 'error adding',
					   content : err
				   });
				}
			}
	);

};

var renderVolunteerRemarkForm = function(req,res,apiResponse) {
	res.render('volunteer-remark', { title: 'Add Volunteer' , id: req.params.id, url: req.originalUrl});
}
// add to database
module.exports.addRemark = function (req,res) {
	var requestOptions, path;
	path = '/api/volunteers/' +req.body.id + '/remark';
	console.log("** app_server/volunteer: call addRemark" + req.body.id);
	postdata = {
		id: req.body.id,
		date: req.body.date,
		dssStaff: req.body.dssStaff,
		remarks: req.body.remarks
	};
	requestOptions = {
		url : apiOptions.server + path,
		method : "POST",
		json : postdata
	};
	request(requestOptions,
	       function(err,response,body) {
			   if (response.statusCode === 201) {
				   console.log("** app_server/volunteer: addRemark staus 201" );
				   res.redirect('/volunteer');
			   }
			   else
			   {
				   res.render('generic-text',{
					   title : 'error adding',
					   content : err
				   });
				}
			}
	);

};

// show form
module.exports.newRemark = function (req,res) {
	renderVolunteerRemarkForm(req,res);
};

// show form
module.exports.newActivity = function (req,res) {
	renderVolunteerForm(req,res);
};

// show form
module.exports.newFeedback = function (req,res) {
	renderVolunteerForm(req,res);
};

// delete from database
module.exports.delete = function (req,res) {
	var requestOptions, path;
	path = '/api/volunteers/' ;
	console.log(req.params.id);

	var requestOptions, path;
	path = '/api/volunteers/' + req.params.id;

	requestOptions = {
		url : apiOptions.server + path,
		method : "DELETE",
		json : {}
	};
	request(requestOptions,
	       function(err,response,body) {
			   if (response.statusCode === 201) {
				   res.redirect('/volunteer');
			   }
			   else
			   {
				   res.render('generic-text',{
					   title : 'error adding',
					   content : err
				   });
				}
			}
	);

};
