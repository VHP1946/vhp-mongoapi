const mongoose = require('mongoose'),
        path = require('path'),
        fs = require('fs');
const compschemes = require('./models/CompanySchemes.js');

emps = require('./data/emplog.json');
devs = require('./data/devicelog.json');
accs = require('./data/accountlog.json');

connComp = mongoose.createConnection('mongodb+srv://christianv:AMracing5511@cluster0.0awfqdk.mongodb.net/Company');

const Employee = connComp.model('Employee', compschemes.Employee);  // One model per collection
const Device = connComp.model('Device', compschemes.Device);
const Account = connComp.model('Account', compschemes.Account);

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
    await Employee.find({empID:'301'}).then((res)=>{
        console.log(res[0]);
        res[0].skills = "";
        res[0].save().then(res=>{
            console.log(res);
        })
        
    })
}
Views();

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


/*
// Setter used on virtual property; can take in a full property at once and let the Schema remember the function
Employee.find({name:'Ryan Murphy'}).then((res)=>{
    res[0].fullName = 'Ryan Murphy';
    console.log(res[0].lName);
    res[0].save()
})
*/