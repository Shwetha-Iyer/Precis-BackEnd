const express = require("express");
const router = express.Router();
const find_doc = require("../controllers/find_doc");
const modifyfield = require("../controllers/modifyfield");
const { objectId } = require("../helpers/connection");
const {COLLECTION_NAME} = require("../helpers/environment");
router.post("/updateclicks", async(req, res) => {
    try{
        
            await modifyfield(COLLECTION_NAME,"click","_id",{email:req.body.email,"links.short_url":req.body.short_url},{"links.$.clicks":1});
            let data = await find_doc(COLLECTION_NAME,{email:req.body.email});
            res.status(200).json(data.links);
        
    }
    catch(error){
        console.log(error);
        res.status(500).send("Internal Server Error!");
    }
});
module.exports = router;