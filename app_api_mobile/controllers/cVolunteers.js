var mongoose = require('mongoose');
var moment = require('moment');
var Volunteer = mongoose.model('Volunteer');
var cEvent = require('./cEvents');

var sendJsonResponse = function(res, status, content) {
	  res.status(status);
	  res.json(content);
  };
module.exports.volunteerCreate = function (req,res) {
	Volunteer.create({
		name: req.body.name,
		address: req.body.address,
		emailId: req.body.emailId,
		phone: req.body.phone


		  }, function(err, volunteer) {
			  if(err) {
				 sendJsonResponse(res, 400, err);
			 }
			 else {
				 sendJsonResponse(res, 201, volunteer);
			 }
		  });


};
module.exports.volunteersRegistered = function (req,res) {
	console.log("volunteersRegistered");
	Volunteer
			.count({}, function( err, count){
					if ( err ) {
						sendJsonResponse(res, 404, err);
						return;
					}
					sendJsonResponse(res, 200, {"count" : count});
				});
};
module.exports.volunteerFindFirst = function (req,res) {
	console.log("volunteersRegistered");
	Volunteer
			   .findOne({})
			   .exec(function(err, volunteer) {
				   if (err) {
				   	   sendJsonResponse(res, 404, err);
				   	   return;
				   } else if ( !volunteer ) {
					   sendJsonResponse(res, 404, {"message":"no volunteer defined"});
					   return;
				   }
				   sendJsonResponse(res, 200, volunteer);
				   return;
			   });
}
module.exports.volunteerList = function (req,res) {
	console.log("volunteerList");
	Volunteer
		   .find({})
		   .exec(function(err, docs) {
			   if (docs.length > 0 ) {
				   var volunteers = [];
				   docs.forEach(function(doc) {
					   volunteers.push({ _id: doc.id, name: doc.name ,address:doc.address, status: "1", skills:doc.skills, lastContributed: doc.orientationDate, phone: doc.phone});
				   });
				   sendJsonResponse(res, 200, volunteers);
				   return;
			   } else if (err) {
				   sendJsonResponse(res, 404, err);
				   return;
			   }
			   sendJsonResponse(res, 404, {"message" : "Volunteer EMpty dataset"});
		   });

};
module.exports.volunteerRead = function (req,res) {
	if (req.params && req.params.id ) {
		Volunteer
		   .findById(req.params.id ,
		   			function(err,volunteer) {
						if (err) {
							sendJsonResponse(res, 404, {"message" : "database error"});
						   return;
			   			}
			   			if (!volunteer)	{
							sendJsonResponse(res, 404, {"message" : "user was not found"});
							return;
						}
						sendJsonResponse(res, 200, volunteer);
					}
				);
   } else {
	   sendJsonResponse(res, 404, {"message" : "ID required in request", });
   }
};
module.exports.volunteerUpdate = function (req,res) {
  sendJsonResponse(res, 200, {"status" : "success"});
};
module.exports.volunteerDelete = function (req,res) {
	if (req.params && req.params.id ) {
		Volunteer
		   .findByIdAndRemove(req.params.id ,
		   					function(err,volunteer) {
								if (err) {
								   sendJsonResponse(res, 404, err);
								   return;
		   						}
		   						sendJsonResponse(res, 204, {"status" : "success"});
							});
	      };

}
module.exports.volunteerLogRemark = function (req,res) {
	console.log("** app_api/cVolunteers : call volunteerLogRemark with parameters id=" + req.params.id+ " date = "+req.body.date+" staff "+req.body.dssStaff+" remarks "+req.body.remarks);
	if (req.params && req.params.id ) {
		Volunteer
		   .findById(req.params.id ,
						function(err,volunteer) {
							if (err) {
								console.log("** app_api/cVolunteers: error while finding volunteer ");
								sendJsonResponse(res, 500, {"message" : "database error"});
							   return;
							}
							if (!volunteer)	{
								console.log("** app_api/cVolunteers: olunteer not found ");
								sendJsonResponse(res, 404, {"message" : "user was not found"});
							}else {
								console.log("** app_api/cVolunteers: volunteer found .. push remark");
								volunteer.remarks.push(
									{  date: moment(req.body.date).format('YYYY-MM-DD'),
									   dssStaff: req.body.dssStaff,
									   remark: req.body.remarks
									}
								);
								volunteer.markModified('remarks');
								console.log("** app_api/cVolunteers: remark pushed save volunteer");
								volunteer.save(function(err1,v) {
									if (err1) {
										console.log("** error saving volunteer "+err1);
										sendJsonResponse(res, 500, {"message" : err1});
										return;
									} else {
										console.log("** saved "+v);
									}
								});
								console.log("** app_api/cVolunteers: end function ");
								sendJsonResponse(res, 201, {"message" : "remark saved"});
						}
					}
					);
	   };
}

