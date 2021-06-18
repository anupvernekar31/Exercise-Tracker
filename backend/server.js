const express= require('express');
const cors=require('cors');
require('dotenv').config();
const mongoose=require('mongoose');


const app=express();
const port=process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true});

const connection = mongoose.connection;
connection.once('open', function() {
  console.log("DB connected");
});

const exercisesRouter = require('./routes/exercises');
const usersRouter= require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);





app.listen(port, ()=> {
    console.log(`server started on port: ${port}`);
});

