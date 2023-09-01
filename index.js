
const express = require('express');
const mysql = require('mysql')
const cors = require('cors');
const { message } = require('statuses');
const app = express();
app.use(express.json());


app.use(cors({origin: true, credentials: true}))


const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"Miniproject"
})
db.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
  
    console.log('connected as id ' + db.threadId);
  });


app.get('/',(req,res)=>{
    return res.json("from backend kk side");
})


app.post('/register',async(req,res)=>{
  try{
 const username = req.body.username;
 const email = req.body.email;
 const password = req.body.password;
 const empid = req.body.empid;
 const gender = req.body.gender;
 const designation = req.body.designation;

 db.query("INSERT INTO employee (username,email,password,empid,gender,designation) VALUES (?,?,?,?,?,?)",[username,email,password,empid,gender,designation],
 (err, data) => {
     if (err) throw err;       
    
     console.log(data);
     // res.send('Post added...');
     return res.json({data:data, message: 'successfully created'})
 

 });
  }catch(err){
     alert("not registered")
  }

});



app.post('/login', (req,res)=>{
  try{
  const sql="SELECT * FROM employee WHERE  email=? AND password = ?";
  const email = req.body.email;
  const password = req.body.password;

  db.query(sql,[email,password],(err,data) => {
      if(err) return alert("Login failed");
      if(data.length>0){
          console.log(data);
       

         return res.json({data:data, message: 'Login successfull'})
      }else{
          
          return res.send({message:"no record found"});
          

      }
  })
}catch(err){
  alert("no login details found");
}
})



app.get(`/employeedata/:useremail`,(req,res)=>{
 const email=req.params.useremail;

 console.log("params",email)
  db.query(`SELECT * FROM employee WHERE email=${email}`,
      (err, result) => {
          if (err) throw err;
          console.log(result);
  
      
          return res.json(result);
      }
  
      );
  });






















app.listen(7000, () => {
      console.log(`Server is running at http://localhost:7000`);
    });