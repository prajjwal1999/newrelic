const express=require("express")
const app=express()
require('newrelic');
var mysql = require('mysql');
app.set("view engine","ejs")
app.set("views","./views")

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  port:3306,
  database:"crud"

});


con.connect(function(err) {
    if (err) throw err;
    else
    console.log("Connected!");
   
  });
  app.get("/",(req,res)=>{
      res.render("home")
  })
  app.get("/register",(req,res)=>{
      res.render("register")
  })
  app.get("/addstudent",(req,res)=>{
      console.log(req.query);

    
    var sql = "INSERT INTO new_table (name,email,password) VALUES ?";
    var values = [
      [req.query.name, req.query.email,req.query.password],
      
    ];
    con.query(sql, [values], function (err, result) {
      if (err) throw err;
      console.log("Number of records inserted: " );
      res.redirect("/")
    })
    

  })
  ///////////////////
  app.get("/search",(req,res)=>{
      res.render("search")
  })
app.get("/searchid",(req,res)=>{
    console.log(req.query.search)
    var values = [
        [req.query.search]
        
      ];
    var sql = 'SELECT * FROM new_table WHERE email = ?';
    con.query(sql, [values], function (err, result) {
      if (err) throw err;
      else{
          console.log("result is finded");
          res.render('find', { title: 'User Find', userData: result});

      console.log(result);
      }
    });
    

})
app.get("/user-find",(req,res)=>{
  res.render("find")
})
///////////////////
app.get("/delete",(req,res)=>{
    res.render("delete")
})
app.get("/deleteid",(req,res)=>{
    var values = [
        [req.query.email]
        
      ];
  console.log(values)
    
    var sql = "DELETE FROM new_table WHERE email = ?";
  con.query(sql, [values],function (err, result) {
    if (err) 
    throw err;
    console.log("Number of records deleted: " + result.affectedRows);
  });
  res.redirect("/");

})
/////////////////
app.get("/update",(req,res)=>{
    res.render("update")
})
app.get("/updatestudent",(req,res)=>{
    var name=(req.query.name)
    var idx=(req.query.id);

    var pwd=(req.query.password)
    var mail=req.query.email;

    

    var sql = "UPDATE new_table set name =? , email =?,password=?  WHERE email = ?";
 
    con.query(sql, [name,mail,pwd,idx], (err, result) =>{
    console.log("Record Updated!!");
    console.log(result);
    res.redirect("/")
});
///////////////
    
})
////////////////////////////////
app.get('/user-list', (req, res, next) =>{
    var sql='SELECT * FROM new_table';
    con.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('user-list', { title: 'User List', userData: data});
  });
});
//////////////////
app.listen(3000,()=>{
    console.log("server is ruunign at 3000")


})
