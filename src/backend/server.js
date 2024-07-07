const express = require('express');
const mysql = require('mysql');
const mysql2 = require('mysql2');
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

const DB = mysql2
  .createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'examination',
  })
  .promise();



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
  const { fullName, email, gender, dob, phno, address, password } = req.body;
  console.log("Form Data",req.body)
  // Insert the student into the database
  const query = 'INSERT INTO student (name, email, gender, dob, ph_no, address, password) VALUES (?, ?, ?, ?, ?, ?, ?)';
  console.log("phone number1",phno)
  db.query(query, [fullName, email, gender, dob, phno, address, password], (err, results) => {
    if (err) {
      console.error('Error occurred:', err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    console.log("phone number2",phno)
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
    res.status(201).json({success: 'true', results,message: 'Question Added successfully!' });
  })
})

app.post('/questions/submit_answers',async (req,res)=>{
  const payload = req.body;
  console.log(payload);
  const formdata= payload.formData
  let marks=0;
  const sql = `SELECT answer FROM questions WHERE id = ?`
  for (const [key, value] of Object.entries(formdata)) {
    const [resultu] = await DB.query(sql,[key]);
        if(resultu[0].answer===value)
         marks+=1;
  }
  const query = `INSERT INTO answer_submission(marks,user_id) VALUES (?,?)`
  console.log(marks);
  const [fresult] = await DB.query(query,[marks,payload.user_id]);

  res.json({
    success: true,
    submission_id: fresult.insertId
  })
  // db.query(query, [question, option_1, option_2, option_3,option_4,answer], (err, results) => {
  //   if (err) {
  //     console.error('Error occurred:', err);
  //     res.status(500).json({success:'false', message: 'Internal server error' });
  //     return;
  //   }
  //   res.status(201).json({success: 'true', message: 'Question Added successfully!' });
  // })

})

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM student WHERE email = ? AND password = ?';
  console.log("login",req.body)
  db.query(query, [email, password], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.length > 0) {
      res.json({ success: true });
    } else {
      console.log(results)
      res.json({ success: false });
    }
  });
});
app.get('/api/students', (req, res) => {
  const query = 'SELECT student_id, name, email, ph_no, address, gender, dob FROM student';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});
app.get('/api/teachers', (req, res) => {
  const query = 'SELECT teacher_id, name, email, ph_no, gender, address FROM teacher';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});
app.put('/api/students', (req, res) => {
  const { email, name, ph_no, address, gender, dob } = req.body;
  const query = `
    UPDATE student
    SET name = ?, ph_no = ?, address = ?, gender = ?, dob = ?
    WHERE email = ?`;

  db.query(query, [name, ph_no, address, gender, dob, email], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: 'Student not found' });
    }
    res.send({ message: 'Student details updated successfully' });
  });
});
app.get('/api/students/:email', (req, res) => {
  const { email } = req.params;
  const query = 'SELECT student_id, name, email, ph_no, address, gender, dob FROM student WHERE email = ?';

  db.query(query, [email], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.length === 0) {
      return res.status(404).send({ message: 'Student not found' });
    }
    res.send(results[0]);
  });
});
// New route to fetch teacher details by email
app.get('/api/teachers/:email', (req, res) => {
  const { email } = req.params;
  const query = 'SELECT teacher_id, name, email, ph_no, gender, address FROM teacher WHERE email = ?';

  db.query(query, [email], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.length === 0) {
      return res.status(404).send({ message: 'Teacher not found' });
    }
    res.send(results[0]);
  });
});

// New route to update teacher details
app.put('/api/teachers', (req, res) => {
  const { email, name, ph_no, gender, address } = req.body;
  const query = `
    UPDATE teacher
    SET name = ?, ph_no = ?, gender = ?, address = ?
    WHERE email = ?`;

  db.query(query, [name, ph_no, gender, address, email], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: 'Teacher not found' });
    }
    res.send({ message: 'Teacher details updated successfully' });
  });
});
// New route to delete a student by student_id
app.delete('/api/students/:studentId', (req, res) => {
  const { studentId } = req.params;
  const query = 'DELETE FROM student WHERE student_id = ?';

  db.query(query, [studentId], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: 'Student not found' });
    }
    res.send({ message: 'Student deleted successfully' });
  });
});
// New route to delete a teacher by teacher_id
app.delete('/api/teachers/:teacherId', (req, res) => {
  const { teacherId } = req.params;
  const query = 'DELETE FROM teacher WHERE teacher_id = ?';

  db.query(query, [teacherId], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: 'Teacher not found' });
    }
    res.send({ message: 'Teacher deleted successfully' });
  });
});
app.get('/results', async (req, res) => {
  const { user_id } = req.query; // Assuming user_id is passed as query parameter
  
  try {
    const query = `
      SELECT id, marks
      FROM answer_submission
      WHERE user_id = ?
    `;
    
    const results = await db.query(query, [user_id]); // Execute the query with user_id parameter

    // Send the results as JSON response
    res.json({ success: true, studentMarks: results });
  } catch (error) {
    console.error('Error fetching student marks:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});
app.post('/teacher-login', (req, res) => {
  const { email, password, role } = req.body;

  if (role === 'Teacher') {
    const query = 'SELECT * FROM teacher WHERE email = ? AND password = ?';
    console.log("email and password",email,password)
    db.query(query, [email, password], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      if (results.length > 0) {
        res.json({ success: true });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    });
  } else {
    res.status(400).json({ error: 'Invalid role' });
  }
});
// server.js
app.get('/results/:userId', (req, res) => {
  const userId = req.params.userId;

  const query = 'SELECT marks FROM answer_submission WHERE user_id = ? ORDER BY id DESC LIMIT 1';
  db.query(query, [userId], (err, results) => {
      if (err) {
          return res.status(500).json({ error: 'Database error' });
      }
      if (results.length > 0) {
          res.json({ success: true, marks: results[0].marks });
      } else {
          res.status(404).json({ error: 'No marks found for this user' });
      }
  });
});

app.listen(8081, () => {
    console.log("Devika Listening on port 8081");
});