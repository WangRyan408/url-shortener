require('dotenv').config();
let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let app = express();
const mongoose = require('mongoose');

//Regex for http(s)://
const regex = /^(http)[s]?(:\/\/)/;

mongoose.connect(process.env['MONGO_URI'], { useNewUrlParser: true, useUnifiedTopology: true });

const urlSchema = new mongoose.Schema({
  original_url: { type: String, required: true },
  short_url: { type: String, required: true }
});

let ogUrl = mongoose.model("shortener", urlSchema);

console.log(mongoose.connection.readyState);


// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// //console.log(req.body);

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


// When trying to visit short_url
app.get('/api/:test', async function(req, res, next) {
  let short = await ogUrl.findOne({ short_url: req.params.test }).exec();

  console.log(short);

  req.shorty = short.original_url;

  next();
}, function(req, res) {
  res.redirect(`${req.shorty}`);
});

// Converts url to short_url(Number) and returns json
app.post('/api', async function(req, res, next) {

  //console.log({ Url: req.body.url });

  let currUrl = await ogUrl.findOne({ original_url: req.body.url }).exec(); //see if url is already in db
  const totalDocs = await ogUrl.countDocuments({});

  if (!regex.test(req.body.url)) {
    res.send({ error: 'invalid url' });
  }

  if (currUrl != null) {

    req.originalUrl = currUrl.original_url;
    req.shortUrl = currUrl.short_url;

  } else {
    //let totalDocs = await ogUrl.countDocuments({});
    const original = await ogUrl.create({ original_url: req.body.url, short_url: totalDocs });

    currUrl = await ogUrl.findOne({ original_url: req.body.url }).exec();

    req.originalUrl = currUrl.original_url;
    req.shortUrl = currUrl.short_url;

  }

  console.log({ "Current Obj": currUrl });

  console.log({ "# of Docs": totalDocs });


  next();
}, function(req, res) {
  if (!regex.test(req.body.url)) {
    res.send({ error: 'invalid url' });
  } else {
    // res.send({ original_url: req.body.url, short_url: `${urlFunc(req.body.url)}`});
    res.send({ original_url: req.originalUrl, short_url: Number(req.shortUrl) });

    //res.send({ original_url: req.body.url, short_url: 1 }); // Test json
  }
});



app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
