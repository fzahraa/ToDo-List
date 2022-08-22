//with db
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date= require(__dirname + "/date.js");
const _ = require("lodash");

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

//mongoose.connect("mongodb://localhost:27017/todolistDB");
mongoose.connect("mongodb+srv://admin-Zara:Test123@cluster0.bpi4pi3.mongodb.net/todolistDB");
const itemsSchema = {
  name: String
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name : "Bread!"
});

const item2 = new Item({
  name : "Butter"
});

const item3 = new Item({
  name : "Eggs"
});

const defaultItems = [item1, item2, item3];

const listSchema = {
  name : String,
  items : [itemsSchema]
};

const List = mongoose.model("List", listSchema);

app.get("/", function(req, res){
  Item.find({}, function(err, foundItems){
    if(foundItems.length ===0){
    Item.insertMany(defaultItems, function(err){
      if(err){
        console.log(err);
      }
      else{
        console.log(defaultItems);
      }
    });
    res.redirect("/");
  }else{
    console.log(foundItems.name);
    res.render("listDB", {listTitle : "Today", newListItems:foundItems});
  }
  });
});

app.post("/", function(req, res){
  let itemName = req.body.newItem;
  const listName = req.body.list;

  console.log(itemName);
  const item = new Item({
    name : itemName
  });
  if(listName === "Today"){
    item.save();
    res.redirect("/");
  }else{
    List.findOne({name:listName}, function(err, foundList){
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName);
    });
  }
});

app.post("/delete", function(req, res){
  const checkedItemId = req.body.checkbox;
  const listName = req.body.list;

  console.log(checkedItemId);
  if(listName === "Today"){
  Item.findByIdAndRemove(checkedItemId, function(err){
    if(!err){
      console.log("Successfully deleted the checked item");
      res.redirect("/");
    }
  });
}else{
  List.findOneAndUpdate({name:listName}, {$pull : {items : {_id : checkedItemId}}}, function(err){
    if(!err){
      res.redirect("/", listName);
    }
  });
}
});

app.get("/:customListName", function(req, res){
  const customListName = _.capitalize(req.params.customListName);
  List.findOne({name: customListName}, function(err, foundList){
    if(!err){
      if(!foundList){
        console.log("Doesn't exist")
        const list = new List({
          name : customListName,
          items: defaultItems
        });
        list.save();
        res.redirect("/" + customListName);
      }else{
        console.log("Exists");
        res.render("listDB", {listTitle : foundList.name, newListItems:foundList.items});
      }
    }
  });

});

app.listen(3000, function(){
  console.log("Server is starting at port 3000");
});
