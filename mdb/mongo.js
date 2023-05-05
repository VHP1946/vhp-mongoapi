const mongoose = require('mongoose'),
        path = require('path'),
        fs = require('fs');

const schemas = require('../models/vhp-schemas');
class VHPMongoClient{
    /**
     * Will attempt to connect to a mongodb server based on the
     * uri passed. You can pass function to afterConnect to run
     * after a connection has been successful.
     * 
     * @param {String} uri 
     * @param {Function} afterConnect 
     */
    constructor(uri,afterConnect=()=>{}){
        let startup = mongoose.createConnection(uri).asPromise();
        this.connection = null; //hold original conneciton
        this.admin = null; //hold admin access

        startup.then(conn=>{
            console.log('Connected');
            this.connection = conn;
            this.admin = this.connection.db.admin();
            afterConnect()
        }).catch(err=>{console.log(err)})
    }

    /**
     * Here are some notes on this
     * 
     * Employee_Account
     * 
     * @param {{db:String,collect:String,method:String,options:Object}} pack
     * @returns 
     */
    ROUTErequest(pack){
        return new Promise((resolve,reject)=>{
            var dbcursor = null; //holds the database to be request from
            var populates = []; //holds an array of items to collect at once
            this.CHECKforDB(pack.db).then(dbexists=>{
                if(dbexists){
                    //split collection OR check for '_' in collection field
                    // save to array
                    console.log(pack.collect);//ensure above array[0] exist as collection
                    populates = pack.collect.split('_');
                    pack.collect=populates.shift();
                    if(schemas[pack.collect]){//check that pack.collect has a schema
                        dbcursor = this.connection.useDb(pack.db,{useCache:true}).model(pack.collect,schemas[pack.collect]);
                        switch(pack.method.toUpperCase()){
                            case 'QUERY':{console.log('query');return resolve(this.QUERYdocs(dbcursor,pack,populates));break;}
                            case 'REMOVE':{console.log('remove');return resolve(this.REMOVEdocs(dbcursor,pack));break;}
                            case 'UPDATE':{console.log('update');return resolve(this.UPDATEdocs(dbcursor,pack));break;}
                            case 'INSERT':{console.log('insert');return resolve(this.INSERTdocs(dbcursor,pack));break;}
                        }
                        return resolve('could not resolve method');
                    }else{return resolve('No Collect');}
                }else{return resolve('No DB');}
            })
        });
    }

    QUERYdocs(dbcursor, pack,poplist=[]){
        return new Promise((resolve,reject)=>{
            let request = null;
            if(pack.options.query){
                if(poplist.length>0){//if there are things to populate, loop through and establish the connection
                    for(let x=0,l=poplist.length;x<l;x++){
                        if(schemas[pack.collect].virtuals[poplist[x]]){
                            this.connection.useDb(pack.db,{useCache:true}).model(schemas[pack.collect].virtuals[poplist[x]].options.ref,schemas[schemas[pack.collect].virtuals[poplist[x]].options.ref]);
                        }
                    }
                    request = dbcursor.find(pack.options.query,pack.options.projection,pack.options.options).populate(poplist);
                }else{request = dbcursor.find(pack.options.query,pack.options.projection,pack.options.options);}
                request.then((res)=>{
                    console.log(res);
                    return resolve(res);
                });
            }else{return resolve('No QUERY option provided');}
        });
    }

    REMOVEdocs(dbcursor,pack){
        return new Promise((resolve,reject)=>{
            return resolve(dbcursor.deleteMany(pack.options.query))
        });
    }
    INSERTdocs(dbcursor,pack){
        return new Promise((resolve,reject)=>{
            console.log('Docs',pack.options.docs);
            return resolve(dbcursor.insertMany(pack.options.docs))
        });
    }
    UPDATEdocs(dbcursor,pack){
        return new Promise((resolve,reject)=>{
            return resolve(dbcursor.updateMany(pack.options.query,pack.options.update));
        });
    }


    CHECKforDB(db){
        return new Promise((resolve,reject)=>{
            this.admin.listDatabases().then(res=>{
                console.log(res.databases)
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

