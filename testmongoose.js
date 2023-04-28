const mongoose = require('mongoose'),
        path = require('path'),
        fs = require('fs');
const compschemes = require('./models/CompanySchemes.js');

var emps = require('./data/emplog.json');
var devs = require('./data/devicelog.json');
var accs = require('./data/accountlog.json');
var bids = require('./data/COMMbidlog.json');

connComp = mongoose.createConnection('mongodb+srv://christianv:AMracing5511@cluster0.0awfqdk.mongodb.net/Company');

const Employee = connComp.model('Employee', compschemes.Employee);  // One model per collection
const Device = connComp.model('Device', compschemes.Device);
const Account = connComp.model('Account', compschemes.Account);
const Test = connComp.model('xxlTest',compschemes.lrgTest);

/**
 * @todo undestanding schema default and virtuals (how and when to use)
 * @todo can we use ...Many() in all case or does it require an array argument
 */
//console.log(Employee.db.collections);

async function Views(){  // Have to manually create collection
    const blueUser = await connComp.model('GreenUser',compschemes.BlueUser);

    await blueUser.createCollection({
        viewOn: 'employees',
        pipeline: [
            {
                $set:{ 
                    name: {$concat:[{$substr:['$name', 0, 3]}, '...']}
                }
            }
        ]
    });

    Employee.find({empID:'301'}).then((res)=>{
        console.log('Employee >',res[0]);
    })

    blueUser.find({empID:'301'}).then((result)=>{   //find() always returns an array, findOne() will return single object
        console.log('Green >',result[0]);
    });
}
async function ViewTest(){  // Once created collections are permantly linked
    const blueUser = await connComp.model('BlueUser',compschemes.BlueUser);
    //await Employee.updateOne({empID:'301'},{bday:'11-29-1984'});

    blueUser.find({empID:'301'}).then((res)=>{
        console.log('blue >', res[0]);
    })
    Employee.find({empID:'301'}).then((res)=>{
        console.log('emp >', res[0]);
    })
}

async function Versioning(){
    Employee.find({empID:'301'}).then((res)=>{
        console.log(res[0]);
        res[0].lName = 'Murphy';
        res[0].save().then(res=>{
            console.log(res);
        })
        
    })
}

// Find Ryan's accounts
async function main(){
    let temp=[];
    let acctable=[];
    let emptable = await Employee.find();
    for(let i=0;i<emptable.length;i++){
        acctable = await Account.find({empID:emptable[i].empID});
        for(let x=0;x<acctable.length;x++){
            emptable[i].accounts.push(acctable[x]._id);
            await emptable[i].save();
        }
    }
    emptable = await Employee.find();
    console.log(emptable);
}

async function second(){
    for(let i=0;i<emps.length;i++){
        if(emps[i].empID == '301'){
            Employee.insertMany(emps[i]).then(res=>{
                console.log(res);
            })
        }
    }
    /*
    Employee.find({empID:'301'}).then(function(emp){
        console.log(emp);
    });
    */
}

second();
