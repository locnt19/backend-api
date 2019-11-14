var
	mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var EmployeeSchema = new Schema({
	name: String,
	avatar: {
		type: String,
		default: null
	},
	type: Number,
	birthday: String,
	address: String,
	phone: String,
	pay_rate: Number,
	seniority: String,
	status: {
		type: Boolean,
		default: true
	}
}, {
	timestamps: true
});

mongoose.model('Employee', EmployeeSchema, 'employees');