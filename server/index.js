var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();
var http = require("http");
const cors = require('cors');
const multer = require("multer");
const path = require("path");

// const fileUpload = require('express-fileupload');
// app.use(fileUpload());

var dbcon = require("./dbconnection");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


//api for upload 



//api for list employee detail

app.get("/employeeList", (request, response) => {
  var sqlQuery = "Select * from tbl_employee";
  dbcon.query(sqlQuery, (error, result) => {
    if (error) throw error;
    response.send({ result })
    // response.json({result});
    //  data[Status]=200;  //  data[message] ="success"     response.send(data);   response.send({data});   response.send(data);
    // response.send("success");
  })

})


//TEST GET API
app.get('/', function (req, res, next) {
  res.json({ message: 'EXPRESS SERVER RUN' });
});


//for login 
app.post("/formLogin", function (req, res) {
  var username = req.body.data.username;
  var password = req.body.data.password;
  console.log(username, password);
  res.send("success");

})

//upload a image 





//get all query for contact and detail
app.get("/getAllQueryDetail", (req, res) => {
  let getQueryDetail = "SELECT * FROM tbl_message "
  dbcon.query(getQueryDetail, (error, result) => {
    if (!error) {
      res.json(result);
    }
    else {
      res.json(error)
    }

  })
})


//save query detail 
app.post("/saveConatctQuery", (request, response) => {
  var reply = "Your data has been received";
  var name = request.body.userDetail.name;
  var email = request.body.userDetail.email;
  var subject = request.body.userDetail.subject;
  var message = request.body.userDetail.message;

  const sqlSave = "INSERT INTO tbl_message (name, email, subject, message) VALUES (?, ?, ?,?)";
  dbcon.query(sqlSave, [name, email, subject, message], (error, result) => {
    if (!error) {
      response.json("success");
    }
    else {
      response.json("fail");
    }
  })
  //console.log(`User Name- ${name} User Mail - ${email} User subject-${subject}User  message-${message}`)
  // console.log(userName)
  // response.send(reply)
  //response.json("Your data Received");
})


// get all posted Blog  API 

app.get("/getAllBlog", (req, res)=>{
  var sqlblog ="SELECT * FROM tbl_blog";
  dbcon.query(sqlblog, (error, result)=>{
    if(!error)
    {
      res.json(result);
         }
    else{
      res.json(error);
    }
  })
})

//save blog post API
app.post("/saveBlog",(req, res)=>{
  let title =req.body.data.title;
  let subtitle = req.body.data.subtitle;
  let description = req.body.data.description;
  // let coverphoto =req.body.data.coverphoto;
  // console.log(title,"-",subtitle,"-",description,"-",)
  sqlblogQuery ="INSERT INTO tbl_blog (title, subtitle, description) VALUES ( ?, ?,?)";
  dbcon.query(sqlblogQuery,[title,subtitle,description], (error, result)=>{
    if(!error)
    {
      res.json("success");
      // console.log(result);
    }
    else{
      res.json("fail");
      // console.log(error);
    }
  } )

})



//save team member 

app.post("/saveTeamMember", (req, res) => {
  var name = req.body.teamData.name;
  var mobile = req.body.teamData.mobile;
  var designation = req.body.teamData.designation;
  var doj = req.body.teamData.doj;
  // console.log(name, mobile,designation,doj);
  var saveTeamSql = "INSERT INTO tbl_team (name, mobile, designation, doj) VALUES (?, ?, ?, ?)";
  dbcon.query(saveTeamSql, [name, mobile, designation, doj], (error, result) => {
    if (!error) {
      res.json("success")
    }
    else {
      res.json("fail");
      //console.log(error);
    }
  })

})


app.get("/getAllTeamMember", (req, res) => {
  var sqlTeam = "SELECT * FROM tbl_team";
  dbcon.query(sqlTeam, (error, result) => {
    if (!error) {
      res.json(result);
    }
    else {
      res.json(error)
    }

  })
})



app.get("/getUserDetail", function (request, response) {

  const savedData = [{ name: "surendra Yadav", email: "sky@gmail.com", subject: "React JS", message: "hello Great" },
  { name: "surendra ", email: "skyadav@gmail.com", subject: " JS Devel", message: "hello Great good" },
  { name: "Test ", email: "Test@gmail.com", subject: " Test Devel", message: "hello Great good Test" }]
  response.json(savedData)
})








app.listen(5000);

console.log("Running at Port 5000");