var express = require('express');
var router = express.Router();


var ctrlVolunteers = require('../controllers/cVolunteers');
var ctrlEvents = require('../controllers/cEvents');
var ctrlNotifications = require('../controllers/cNotifications');

/* volunteers */
router.get('/volunteers/count', ctrlVolunteers.volunteersRegistered);
router.get('/volunteers/findFirst', ctrlVolunteers.volunteerFindFirst);
router.get('/volunteers', ctrlVolunteers.volunteerList);
router.post('/volunteers', ctrlVolunteers.volunteerCreate);
router.get('/volunteers/:id', ctrlVolunteers.volunteerRead);
router.put('/volunteers/:phoneNo', ctrlVolunteers.volunteerUpdate);
router.delete('/volunteers/:id', ctrlVolunteers.volunteerDelete);

/* volunteers activity */
router.get('/volunteers/:id/activity', ctrlVolunteers.vVolunteerActivityShort);
router.get('/volunteers/:id/activity/:status', ctrlVolunteers.volunteerActivityLog);
router.post('/volunteer/:id/showInterest/:eventId', ctrlVolunteers.volunteerInterested);
router.post('/volunteer/:id/revertInterest/:activityId', ctrlVolunteers.volunteerInterestReverted);
router.post('/volunteer/:id/confirmAttendence/:activityId', ctrlVolunteers.volunteerConfirmAttendence);
router.post('/volunteer/:id/inTime/:activityId',ctrlVolunteers.volunteerRecordInTime);
router.post('/volunteer/:id/outTime/:activityId',ctrlVolunteers.volunteerRecordOutTime);
/*
router.get('/volunteers/:phoneNo/activities/:activityId', ctrlVolunteers.volunteerActivityRead);
router.put('/volunteers/:phoneNo/activities/:activityId', ctrlVolunteers.volunteerActivityUpdate);
router.delete('/volunteers/:phoneNo/activities/:activityId', ctrlVolunteers.volunteerActivityDelete);
*/
/* volunteers remarks */

router.post('/volunteers/:id/remark', ctrlVolunteers.volunteerLogRemark);
/*
router.get('/volunteers/:phoneNo/remarks/:remarkId', ctrlVolunteers.volunteerRemarkRead);
router.put('/volunteers/:phoneNo/remarks/:remarkId', ctrlVolunteers.volunteerRemarkUpdate);
router.delete('/volunteers/:phoneNo/remarks/:remarkId', ctrlVolunteers.volunteerRemarkDelete);
*/
/* volunteer feedback */

/* GET notifications page. */
router.get('/notices/:id', ctrlNotifications.notices);
router.get('/notice/import', ctrlNotifications.noticeImport);

/* GET event page. */
router.get('/events', ctrlEvents.eventList);
router.get('/events/:id', ctrlEvents.eventRead);
router.post('/events', ctrlEvents.eventCreate);
router.get('/event/import', ctrlEvents.eventImport);


module.exports = router;
