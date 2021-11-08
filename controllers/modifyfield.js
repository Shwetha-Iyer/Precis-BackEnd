// modifying a field to a particular document
const {connectDB,objectId} = require("../helpers/connection");
const modifyfield = async(collection_name,type,selector,selectorvalue,fieldvalue)=>{
        try{
                let db = await connectDB();
                if(type=="update")
                        await db.collection(collection_name).updateOne({[selector]:objectId(selectorvalue)},{$push:fieldvalue});
                else if(type=="add"){
                        if(selector=="_id")
                                await db.collection(collection_name).updateOne({[selector]:objectId(selectorvalue)},{$set:fieldvalue});
                        else
                                await db.collection(collection_name).updateOne({[selector]:selectorvalue},{$set:fieldvalue});    
                }
                else if(type==="click"){
                        await db.collection(collection_name).updateOne(selectorvalue,{$inc:fieldvalue});
                }
                else
                        await db.collection(collection_name).updateOne({[selector]:selectorvalue},{$unset:fieldvalue});
        }    
        catch(error){
                console.log(error);
        }
}
module.exports = modifyfield;