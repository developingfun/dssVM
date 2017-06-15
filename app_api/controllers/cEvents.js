var mongoose = require('mongoose');
var Event = mongoose.model('Event');
var csv = require('./importCSV');
var googleAuth = require('../../google_access/googleAuth');



var sendJsonResponse = function(res, status, content) {
	  res.status(status);
	  res.json(content);
  };
module.exports.eventImport = function (req,res) {
	console.log("eventImport");
	var csvHeaders = {
	    EVENT: {
	        headers: ['eDate','eDuration', 'eCity', 'eActivity','eArea','eDescription','eVolunteersRequired','eCoordinator','eCoordinatorPhone','eStartTime','eMeetingPoint']
	    }
	}
    // C2-L
	//adjust this path to the correct location
	var err = csv.importFile(__dirname + '/eventMay.CSV', csvHeaders.EVENT.headers, 'Event');

	if ( err ) {
		sendJsonResponse(res, 400, err);
		return;
	}
	sendJsonResponse(res, 201, null);
	//googleAuth.readGoogleFile(function (values) {
	//	for (var i = 0; i < values.length; i++) {
	//      var row = values[i];
	      // Print columns A and E, which correspond to indices 0 and 4.
	//      console.log('%s, %s', row['name'], row['major']);
	//    }
  	//});
};

module.exports.eventCreate = function (req,res) {
	Event.create({
		eDate: req.body.date,

		eCity: req.body.city,
		eArea: req.body.area,
		eMeetingPoint: req.body.meetingPoint,

		eActivity: req.body.activity,
		eDescription: req.body.description,

		eCoordinator: req.body.coordinator,
		eCoordinatorPhone: req.body.coordinatorPhone,

		eStartTime: req.body.startTime,
		eDuration: req.body.duration,

		eVolunteersRequired: req.body.reqVolunteers,
		eStatus:'Created'
		  }, function(err, event) {
			  if(err) {
				 sendJsonResponse(res, 400, err);
			 }
			 else {
				 sendJsonResponse(res, 201, event);
			 }
		  });
};
module.exports.eventList = function (req,res) {
	console.log("eventList");
	var today = new Date();
	var events = [];
	Event
		   .find({eDate : {$gte : today}})
		   .exec(function(err, docs) {
			   if (docs.length > 0 ) {
				   console.log("eventList : events found "+docs.length);
				   docs.forEach(function(doc) {
					   console.log("eventList : push event ");
					   events.push({
						   _id: doc._id,
						   date: doc.eDate ,
						   area:doc.eArea,
						   activity: doc.eActivity,
						   coOrdinator: doc.eCoordinator,
						   coOrdinatorPhone:doc.eCoordinatorPhone,
						   startTime : doc.eStartTime
						   });
				   });
				   sendJsonResponse(res, 200, events);
				   return;
			   } else if (err) {
				   console.log("eventList : error finding events "+err);
				   sendJsonResponse(res, 404, err);
				   return;
			   }
			   console.log("eventList : no events ");
			   sendJsonResponse(res, 200, events);
		   });

};
module.exports.eventRead = function (req,res) {
	console.log("cEvents : eventRead ");
	if (req.params && req.params.id ) {
		console.log("cEvents : call readEvent ");
		Event
		 .findById(req.params.id ,
	   				function(err, event) {
						if (!event) {
							console.log("cEvents :event not found ");
			   				sendJsonResponse(res, 404, {"message" : "Event with id no not found"});
			   				return;
		   				} else if (err) {
							console.log("cEvents : error reading event ");
						   sendJsonResponse(res, 404, err);
						   return;
		   				}
		   				console.log("cEvents : event found ");
		   				sendJsonResponse(res, 200, event);
	   				}
	   			);
   } else {
	   sendJsonResponse(res, 404, {"message" : "request with id", });
   }
};
module.exports.readEvent = function(eventId,callback) {
	console.log("cEvents : readEvent ");
	Event
		 .findById(eventId , callback);
}
module.exports.eventUpdate = function (req,res) {
  sendJsonResponse(res, 200, {"status" : "success"});
};
module.exports.eventDelete = function (req,res) {
	if (req.params && req.params.id ) {
		Event
		   .findByIdAndRemove(req.params.id ,
		   					function(err,event) {
								if (err) {
								   sendJsonResponse(res, 404, err);
								   return;
		   						}
		   						sendJsonResponse(res, 204, {"status" : "success"});
							});
	      };

}

