const {Core}=require('vhp-api');

let API = new Core({
    auth:{
        user:"VOGCH", 
        pswrd:"vogel123"
    },
    host:'http://192.168.100.151:4000/',
    sync:false, 
    dev:{comments:true}
});

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
  collect:'lrgTest',
  method:'INSERT',
  options:{
    docs: {}
  }
}

API.SENDrequest({pack:fpack}).then(answer=>{
    console.log(answer)
});