const VHPMongoClient=require('./mdb/mongo');

let connectInfo ={
    user: 'christianv',
    pswrd: 'AMracing5511',
    db:'',
    cluster:'cluster0'
  };
let uri = `mongodb+srv://${connectInfo.user}:${connectInfo.pswrd}@${connectInfo.cluster}.0awfqdk.mongodb.net/${connectInfo.db}?retryWrites=true&w=majority`;

let fpack={
    db:'Company',
    collect:'Employee_Device',
    method:'QUERY',
    options:{
      query:{
        empID:'01-301'
      }
    }
  }

let vmclient = new VHPMongoClient(uri,()=>{
    vmclient.ROUTErequest(fpack).then(answer=>{
      console.log(answer[0].Device);
    })
});




/*
const mongoose = require('mongoose');

const compschemes = require('./models/CompanySchemes.js');

var emps = require('./data/emplog.json');
var devs = require('./data/devicelog.json');
var accs = require('./data/accountlog.json');
var bids = require('./data/COMMbidlog.json');
var users = require('./data/userlog.json');


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
    connComp = await mongoose.createConnection('mongodb+srv://christianv:AMracing5511@cluster0.0awfqdk.mongodb.net/');

    const Employee = await connComp.useDb('Company',{useCache:true}).model('Employee', compschemes.Employee);  // One model per collection
    const Device = await connComp.useDb('Company',{useCache:true}).model('Device', compschemes.Device);
    const Account = await connComp.useDb('Company').model('Account', compschemes.Account);
    const User = await connComp.useDb('Company').model('User', compschemes.User);
    
    result = await Employee.find({empID:'01-301'}).populate('Device');
    console.log(result[0].Device);
}
*/