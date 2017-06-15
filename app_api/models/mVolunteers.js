var mongoose = require('mongoose');

var volunteerActivity = new mongoose.Schema({
	eventId: String,

	date: Date,
	startTime: Date,

	area: String,

	coOrdinator: String,
	coOrdinatorPhone: String,

	activity: String,

	inTime: String,
	outTime: String,
	childrenAffected: Number,
	status: String // 'Interested' , 'Assigned' , 'Attended' , 'Expired'
});

var volunteerFeedback = new mongoose.Schema({
	date: Date,
	feedback: String
});
var volunteerRemarks = new mongoose.Schema({
	date: Date,
	dssStaff: String,
	remark: String
	});
var volunteerSchema = new mongoose.Schema({
	name: {type:String,required:true},
	address: String,
	emailId: String,
	phone: {type:String,required:true},
	occupation: String,
	skills: [String],
	orientationDate: Date,
	prefArea: [String],
	prefDays: [String],
	prefActivity: [String],
	organization: {type: String,"default": "self"},
    feedbacks: [volunteerFeedback],
    remarks: [volunteerRemarks],
    activities: [volunteerActivity]
	});

mongoose.model('Volunteer', volunteerSchema);