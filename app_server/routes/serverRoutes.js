var express = require('express');
var router = express.Router();

var ctrlMain = require('../controllers/main');
var ctrlOthers = require('../controllers/others');
var ctrlVolunteers = require('../controllers/cExpVolunteers');
var ctrlSites = require('../controllers/sites');
var ctrlEvents = require('../controllers/events');

/* GET home page. */

router.get('/', ctrlOthers.angularApp);

/* GET volunteer page. */
router.get('/volunteer', ctrlVolunteers.list);
router.get('/volunteer/detail/:phoneNo', ctrlVolunteers.info);
router.get('/volunteer/new', ctrlVolunteers.new);
router.post('/volunteer/new', ctrlVolunteers.add);
router.get('/volunteer/delete/:id', ctrlVolunteers.delete);

router.get('/volunteer/:id/addRemark', ctrlVolunteers.newRemark);
router.post('/volunteer/:id/addRemark', ctrlVolunteers.addRemark);
router.get('/volunteer/addActivity', ctrlVolunteers.newActivity);
router.get('/volunteer/addFeedback', ctrlVolunteers.newFeedback);

/* GET site page. */
router.get('/site', ctrlSites.list);
router.get('/site/detail', ctrlSites.info);
router.get('/site/new', ctrlSites.new);

/* GET event page. */
router.get('/event', ctrlEvents.list);
router.get('/event/detail', ctrlEvents.info);
router.get('/event/new', ctrlEvents.new);

module.exports = router;
