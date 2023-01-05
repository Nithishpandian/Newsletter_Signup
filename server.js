const express = require("express")
const app = express()
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended:true}))
const https = require("https")
app.use(express.static("public"))

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")
})
app.post("/", function(req,res){
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const emailAddress = req.body.email;
    const data = {
        members:[{
            email_address : emailAddress,
            status : "subscribed",
            merge_fields : {
                FNAME : firstName,
                LNAME : lastName
            }
        }]
    }
    const jsonData = JSON.stringify(data)
    const url = "https://us14.api.mailchimp.com/3.0/lists/6e8f0db431"
    const options = {
        method : "POST",
        auth : "Nithish:7a66959f019ce39c11c7bcd37f7b88e4-us14"
    }

    const request = https.request(url, options, function(response){
        if (response.statusCode==200){
            res.sendFile(__dirname + "/success.html")
        }
        else{
            res.sendFile(__dirname + "/failure.html")
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
})

app.listen(3000, function(){
    console.log("Server is running in 3000");
})

// API - 7a66959f019ce39c11c7bcd37f7b88e4-us14
// AUDIENCE ID - 6e8f0db431