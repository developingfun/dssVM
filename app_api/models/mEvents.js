var mongoose = require('mongoose');

function toDateTime (v) {
	var d = new Date();
	if (v) {
		console.log(" passed value "+v);
		var am = v.search(/am/i);
		console.log(" am "+am);
		var timePart = "" ;
		if ( am == -1 ) {
			timePart = v.replace(/pm/gi, "");
		} else {
			timePart = v.replace(/am/gi, "");
		}
		console.log(" timePart "+timePart);
		var timeParts = timePart.split(":");
		if ( am == -1 ) {
			timeParts[0] = timeParts[0] + 12;
		}
		console.log(" timePart "+timeParts[0]+" : "+timeParts[1]);
		d.setHours(timeParts[0]);
		d.setMinutes(timeParts[1]);
	}
	console.log(" date "+d);
	return d;

}
var eventSchema = new mongoose.Schema({
	eDate : {type:Date,required:true},
	eStartTime : {type:Date,required:true,set:toDateTime},

	eCity : {type:String,required:true},
	eArea : {type:String,required:true},
	eMeetingPoint : {type:String},

	eDescription : {type:String,required:true},
	eActivity : {type:String,required:true},

	eDuration : {type:Number},
	eCoordinator : {type:String,required:true},
	eCoordinatorPhone : {type:String,required:true},
	eVolunteersRequired : {type:Number},

	eStatus : {type:String}
});

mongoose.model('Event', eventSchema);