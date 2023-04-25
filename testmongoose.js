const mongoose = require('mongoose'),
        path = require('path'),
        fs = require('fs');
const compschemes = require('./models/CompanySchemes.js');

emps = require('./data/emplog.json');
//console.log(emps);

mongoose.connect('mongodb+srv://christianv:AMracing5511@cluster0.0awfqdk.mongodb.net/Company?retryWrites=true&w=majority')
    .then(done => {
        const Employee = mongoose.model('Employee', compschemes.empSchema);

        /*
        Employee.deleteMany().then(()=>{
            Employee.find().then((res)=>{
                console.log(res);
            });
        });
        */

        /*
        Employee.insertMany(emps,{ordered:false})   // ordered:false allows for existing documents without erroring whole function
            .then((res)=>{
                console.log(res);
                Employee.find().then((result)=>{
                    console.log('Results >', result);
                });
            })
            .catch((err)=>{console.log('error >',err)});
        */
        
        /*
        Employee.find({empID:null}).then((result)=>{
            console.log('Results >', result);
        });
        */

        /*
        Employee.deleteMany({empID:null}).then((result)=>{ 
            console.log(result);
        });
        */

        
        Employee.find({name:'Ryan Murphy'}).then((result)=>{   //find() always returns an array, findOne() will return single object
            console.log(result);
            console.log(result[0].fullName); 
        });
    })
    .catch(error => console.log(error));
