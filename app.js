
const express =  require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  }

  const jsonData = JSON.stringify(data);

  const url = "https://us21.api.mailchimp.com/3.0/lists/732d69e084";

  const options = {
    method: "POST",
    auth: "kabiru:103e5f04713a17c148cacb0e8420cb63-us21"
  }

  const request = https.request(url, options, function(response){
    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })

  request.write(jsonData);
  request.end();

})






app.listen(3000, function(){
  console.log("server is running at port 3000");
});


// APIkey: 103e5f04713a17c148cacb0e8420cb63-us21
// list ID: 732d69e084
