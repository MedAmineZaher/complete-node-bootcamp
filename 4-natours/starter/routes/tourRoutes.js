const express = require('express');
const fs = require('fs');

const router = express.Router();

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

//2° ROUTE Handlers
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: { tours },
  });
};

const getTour = (req, res) => {
  const tour = tours.find((t) => t.id == req.params.id);
  tour
    ? res.status(200).json({ status: 'success', data: tour })
    : res.status(404).json({ status: 'fail', message: 'INVALID ID' });
};
const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      err
        ? res.status(502).send('error')
        : res.status(201).json({
            status: 'success',
            data: { tour: newTour },
          });
    }
  );
};

const editTour = (req, res) => {
  let index = -1;
  let tour = tours.find((t, i) => {
    index = tour[i];

    return t.id == req.params.id;
  });
  tour
    ? ((tours[index] = { ...tour, ...req.body }),
      fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        (err) => {
          err
            ? res.status(502).send('error lors de la modification')
            : res.status(201).json({
                status: 'success',
                data: tours[index],
              });
        }
      ))
    : res
        .status(404)
        .json({ status: 'fail while modifying', message: 'INVALID ID' });
};
const deleteTour = (req, res) => {
  let id;
  const newTours = tours.filter((tour) => {
    if (tour.id == req.params.id) id = tour.id;
    return tour.id != req.params.id;
  });
  // const newTours = tours.splice(req.params.id, 1);
  id == req.params.id
    ? fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(newTours),
        (err) => {
          err
            ? res.status(502).send('error lors de la suppression')
            : res.status(204).json({
                status: 'success',
                data: null,
              });
        }
      )
    : res
        .status(404)
        .json({ status: 'fail while deleting', message: 'INVALID ID' });
};

router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTour).patch(editTour).delete(deleteTour);
module.exports = router;
