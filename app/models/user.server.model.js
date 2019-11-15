var
	mongoose = require('mongoose'),
	crypto = require('crypto'),
	Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: {
		type: String,
		trim: true,
		unique: true
	},
	password: String,
	owner: {
		type: {
			_id: Schema.ObjectID,
			name: String
		},
		default: null,
	},
	permission: {
		type: Number,
		default: 1
	},
	status: {
		type: Boolean,
		default: true
	}
}, {
	timestamps: true
});

UserSchema.pre('save',
	function (next) {
		if (this.password) {
			var md5 = crypto.createHash('md5');
			this.password = md5.update(this.password).digest('hex');
		}

		next();
	}
);

UserSchema.methods.authenticate = function (password) {
	var md5 = crypto.createHash('md5');
	md5 = md5.update(password).digest('hex');

	return this.password === md5;
};

mongoose.model('User', UserSchema, 'users');