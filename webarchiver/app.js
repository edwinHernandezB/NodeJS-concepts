const express = require('express');
const path = require('path');
const {startCrawling}  = require('./public/archiverUtilities.js');

const app = express()
const port = 3000


app.use(express.static(path.join(__dirname, 'public')));

//here goes the routing 
app.get('/crawler', (req, res)=>{

  startCrawling(req, res)

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
