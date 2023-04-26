//Libraries used in project
const path = require('path'),
      fs = require('fs'),
      http = require('http');
var {exec} = require('child_process');

const VHPMongoClient=require('./mdb/mongo');

let connectInfo ={
  user: 'christianv',
  pswrd: 'AMracing5511',
  db:'',
  cluster:'cluster0'
}
let uri = `mongodb+srv://${connectInfo.user}:${connectInfo.pswrd}@${connectInfo.cluster}.0awfqdk.mongodb.net/${connectInfo.db}?retryWrites=true&w=majority`

let vpack = {
  db:'',
  collect:'',
  method:'',
  options:{}
}
/*

    db:'Company',
    collect:'BlueUser',
    method:'INSERT',
    options:{
      docs:{
        empID:'06',
        fName:'test',
        lName:'Run',
        testprop:'test'
      }
    }
*/
let fpack={
  
}
let rpack={

}
let upack={}
let ipack={}


vpack.options = fpack;
vpack.options = upack;
vpack.options = rpack;
vpack.options = ipack;


let vmclient = new VHPMongoClient(uri,()=>{
  vmclient.ROUTErequest(vpack).then(res=>{console.log('RESULT >',res)}).catch(err=>{'ERROR Response >',err});
});


/*
var PORT = process.env.PORT || 8080//4050; //port for local host

var server = http.createServer();

server.on('request',(req,res)=>{
  //console.log('Request from mart');
  let data = '';
  req.on('data',chunk=>{data+=chunk;});

  req.on('end',()=>{
    //console.log(data)
    try{data=JSON.parse(data);}catch{data={};}

    let vpak=data;
    console.log('MART PACK',vpak);
    let log = { //prep request log
      process:'COREprocess',
      info:{
        url:req.url,
        cip:req.connection.remoteAddress,
      }
    }
    console.log(log);
  });
});

server.listen(PORT,()=>{console.log('VAPI Core Listening: ',PORT)});
*/