module.exports.volunteerInterested = function (req,res) {
	console.log("** app_api/cVolunteers : call volunteerInterested");
	if (req.params && req.params.id && req.params.eventId) {
		var forEvent ;
		// get event details
		console.log("** app_api/cVolunteers : read event details"+req.params.eventId);
		cEvent.readEvent(req.params.eventId, function(err,event) {
			if (err) {
				console.log("** app_api/cVolunteers: error while reading event ");
				sendJsonResponse(res, 500, {"message" : "database error"});
				return;
			}
			if ( !event ) {
				console.log("** app_api/cVolunteers: event not found");
				sendJsonResponse(res, 500, {"message" : "event not found"});
				return;
			}
			console.log("** app_api/cVolunteers: event found");
			forEvent = event;

			console.log("** app_api/cVolunteers : interest shown in event "+forEvent.eSite);
			console.log("** app_api/cVolunteers : add activity ");
			// add to volunteer activity
			Volunteer
		   		.findById(req.params.id ,
						function(err,volunteer) {
							if (err) {
								console.log("** app_api/cVolunteers: error while finding volunteer ");
								sendJsonResponse(res, 500, {"message" : "database error"});
							   return;
							}
							if (!volunteer)	{
								console.log("** app_api/cVolunteers: volunteer not found ");
								sendJsonResponse(res, 404, {"message" : "volunteer was not found"});
							}else {
								console.log("** app_api/cVolunteers: volunteer found .. push activity");
								var activity = {
									   _id: mongoose.Types.ObjectId(),
									   date: forEvent.eDate,
									   startTime: forEvent.eStartTime,
									   eventId : forEvent._id,
									   area: forEvent.eArea,
									   coOrdinator: forEvent.eCoordinator,
									   coOrdinatorPhone: forEvent.eCoordinatorPhone,
									   activity : forEvent.eActivity,
									   status: 'Interested',
									   inTime: '',
									   outTime: '',
									   childrenAffected: 0
									}
								volunteer.activities.push(activity);
								volunteer.markModified('activities');
								console.log("** app_api/cVolunteers: activity pushed save volunteer");
								volunteer.save(function(err1,v) {
									if (err1) {
										console.log("** error saving volunteer "+err1);
										sendJsonResponse(res, 500, {"message" : err1});
										return;
									} else {
										console.log("** saved "+v);
									}
								});
								console.log("** app_api/cVolunteers: end function ");
								sendJsonResponse(res, 201, {"id" : activity._id});
						}
					}
					);
	   });
	   };
	console.log("** app_api/cVolunteers : end volunteerInterested");
}
module.exports.volunteerInterestReverted = function (req,res) {
	console.log("** app_api/cVolunteers : call volunteerInterestReverted");
	if (req.params && req.params.id && req.params.activityId) {
			console.log("** app_api/cVolunteers : remove activity "+req.params.activityId);
			// add to volunteer activity
			Volunteer
		   		.findById(req.params.id ,
						function(err,volunteer) {
							if (err) {
								console.log("** app_api/cVolunteers: error while finding volunteer ");
								sendJsonResponse(res, 500, {"message" : "database error"});
							   return;
							}
							if (!volunteer)	{
								console.log("** app_api/cVolunteers: volunteer not found ");
								sendJsonResponse(res, 404, {"message" : "volunteer was not found"});
							}else {
								console.log("** app_api/cVolunteers: volunteer found .. pull activity");
								var activity = volunteer.activities.id(req.params.activityId);
								if ( activity == null ) {
									console.log("** app_api/cVolunteers: activity not found ");
									sendJsonResponse(res, 404, {"message" : "activity details not available"});
									return;
								}
								activity.remove(function(err,act) {
									volunteer.markModified('activities');
									console.log("** app_api/cVolunteers: activity pushed save volunteer");
									volunteer.save(function(err1,v) {
														if (err1) {
															console.log("** error saving volunteer "+err1);
															sendJsonResponse(res, 500, {"message" : err1});
															return;
														} else {
															console.log("** saved "+v);
														}
											});
								});
								console.log("** app_api/cVolunteers: end function ");
								sendJsonResponse(res, 201, {"message" : "activity saved"});
						}
					}
					);

	   };
	console.log("** app_api/cVolunteers : end volunteerInterestReverted");
}

