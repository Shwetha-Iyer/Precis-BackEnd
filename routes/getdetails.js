const express = require("express");
const router = express.Router();
const find_doc = require("../controllers/find_doc");
const {COLLECTION_NAME} = require("../helpers/environment");
router.get("/getdetails/:email", async(req, res) => {
    try{
        let checkuser = await find_doc(COLLECTION_NAME,{email:req.params.email});
        if(checkuser){
            res.status(200).json({
                firstname:checkuser.firstname,
                lastname:checkuser.lastname,
                email:checkuser.email,
                links:checkuser.links
            });
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
