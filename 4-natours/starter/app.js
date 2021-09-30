const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();
// Middlewares
app.use(express.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
  console.log('Log from middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id/', getTour);
// app.patch('/api/v1/tours/:id', editTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
