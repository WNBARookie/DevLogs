import cors from 'cors';
import express from 'express';
const session = require('express-session');

import { responseHandler } from './middlewares/response';
const dotenv = require('dotenv').config();

import { connectDB } from './config/db';

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  })
);

connectDB();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));

app.use(responseHandler);

export default app;

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log();
});
