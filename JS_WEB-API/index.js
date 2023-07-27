const express = require('express');
const parser = require('body-parser');
const app = express();

const port = process.env.PORT || 3000;

app.use(parser.urlencoded({extended:true}));
app.use(parser.json());

app.get('/',(req, res)=>{
    res.send("Hello World..!!");
});

const emp_routes = require('./src/routes/employee_routes');

app.use('/employees', emp_routes);

app.listen(port,()=>{
    console.log(`Server has started on port ${port}`);
});