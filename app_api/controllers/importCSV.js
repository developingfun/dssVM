var mongoose = require('mongoose');
var csv = require('fast-csv');
var Event = mongoose.model('Event');


module.exports.importFile = function(filePath, fileHeaders, modelName) {
	console.log("importFile : filePath "+filePath);
	console.log("importFile : fileHeaders "+fileHeaders);
	console.log("importFile : modelName "+modelName);
    csv
        .fromPath(filePath, {headers: fileHeaders})
        .on('data', function(data) {
			console.log("importFile : onData ");
            var Obj = mongoose.model(modelName);

            var obj = new Obj();

            Object.keys(data).forEach(function(key) {
				console.log("importFile : foreach ");
                var val = data[key];

                if (val !== '')
                    obj.set(key, val);
            });

            obj.save(function (err) {
				console.log("importFile : save ");
                if (err) {
                    console.log(err);
                    return(err);
				}
            });
        })
        .on('end', function() {
            console.log("done");
        });
    return null;
}