import express from 'express';
import bcrypt from 'bcrypt';

import User from '../models/user';

const router = express.Router();
const saltRounds = 10;

/*
  @route      POST api/users/register
  @descrp     register a user and send the jwt
  @bodyparm   username and password
*/
router.post('/register', (req, res) => {
	let newUser;
	const userPromise = User.find({ username: req.body.username })
		.then(users => {
			if (users.length > 0) {
				res.status(400).json({
					user: 'Username already taken'
				});
				return null;
			}
			return bcrypt.hash(req.body.pass, saltRounds);
		})
		.then(hashedPass => {
			if (!hashedPass) return null;

			newUser = new User({
				username: req.body.username,
				pass: hashedPass
			});
			return newUser.save();
		})
		.then(result => {
			if (!result) return;

			res.setHeader('x-auth-token', newUser.getToken());
			res.send(result);
		})
		.catch(err => {
			res.status(500).send(err);
		});
	return 0;
});

/*
  @route      POST api/users/login
  @descrp     login a user and send the jwt
  @bodyparm   username and password
*/
router.post('/login', (req, res) => {
	let reqUser;
	User.findOne({ username: req.body.username })
		.then(user => {
			if (!user) {
				res.status(400).json({ user: 'User not found' });
				return [null, null];
			}
			reqUser = user;
			return bcrypt.compare(req.body.pass, user.pass);
		})
		.then(result => {
			if (reqUser === null || result === null) return;

			if (result === false) {
				res.status(400).json({
					pass: 'Incorrect password'
				});
				return;
			}

			res.setHeader('x-auth-token', reqUser.getToken());
			res.json({
				username: reqUser.username
			});
		})
		.catch(err => {
			res.status(500).send(err);
		});
	return 0;
});

export default router;
