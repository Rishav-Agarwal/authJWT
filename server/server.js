import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import user from './routes/users';

// Configure environment variables for server
dotenv.config();

const app = express();
const Fawn = require('fawn');

const mongodbConnectionString = process.env.MONGO_URI;

mongoose
	.connect(mongodbConnectionString, { useNewUrlParser: true })
	.then(() => console.log('connected to mongodb..'))
	.catch(err => {
		console.log('Error while connecting to mongodb : \n', err);
		process.exit(1);
	});

Fawn.init(mongoose);

app.use(express.json());

app.use('/api/users', user);

const port = process.env.PORT || 5000;

app.listen(port, console.log(`listening on port ${port}...`));