module.exports.volunteerConfirmAttendence = function (req,res) {
	console.log("** app_api/cVolunteers : call volunteerInterested");
	if (req.params && req.params.id && req.params.activityId) {
			console.log("** app_api/cVolunteers : update activity status "+req.params.activityId);
			// add to volunteer activity
			Volunteer
		   		.findById(req.params.id ,
						function(err,volunteer) {
							if (err) {
								console.log("** app_api/cVolunteers: error while finding volunteer ");
								sendJsonResponse(res, 500, {"message" : "database error"});
							   return;
							}
							if (!volunteer)	{
								console.log("** app_api/cVolunteers: volunteer not found ");
								sendJsonResponse(res, 404, {"message" : "volunteer was not found"});
							}else {
								console.log("** app_api/cVolunteers: volunteer found .. pull activity");
								volunteer.activities.id(req.params.activityId).set({'status':'Assigned'});
								volunteer.markModified('activities');
								console.log("** app_api/cVolunteers: activity udated save volunteer");
								volunteer.save(function(err1,v) {
									if (err1) {
										console.log("** error saving volunteer "+err1);
										sendJsonResponse(res, 500, {"message" : err1});
										return;
									} else {
										console.log("** saved "+v);
									}
								});
								console.log("** app_api/cVolunteers: end function ");
								sendJsonResponse(res, 201, {"message" : "activity saved"});
						}
					}
					);

	   };
	console.log("** app_api/cVolunteers : end volunteerInterested");
}

module.exports.volunteerRecordInTime = function (req,res) {
	console.log("** app_api/cVolunteers : call record in time");
	if (req.params && req.params.id && req.params.activityId) {
			console.log("** app_api/cVolunteers : update activity with inTime "+req.params.activityId);
			// add to volunteer activity
			Volunteer
		   		.findById(req.params.id ,
						function(err,volunteer) {
							if (err) {
								console.log("** app_api/cVolunteers: error while finding volunteer ");
								sendJsonResponse(res, 500, {"message" : "database error"});
							   return;
							}
							if (!volunteer)	{
								console.log("** app_api/cVolunteers: volunteer not found ");
								sendJsonResponse(res, 404, {"message" : "volunteer was not found"});
							}else {
								console.log("** app_api/cVolunteers: volunteer found .. pull activity .. udate with "+req.body.inTime);
								volunteer.activities.id(req.params.activityId).set({'inTime':req.body.inTime});
								volunteer.markModified('activities');
								console.log("** app_api/cVolunteers: activity pushed save volunteer");
								volunteer.save(function(err1,v) {
									if (err1) {
										console.log("** error saving volunteer "+err1);
										sendJsonResponse(res, 500, {"message" : err1});
										return;
									} else {
										console.log("** saved "+v);
									}
								});
								console.log("** app_api/cVolunteers: end function ");
								sendJsonResponse(res, 201, {"message" : "activity saved"});
						}
					}
					);

	   };
	console.log("** app_api/cVolunteers : end volunteerInterested");
}

