const express=require("express");

const router=express.Router();

const { getAllStats } = require("../controllers/About");

router.get("/stats", getAllStats);


module.exports=router
