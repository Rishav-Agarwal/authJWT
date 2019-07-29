import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
	pass: {
		type: String,
		minlength: 5,
		maxlength: 235,
		required: true
	},
	username: {
		type: String,
		minlength: 3,
		maxlength: 20,
		required: true
	}
});

userSchema.methods.getToken = function() {
	const payload = {
		username: this.username
	};
	const jwtPrivateKey = process.env.JWT_PRIVATE_KEY;
	const token = jwt.sign(
		{
			data: payload,
			exp: Math.floor(Date.now() / 1000) + 60 * 60 * 12 // 1hr of expiry
		},
		jwtPrivateKey
	);

	return token;
};

const User = mongoose.model('users', userSchema);

export default User;
