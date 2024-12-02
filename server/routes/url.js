import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import crypto from "crypto";
import basex from 'base-x';

const base62 = basex(
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
);  

const URL_LENGTH = 6;

const router = express.Router();  

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

router.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
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

  //console.log({ Url: req.body.url });

  let currUrl = await ogUrl.findOne({ original_url: req.body.url }).exec(); //see if url is already in db
  const totalDocs = await ogUrl.countDocuments({});

  if (!regex.test(req.body.url)) {
    res.send({ error: 'invalid url' });
  }

  if (currUrl != null) {
    console.log(currUrl); 
    req.originalUrl = currUrl.original_url;
    req.shortUrl = currUrl.short_url;

  } else {
    //let totalDocs = await ogUrl.countDocuments({});
    let shortHash = (base62.encode(crypto.createHash('sha256').update(req.body.url).digest()).slice(0, URL_LENGTH)).toString();
    
    await ogUrl.create({ original_url: req.body.url, short_url: shortHash });

    currUrl = await ogUrl.findOne({ original_url: req.body.url }).exec();

    req.originalUrl = currUrl.original_url;
    req.shortUrl = currUrl.short_url;
    console.log(req.shortUrl);
  }

  //    console.log({ "Current Obj": currUrl });

  console.log({ "# of Docs": totalDocs });


  next();
}, function(req, res) {
  if (!regex.test(req.body.url)) {
    res.send({ error: 'invalid url' });   
  } else {
    // res.send({ original_url: req.body.url, short_url: `${urlFunc(req.body.url)}`});
    res.send({ original_url: req.originalUrl, short_url: req.shortUrl  });

    //res.send({ original_url: req.body.url, short_url: 1 }); // Test json
  }
});


export default router;
