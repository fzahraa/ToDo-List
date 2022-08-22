//without db
const express = require("express");
const bodyParser = require("body-parser");
var items=["Buy Food", "Cook Food", "Eat Food"];
var workItems=[];
const app = express();
const date= require(__dirname + "/date.js");
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.get("/", function(req, res){


  //var currentDay = today.getDay();
  var day = date.getDay();
  //day = date.getDate();
  //if(currentDay === 6 || currentDay ===0){
  //  day = "Weekend";
  //}
  //else{
  //  day = "Weekday";
  //}
  res.render("list", {listTitle : day, newListItems:items});
});

app.post("/", function(req, res){
  let item = req.body.newItem;
  if(req.body.list === "Work"){
    workItems.push(item);
    res.redirect("/work");
  }else{
    items.push(item);
    res.redirect("/");
  }

  console.log(item);
})
app.get("/work", function(req, res){
  res.render("list", {listTitle: "Work List", newListItems:workItems});
});
app.post("/work", function(req, res){
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});
app.listen(3000, function(){
  console.log("Server is starting at port 3000");
});
