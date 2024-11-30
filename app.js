import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import "dotenv/config";

//Routes
import urlRouter from './routes/url.js';
import authRouter from './routes/auth.js';

const app = express();


const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', urlRouter);
app.use('/auth', authRouter);
//app.use('/qrcode', qrcodeRouter);


app.listen(port, function() {
    console.log(`Listening on port ${port}`);
  });

app.use(function(req, res, next) {
next(createError(404));
});

app.use(function(err, req, res, next) {
// set locals, only providing error in development
res.locals.message = err.message;
res.locals.error = req.app.get('env') === 'development' ? err : {};

// render the error page
res.status(err.status || 500);
res.render('error');
});