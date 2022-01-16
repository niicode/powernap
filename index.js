const express = require('express');
const mongoose = require('mongoose');
const app = express();

require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;

//database connection
mongoose.Promise = global.Promise;
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log('Mongo connected successfully'))
  .catch((err) => console.log('err'));

//imported model here
const { Dev } = require('./devCore');

app.get('/', (req, res) => {
  res.send('Hello yes it is working');
});

app.post('/new_dev', (req, res) => {
  const dev = new Dev(req.body);
  if (!dev) {
    res.json({
      succes: false,
    });
  }
  dev.save((err, doc) => {
    if (err) {
      res.json({
        success: false,
        err: err,
      });
    }
    res.json({
      succes: true,
      docs: doc,
    });
  });
});

app.get('/all_devs', (req, res) => {
  Dev.find({}, (err, devs) => {
    if (err) {
      res.status(200).json({
        err: err,
      });
    }
    res.json({
      succes: true,
      docs: devs,
    });
  });
});

//get a single dev
app.get('/dev/:_id', (req, res) => {
  let { _id } = req.params;
  Dev.findOne({ _id: _id }, (err, doc) => {
    if (err) {
      res.status(400).json({
        success: false,
        data: 'Bad request made the dev does not exist.',
      });
    }
    res.status(200).json({
      succes: true,
      data: doc,
    });
  });
});

//update devs info by checking the id of the dev
app.put('/:_id', async (req, res) => {
  const { _id } = req.params;
  const data = req.body;
  Dev.findByIdAndUpdate(_id, data, { new: true }, (err, doc) => {
    if (err) {
      res.json({
        message: 'Not working',
        error: err,
      });
    } else {
      res.json({
        message: 'success',
        doc: doc,
      });
    }
  });
});

app.delete('/:_id', async (req, res) => {
  const { _id } = req.params;
  Dev.findByIdAndDelete(_id, { new: true }, (err, doc) => {
    try {
      if (err) {
        res.json({
          message: 'Cannot delet error occured',
          error: err,
        });
      } else {
        res.json({
          success: true,
          message: 'Dev deleted successefully...',
        });
      }
    } catch (e) {
      res.send(e);
    }
  });
});

const PORT = process.env.PORT;
app.listen(PORT, function () {
  console.log(`server running of ${PORT}`);
});
