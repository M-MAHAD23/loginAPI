const express = require('express');
const app = express();
const upload = require('./multermiddleware/multer');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
require('dotenv/config');
const port = process.env.PORT || 3000;
const staffSchema = require('./model/staffSchema')

//IMPORT ROUTES
const blogroutes = require('./routes/blogRoutes.js');
const staffroutes = require('./routes/staffRoutes.js');
const { findOne } = require('./model/staffSchema');

//MIDDLEWARE
app.use(express.json())
app.use('/staff', staffroutes)
const verifyToken = require('./routes/verifyToken')

app.use(verifyToken)
app.use('/blog', blogroutes);

//ROUTES
app.get('/', (req, res) => {
  res.send('WE ARE AT HOME OF BLOGS ;) (:')
})



//CONNECTING TO THE DB HERE
mongoose.connect(process.env.DB_CONNECTION)

//LISTENIGN TO OUR SERVER
app.listen(3000, () => console.log(`Server started on port ${port}`));