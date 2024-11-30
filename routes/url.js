import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

let router = express.Router();
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

router.use(cors());

router.use('/public', express.static(`${process.cwd()}/public`));

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
// //console.log(req.body);

router.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
router.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

// When trying to visit short_url
router.get('/api/shorturl/:test', async function(req, res, next) {
  let short = await ogUrl.findOne({ short_url: req.params.test }).exec();

  console.log(short);

  req.shorty = short.original_url;

  next();
}, function(req, res) {
  res.redirect(`${req.shorty}`);
});

// Converts url to short_url(Number) and returns json
router.post('/api/shorturl', async function(req, res, next) {

  
  let currUrl = await ogUrl.findOne({ original_url: req.body.url }).exec(); //see if url is already in db
  const totalDocs = await ogUrl.countDocuments({});

  const hash = await bcrypt.hash(req.body.url, 0);

  console.log({ "Hash": hash });
  console.log({ Url: req.body.url });
  console.log({"Subhash": hash.substring(29, 36)});
  
  const hashStr = hash.substring(29, 36);

  if (!regex.test(req.body.url)) {
    res.send({ error: 'invalid url' });
  }

  if (currUrl != null) {

    req.originalUrl = currUrl.original_url;
    req.shortUrl = currUrl.short_url;

  } else {
    //let totalDocs = await ogUrl.countDocuments({});
    await ogUrl.create({ original_url: req.body.url, short_url: hashStr });

    currUrl = await ogUrl.findOne({ original_url: req.body.url }).exec();

    req.originalUrl = currUrl.original_url;
    req.shortUrl = currUrl.short_url;

  }

  console.log({ "Current Obj": currUrl });

  //console.log({ "# of Docs": totalDocs });
  next();
}, function(req, res) {
  if (!regex.test(req.body.url)) {
    res.send({ error: 'invalid url' });
  } else {
    res.send({ original_url: req.originalUrl, short_url: req.shortUrl });
  }
});

export default router;