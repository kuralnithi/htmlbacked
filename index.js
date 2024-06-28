const express = require('express');
const cors = require("cors");
const app = express();
const htmlRouter = require('./Routes/html_route');

app.use(cors('*'));
app.use(express.json())

app.use('/api',htmlRouter);

app.listen(5000,()=>{
console.log('app listening on port 5000')}
);