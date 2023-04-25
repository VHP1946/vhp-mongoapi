const mongoose = require('mongoose'),
        path = require('path'),
        fs = require('fs');


const schemas = require('../models/vhp-schemas');

class VHPMongoClient{
    constructor(uri,afterConnect=()=>{}){
        let startup = mongoose.createConnection(uri).asPromise();
        this.connection = null; //hold original conneciton
        this.admin = null; //hold admin access

        startup.then(conn=>{
            this.connection = conn;
            this.admin = this.connection.db.admin();

            this.ROUTErequest({db:'Company',collect:'Employee'}).then(
                answr=>{console.log(answr)}
            )
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
            var dbcursor = null;
            this.CHECKforDB(pack.db).then(dbexists=>{
                if(dbexists){
                    //check for pack.collect
                    if(schemas[pack.collect]){
                        dbcursor = this.connection.useDb(pack.db).model(pack.collect,schemas[pack.collect]);
                        switch(pack.method){
                            case 'QUERY':{return resolve(dbcursor.find({empID:'58'}))}
                            case 'REMOVE':{return resolve('not started')}
                            case 'UPDATE':{return resolve('not started')}
                            case 'INSERT':{return resolve('not started')}
                        }
                        return resolve('could not resolve method');
                    }else{console.log('NO SCHEMA')}
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
module.exports=VHPMongoClient;

