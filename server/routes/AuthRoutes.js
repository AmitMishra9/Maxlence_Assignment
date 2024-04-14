// authRoutes.js

const express = require('express');
const router = express.Router();

const imageUpload= require("../middleware/fileuploadMiddlewares");

const {register,login,requestPasswordReset}  = require('../controllers/AuthControllers');
//passwordreset, passwordforteg ,passwordchange

router.post("/login",login);
router.post("/register", imageUpload.single("image"),register);
// router.post("/passwordreset",passwordreset);
 router.post("/passwordforteg",requestPasswordReset);
// router.post("/passwordchange",passwordchange);

module.exports = router;
