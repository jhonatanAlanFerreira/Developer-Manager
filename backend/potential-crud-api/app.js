const express = require('express');
const logger = require('morgan');

const developersRouter = require('./routes/developers');
const levelRouter = require('./routes/levels');
const viewRouter = require('./routes/view');
const app = express();

app.use(express.static("../../frontend/potential-crud/dist/potential-crud/"));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use('/api/developers', developersRouter);
app.use('/api/levels', levelRouter);
app.use(viewRouter);

// catch 404 and forward to error handler
app.use(function (req, res) {
  res.sendStatus(404);
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.sendStatus(err.status || 500);
});

module.exports = app;