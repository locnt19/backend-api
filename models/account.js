const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const AccountSchema = new Schema({
	username: {
		type: String,
		unique: true
	},
	name: {
		type: String,
		default: null
	},
	type: {
		type: String,
		default: null
	},
	password: String,
	status: {
		type: Boolean,
		default: true
	},
}, {
	timestamps: true
});


/**
 * Password hash middleware.
 */
AccountSchema.pre('save', function save(next) {
	const user = this;
	if (!user.isModified('password')) {
		return next();
	}
	bcrypt.genSalt(10, (err, salt) => {
		if (err) {
			return next(err);
		}
		bcrypt.hash(user.password, salt, (err, hash) => {
			if (err) {
				return next(err);
			}
			user.password = hash;
			next();
		});
	});
});


/**
 * Helper method for validating user's password.
 */
AccountSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
		cb(err, isMatch);
	});
};

// plugin for passport-local-mongoose 
AccountSchema.plugin(passportLocalMongoose);

const Account = mongoose.model('Account', AccountSchema, 'accounts');

module.exports = Account;