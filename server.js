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

var PORT = process.env.PORT || 8080//4050; //port for local host

var server = http.createServer();

server.on('request',(req,res)=>{//handle headers =>
  if(req.rawHeaders['Sec-Fetch-Site']!='same-origin'){
    if(false){//flag to handle cors, change in config file
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST');
      res.setHeader('Access-Control-Max-Age', 2592000); // 30 days
    }
  }
});
server.on('request',(req,res)=>{
  console.log('Request from mart');

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
    vmclient.ROUTErequest(vpak.pack).then(result=>{
      res.write(JSON.stringify(result));
      res.end();
    });
  });
});


let vmclient = new VHPMongoClient(uri,()=>{
  server.listen(PORT,()=>{console.log('VAPI Core Listening: ',PORT)});
});

