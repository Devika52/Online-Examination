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
app.post('/admin_login', (req, res) => {
  const { username, password } = req.body;
  console.log("the data on /admin_login",req.body)
  const sql = "SELECT * FROM admin WHERE username = ? AND password = ?";
  db.query(sql, [username, password], (err, data) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
    if (data.length > 0) {
      console.log('Login successful:', data);
      return res.json({ success: true, message: 'Login successful' });
    } else {
      console.log('Login failed: No record found');
      return res.json({ success: false, message: 'Invalid username or password' });
    }
  });
});
app.post('/student/register', (req, res) => {
    const { fullName, email, gender, dob, address } = req.body;
  
    // Insert into MySQL table
    const sql = 'INSERT INTO students (name, email, gender, dob, address) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [fullName, email, gender, dob, address], (err, result) => {
      if (err) {
        console.error('Database insert error:', err);
        return res.status(500).json({ success: false, error: 'Failed to register student' });
      }
      console.log('Student registered:', result);
      res.status(200).json({ success: true, message: 'Student registered successfully' });
    });
  });
app.listen(8081, () => {
    console.log("Listening on port 8081");
});