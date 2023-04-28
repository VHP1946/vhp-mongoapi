const mongoose = require('mongoose'),
        path = require('path'),
        fs = require('fs');


const schemas = require('../models/vhp-schemas');

console.log(schemas['Ticket']);
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
     * @param {{db:String,collect:String,method:String}} pack
     * @returns 
     */
    ROUTErequest(pack){
        return new Promise((resolve,reject)=>{
            var dbcursor = null; //holds the database to be request from
            this.CHECKforDB(pack.db).then(dbexists=>{
                if(dbexists){
                    console.log(pack.collect);
                    if(schemas[pack.collect]){//check that pack.collect has a schema
                        dbcursor = this.connection.useDb(pack.db).model(pack.collect,schemas[pack.collect]);
                        //console.log('Schema >',JSON.stringify(dbcursor.schema.obj.empID));
                        switch(pack.method){
                            case 'QUERY':{
                                if(pack.options.query){
                                    return resolve(dbcursor.find(pack.options.query));
                                }else{
                                    return resolve('No QUERY option provided');
                                }
                            }
                            case 'REMOVE':{return resolve(dbcursor.deleteMany(pack.options.query))}
                            case 'UPDATE':{return resolve(dbcursor.updateMany(pack.options.query,pack.options.update))}
                            case 'INSERT':{return resolve(dbcursor.insertMany(pack.options.docs))}
                        }
                        return resolve('could not resolve method');
                    }else{return resolve('No Collect');}
                }else{return resolve('No DB');}
            })
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
    QUERYmongo(){
        if(pack.options.query){
            return resolve(dbcursor.find(pack.options.query));
        }else{
            return resolve('No QUERY option provided');
        }
    }
}
module.exports=VHPMongoClient;

