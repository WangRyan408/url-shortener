import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import crypto from "crypto";
import basex from 'base-x';


const router = express.Router();

router.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: true,
        httpOnly: true,
        sameSite: 'strict'
    }
}));

mongoose.connect(process.env['MONGO_URI'], { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
});