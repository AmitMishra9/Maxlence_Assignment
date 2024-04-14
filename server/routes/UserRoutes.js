const express = require('express');
const router = express.Router();

const imageUpload= require("../middleware/fileuploadMiddlewares");

const {getallUsers,deleteUser,updateUser,getuserByid,updateuserImage}  = require('../controllers/UserControllers');


router.get("/",getallUsers);
router.get("/getuserbyid",getuserByid);
router.patch("/updateuserbyid",updateUser);
router.delete("/deleteuserbyid",deleteUser);
router.patch("/updateuserimagebyid", imageUpload.single("image"),updateuserImage); 

module.exports= router;