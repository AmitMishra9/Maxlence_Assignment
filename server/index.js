
 require('dotenv').config();
const express=require('express');
const app=express();
const cors = require('cors');
const path = require('path');

const bodyParser=require('body-parser');
app.use(bodyParser.json());


app.use(cors());

app.use(express.static(path.join(__dirname, 'public', 'temp')));



// Routes Imports
const authRoutes=require("./routes/AuthRoutes");
const userRoutes=require("./routes/UserRoutes");






const PortNo=process.env.PORT || 8081;

app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/users',userRoutes);


app.listen(PortNo,()=>console.warn(`Server is up and runing on port ${PortNo}`));