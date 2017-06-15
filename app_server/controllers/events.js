module.exports.list = function (req,res) {
	res.render('index', { title: 'Events' });
};

module.exports.info = function (req,res) {
	res.render('index', { title: 'Event Details' });
};

module.exports.new = function (req,res) {
	res.render('index', { title: 'Add Event' });
};
