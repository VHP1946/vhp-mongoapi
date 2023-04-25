const mongoose = require('mongoose');
const {Schema} = mongoose;

var empSchema = new Schema({
	empID: String,

	name: String,
	fName: String,
	lName: String,
	
	coid: String,
	title: String,
	type: String,
	repTo: String, //empID
	
	jobDesc: String,
	joined: String,
	bday: Date,
	skills: String,
	interest: String,
	
	tasks: Array,
	goals: Array,
	picture: String
},
{
    virtuals: {
        fullName: {
            get(){
                return this.fName + ' ' + this.lName;
            }
        }
    }
});

module.exports={
    empSchema
  }
