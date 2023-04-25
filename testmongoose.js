const mongoose = require('mongoose'),
        path = require('path'),
        fs = require('fs');
const compschemes = require('./models/CompanySchemes.js');

emps = require('./data/emplog.json');
devs = require('./data/devicelog.json');
accs = require('./data/accountlog.json');

connComp = mongoose.createConnection('mongodb+srv://christianv:AMracing5511@cluster0.0awfqdk.mongodb.net/Company');
const Employee = connComp.model('Employee', compschemes.empSchema);  // One model per collection
const Device = connComp.model('Device', compschemes.devSchema);
const Account = connComp.model('Account', compschemes.accSchema);

/*
Account.insertMany(accs).then(res=>{
    console.log(res);
})
*/

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

/*
Employee.find({name:'Ryan Murphy'}).then((result)=>{   //find() always returns an array, findOne() will return single object
    console.log(result);
    console.log(result[0].fullName); 
});
*/

// Find Ryan's accounts
Employee.find({name:'Ryan Murphy'}).then((res)=>{
    Account.find({empID:res[0].empID}).then((result)=>{
        console.log(result);
    })
})

// Setter used on virtual property
Employee.find({name:'Ryan Murphy'}).then((res)=>{
    res[0].fullName = 'Ryan Murphy';
    console.log(res[0].lName);
})
