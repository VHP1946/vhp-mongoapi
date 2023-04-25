const mongoose = require('mongoose'),
        path = require('path'),
        fs = require('fs');


const compschemes = require('../models/CompanySchemes.js');

class VHPMongoClient{
    constructor(uri,afterConnect=()=>{}){
        let startup = mongoose.createConnection(uri).asPromise();
        this.connection = null; //hold original conneciton
        this.admin = null; //hold admin access
        this.dbCursor = null; //holds the current dbCursor, may not need and can hold in function

        startup.then(conn=>{
            this.connection = conn;
            this.admin = this.connection.db.admin();
            this.admin.listDatabases().then(res=>{console.log('Clusters Databases >',res)});

            /*
            this.dbCursor=this.connection.useDb('Companyss').model('Employee', compschemes.empSchema);
            this.dbCursor.find({empID:'58'}).then(res=>{console.log('Results >',res)})
            afterConnect();
            */
        }).catch(err=>{console.log(err)})
    }

    /**
     * Here are some notes on this
     * 
     * @param {{db:String,collect,method}} pack
     * @returns 
     */
    ROUTErequest(pack){
        return new Promise((resolve,reject)=>{
            this.CHECKforDB(pack.db).then(dbexists=>{
                if(dbexists){
                    //check for pack.collect

                }
            })
        });
    }

    CHECKforDB(db){
        return new Promise((resolve,reject)=>{
            this.admin.listDatabases().then(res=>{
                if(res.databases){
                    for(let x=0,l=res.databases.length;x<l;x++){
                        if(db===res.databases[x].name){return resolve(true);}
                    }
                    return resolve(false);
                }else{return resolve(false);}
            }).catch(err=>{return resolve(false);})
        })
    }
}


let n = new VHPMongoClient();
n.ROUTErequest()
module.exports=VHPMongoClient;

