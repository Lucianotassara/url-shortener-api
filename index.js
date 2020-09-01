require('dotenv').config()
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';

import { urlShortenerController } from './controller'

const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

// API
app.use(urlShortenerController);

// TODO: externalizar en .env
const portUrlShortenerApi = process.env.URL_SORT_API_PORT || 3003;
const mongoDBUri = `mongodb://${process.env.MONGO_URL_SHORT_DB_HOST}/${process.env.MONGO_URL_SHORT_DB_NAME}`;
const mongoHostName = process.env.MONGO_URL_SHORT_DB_HOST;

app.listen(portUrlShortenerApi, () => {
  console.log(`Started successfully server at port ${portUrlShortenerApi}`);
  mongoose
    .connect(mongoDBUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`Conneted to mongoDB at ${mongoHostName}`);
      });
});


