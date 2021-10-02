const express = require('express');

const tourController = require('../controllers/tourController');

const { createTour, editTour, deleteTour, getAllTours, getTour, checkID } =
  tourController;

const router = express.Router();
router.param('id', checkID);

router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTour).patch(editTour).delete(deleteTour);
module.exports = router;