module.exports.volunteerActivityLog = function (req,res) {
	console.log("** app_api/cVolunteers : call volunteerActivityLog");
	if (req.params && req.params.id ) {
		console.log("** app_api/cVolunteers : for voluteer id "+req.params.id);
		if (req.params.status ) {
			console.log("** app_api/cVolunteers : for status "+req.params.status);
			var limit = 0;
			if (req.params.limit ) {
				limit = 0 - req.params.limit;
			}
			console.log("** app_api/cVolunteers : call vVolunteerActivity");
			vVolunteerActivity(req.params.id,req.params.status,limit,res);
			console.log("** app_api/cVolunteers : end");
		}
	}
}

var vVolunteerActivity =  function(volunteerId,status,limit,res) {
	console.log("** app_api/cVolunteers : vVolunteerActivity  start");
	Volunteer
		    .findById(volunteerId)
		    .select('name activities')
		    .exec(function(err, volunteer) {
				console.log("** app_api/cVolunteers : vVolunteerActivity  exec ");
				if ( !volunteer) {
					sendJsonResponse(res, 404, {"message" : "Volunteer not found"});
					return;
				} else if (err) {
					console.log("** app_api/cVolunteers : vVolunteerActivity  error  "+err);
					sendJsonResponse(res, 400, err);
					return;
				}
				if (volunteer.activities && volunteer.activities.length > 0 ) {
					console.log("** app_api/cVolunteers : vVolunteerActivity  "+volunteer.activities.length);
					var activities = [];
					volunteer.activities.forEach(function(doc) {
						if ( doc.status == status || status == "All" ) {
							var act = { 	_id: doc.id,
											eventId: doc.eventId ,
											date: doc.date ,
											startTime: doc.startTime ,
											area:doc.area,
											coOrdinator: doc.coOrdinator,
											coOrdinatorPhone: doc.coOrdinatorPhone,
											activity: doc.activity,
											inTime: doc.inTime,
											outTime: doc.outTime,
											childrenAffected: doc.childrenAffected
											};
								if ( status == "All" ) {
									act.status = doc.status;
								}
							activities.push(act);
						}
					});
					sendJsonResponse(res, 200, activities);
					return;
				} else {
					console.log("** app_api/cVolunteers : vVolunteerActivity  no error .. no documents ");
					sendJsonResponse(res, 200, {});
		   		}
		   	});
		console.log("** app_api/cVolunteers : vVolunteerActivity  end ");
}
module.exports.vVolunteerActivityShort = function (req,res) {
	console.log("** app_api/cVolunteers : call vVolunteerActivityShort");
	if (req.params && req.params.id ) {
		console.log("** app_api/cVolunteers : for voluteer id "+req.params.id);
		Volunteer
		    .findById(req.params.id)
		    .select('name activities')
		    .exec(function(err, volunteer) {
				console.log("** app_api/cVolunteers : vVolunteerActivityShort  exec ");
				if ( !volunteer) {
					sendJsonResponse(res, 404, {"message" : "Volunteer not found"});
					return;
				} else if (err) {
					console.log("** app_api/cVolunteers : vVolunteerActivityShort  error  "+err);
					sendJsonResponse(res, 400, err);
					return;
				}
				if (volunteer.activities && volunteer.activities.length > 0 ) {
					console.log("** app_api/cVolunteers : vVolunteerActivityShort  "+volunteer.activities.length);
					var activities = [];
					volunteer.activities.forEach(function(doc) {
						activities.push({ 	_id: doc.id,
											eventId: doc.eventId ,
											status: doc.status ,
											inTime: doc.inTime,
											outTime: doc.outTime,
											childrenAffected: doc.childrenAffected
										});
					});
					sendJsonResponse(res, 200, activities);
					return;
				} else {
					console.log("** app_api/cVolunteers : vVolunteerActivityShort  no error .. no documents ");
					sendJsonResponse(res, 200, {});
		   		}
		   	});
		console.log("** app_api/cVolunteers : vVolunteerActivityShort  end ");
	}
}