module.exports.list = function (req,res) {
	res.render('index', { title: 'Sites' });
};

module.exports.info = function (req,res) {
	res.render('index', { title: 'Site Details' });
};

module.exports.new = function (req,res) {
	res.render('index', { title: 'Add Site' });
};
