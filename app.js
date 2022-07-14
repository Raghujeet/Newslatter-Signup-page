// Jshint esversion: 6
const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");

});

app.post("/", function(req, res) {
  const firstname = req.body.fname;
  const lastname = req.body.lname
  const email = req.body.email;

  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstname,
        LNAME: lastname
      }
    }]
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us9.api.mailchimp.com/3.0/lists/f83843edbb";

  const options = {
    method: "POST",
    auth: "roy:152a31d09a1bbe5dca124e4f9a7c3122-us9"
  };

  const request = https.request(url, options, function(response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }



    response.on("data", function(data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();

});

app.post("/failure", function(req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("server running on port 3000.")
});


//API Key
//  152a31d09a1bbe5dca124e4f9a7c3122-us9


//
