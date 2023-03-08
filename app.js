
const express =  require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
  res.send("server is running at port 3000");
});


app.listen(3000, function(){
  console.log("server is running at port 3000");
});
