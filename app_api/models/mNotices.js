var mongoose = require('mongoose');

var noticeSchema = new mongoose.Schema({
	nValidFor : {type:Date,required:true},
	nTarget : {type:String,required:true},
	nMessageText : {type:String,required:true},
	nCreatedBy : {type:String}
});

mongoose.model('Notice', noticeSchema);