var mongoose = require('mongoose');
var Notice = mongoose.model('Notice');
var csv = require('./importCSV');

var sendJsonResponse = function(res, status, content) {
	  res.status(status);
	  res.json(content);
  };
module.exports.noticeImport = function (req,res) {
	console.log("noticeImport");
	var csvHeaders = {
	    NOTICE: {
	        headers: ['nValidFor','nTarget', 'nMessageText', 'nCreatedBy']
	    }
	}
    // C2-L
	//adjust this path to the correct location
	var err = csv.importFile(__dirname + '/noticeCur.CSV', csvHeaders.NOTICE.headers, 'Notice');

	if ( err ) {
		console.log("noticeImport : error imort ");
		sendJsonResponse(res, 400, err);
		return;
	}
	console.log("noticeImport : success ");
	sendJsonResponse(res, 201, null);
	//googleAuth.readGoogleFile(function (values) {
	//	for (var i = 0; i < values.length; i++) {
	//      var row = values[i];
	      // Print columns A and E, which correspond to indices 0 and 4.
	//      console.log('%s, %s', row['name'], row['major']);
	//    }
  	//});
};

module.exports.noticesH = function (req,res) {
	console.log("noticesH");
	var notices = [
			{messageText : "events for next month loaded"},
			{messageText : "you are invited for annual event on 09 July"},
			{messageText : "Thank you for volunteering on 03 june"},
			{messageText : "Survey going on .."}
		];
	sendJsonResponse(res, 200, notices);
}
module.exports.notices = function (req,res) {
	console.log("notices");
	if (req.params && req.params.id ) {
		var today = new Date();
		var notices = [];
		Notice
			.find( {
					$and: [ { nValidFor : {$gte : today} } ,
					        { $or:  [  {nTarget : req.params.id} ,
					                   {nTarget : 'ALL'}
					                ]
					        }
					      ]
				    })
			.exec(function(err, docs) {
				   if (docs.length > 0 ) {
					   console.log("notices : notices found "+docs.length);
					   docs.forEach(function(doc) {
						   console.log("notices : push notice ");
						   notices.push({
							   messageText:doc.nMessageText
						   });
				   		});
				   		sendJsonResponse(res, 200, notices);
				   		return;
			   		} else if (err) {
						  console.log("notices : error finding notices "+err);
						   sendJsonResponse(res, 404, err);
						   return;
			   		}
			   		console.log("notices : no notices ");
			   		sendJsonResponse(res, 200, notices);
		   });
	}
};

