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
app.listen(8081, () => {
    console.log("Devika Listening on port 8081");
});