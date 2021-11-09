const express = require("express");
const router = express.Router();
var shortUrl = require('node-url-shortener');
const find_doc = require("../controllers/find_doc");
const modifyfield = require("../controllers/modifyfield");
const { objectId } = require("../helpers/connection");
const {COLLECTION_NAME} = require("../helpers/environment");
var randomstring = require("randomstring");
router.post("/createurl", async(req, res) => {
    try{
        let checkuser = await find_doc(COLLECTION_NAME,{email:req.body.email});
        if(checkuser){
            var url = randomstring.generate(12);
            await modifyfield(COLLECTION_NAME,"update","_id",objectId(checkuser._id),{links:{original_url:req.body.url,short_url:url,clicks:0}});
            links = [...checkuser.links,{original_url:req.body.url,short_url:url,clicks:0}]
            res.status(200).json(links);
        }
        else{
            res.status(404).send("User Not Found!");
        }
    }
    catch(error){
        console.log(error);
        res.status(500).send("Internal Server Error!");
    }
});
module.exports = router;
