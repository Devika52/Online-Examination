const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const multer=require('multer')
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'examination',
});



// POST route for admin login
app.post('/login',  (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
   db.query(sql, [username, password], (err, data) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
    if (data.length > 0) {
      console.log(data[0]);
      return res.json({ success: true, message: 'Login successful', data:data[0] });
    } else {
      console.log('Login failed: No record found');
      return res.json({ success: false, message: 'Invalid username or password' });
    }
  });
});
app.post('/student/register', (req, res) => {
  const { fullName, email, gender, dob, address, password } = req.body;

  // Insert the student into the database
  const query = 'INSERT INTO student (name, email, gender, dob, address, password) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [fullName, email, gender, dob, address, password], (err, results) => {
    if (err) {
      console.error('Error occurred:', err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    res.status(201).json({ message: 'Student registered successfully!' });
  });
});
app.post('/teacher/register', (req, res) => {
  const { name, email, address, gender, phoneNumber, password } = req.body;

  // Insert the teacher into the database
  const query = 'INSERT INTO teacher (name, email, address, gender, ph_no, password) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [name, email, address, gender, phoneNumber, password], (err, results) => {
    if (err) {
      console.error('Error occurred:', err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    res.status(201).json({ message: 'Teacher registered successfully!' });
  });
});

app.post('/questions/add',(req,res)=>{
  const { question, option_1, option_2, option_3, option_4, answer } = req.body;
  const query = 'INSERT INTO questions(question,option_1,option_2,option_3,option_4,answer) VALUES (?,?,?,?,?,?)'
  db.query(query, [question, option_1, option_2, option_3,option_4,answer], (err, results) => {
    if (err) {
      console.error('Error occurred:', err);
      res.status(500).json({success:'false', message: 'Internal server error' });
      return;
    }
    res.status(201).json({success: 'true', message: 'Question Added successfully!' });
  })

})

app.get('/questions/get',(req,res)=>{
  const sql = 'SELECT * FROM questions'
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error occurred:', err);
      res.status(500).json({success:'false', message: 'Internal server error' });
      return;
    }
    console.log(results);
    res.status(201).json({success: 'true', results,message: 'Question Added successfully!' });
  })
})

app.listen(8081, () => {
    console.log("Devika Listening on port 8081");
});