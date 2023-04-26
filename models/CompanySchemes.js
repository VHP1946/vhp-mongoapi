const mongoose = require('mongoose');
const {Schema} = mongoose;

var empSchema = new Schema({
	empID: String,

	name: String,
	fName: String,
	lName: String,
	
	coid: {type:String, uppercase:true},
	title: String,
	type: String,
	repTo: String, //empID
	
	jobDesc: String,
	joined: Date,
	bday: Date,
	skills: String,
	interest: String,
	
	tasks: Array,
	goals: Array,
	picture: String
},
{	
	strict: false,
    virtuals: {
        fullName: {
            get(){
                return this.fName + ' ' + this.lName;
            },
            set(v){
                this.fName = v.substr(0, v.indexOf(' '));
                this.lName = v.substr(v.indexOf(' ')+1);
            }
        }
    }
});
var blueSchema = new Schema({
	empID: String,

	name: String,
	fName: String,
	lName: String
},{
	autoCreate: false,
	autoIndex: false,
});
var devSchema = new Schema({
	empID: String,
	name: String,
	type: String,
	model: String,
	serial: String,
	cardNum: String,
	cardRef: String,
	iccid: String,
	lock: String,
	
	linkedAccounts: Array,
	
	purchaseDate: Date,
	upgradeDate: Date
});

var accSchema = new Schema({
	empID: String,
	type: String,
	user: String, // email OR username
	pswrd: String,
	twoFactors: Array,
	active: Boolean,
	resetPswrd: Date
});

module.exports={
    Employee:empSchema,
	BlueUser:empSchema,
    Device:devSchema,
    Account:accSchema,
	BlueUser:blueSchema
}
