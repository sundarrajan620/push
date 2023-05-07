const mongoose = require("mongoose");
 dburi = mongoose.connect("mongodb+srv://sundarrajan620:Zhty6wbaOPkOeJ9v@cluster0.h6ba5zl.mongodb.net/test");
//dburi = mongoose.connect("mongodb+srv://karthick:vk405060@cluster0.4rlq9xa.mongodb.net/?retryWrites=true&w=majority");
const express = require("express");

const app = express();

const questions =require("./routes/excelRoutes");
app.use('/api/1.0', questions);

const port =3000;

const start = async () => {
    try {
      await dburi;
     
        app.listen(port, () => {
          console.log(`App listening on port ${port}`);
        });
      
    } catch (e) {
      console.log(e);
    }
}

start();

