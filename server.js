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

let fpack={
  db:'Company',
  collect:'Employee',
  method:'QUERY',
  options:{
    query:{
      empID:{$gt:'01', $lt:'20'} 
    }
  }
}
let rpack={
  db:'Company',
  collect:'Employee',
  method:'REMOVE',
  options:{
    query:{
      empID:'07'
    }
  }
}
let upack={
  db:'Company',
  collect:'Employee',
  method:'UPDATE',
  options:{
    query:{
      empID:'07'
    },
    update:{
      fName:'First',
      lName:'Last'
    }
  }
}
let ipack={
  db:'Company',
  collect:'Employee',
  method:'INSERT',
  options:{
    docs:[{
      empID:'08',
      fName: 'test',
      lName: 'guy'
    },{
      empID:'09',
      fName: 'test',
      lName: 'guy'
    },{
      empID:'11',
      fName: 'test',
      lName: 'guy'
    }]
  }
}

let vmclient = new VHPMongoClient(uri,()=>{
  vmclient.ROUTErequest(fpack).then(res=>{console.log('RESULT >',res)}).catch(err=>{'ERROR Response >',err});
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