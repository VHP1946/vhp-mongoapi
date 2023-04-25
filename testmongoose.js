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

/**
 * @todo undestanding schema default and virtuals (how and when to use)
 * @todo can we use ...Many() in all case or does it require an array argument
 */




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

//do we need to send docs through an array OR can we just send one off objects
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
async function main(){
    let temp=[];
    let acctable=[];
    let emptable = await Employee.find({name:'Ryan Murphy'});
    for(let i=0;i<emptable.length;i++){
        acctable = await Account.find({empID:emptable[i].empID});
        acctable.forEach(acc=>{
            temp.push(acc);
        })
    }
    console.log(temp);
}

main();

/*
Employee.find({name:'Ryan Murphy'}).then((res)=>{
    let temp = [];
    res.forEach(emp => {
        Account.find({empID:emp.empID}).then((result)=>{
            console.log(result);
            temp.push(result);
        });
    });
    console.log('results >',temp);
});
*/

/*
// Setter used on virtual property; can take in a full property at once and let the Schema remember the function
Employee.find({name:'Ryan Murphy'}).then((res)=>{
    res[0].fullName = 'Ryan Murphy';
    console.log(res[0].lName);
    res[0].save()
})
*/