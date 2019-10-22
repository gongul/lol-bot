const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = require('./src/router');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

router(app);

const server = app.listen(3000,()=>{
    console.log("server on");
});