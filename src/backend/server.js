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
app.post('/adminlogin',  (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ? AND password = ? AND role='admin'";
  console.log("student or admin 1")
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
app.post('/student-login',  (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ? AND password = ? AND  role='student'";
  console.log("student or admin 1")
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
  const { firstName,lastName, email, gender, dob, phno, address, password } = req.body;
  console.log("Form Data",req.body)
  // Insert the student into the database
  const query = 'INSERT INTO users (password,first_name,last_name, email, role,phone_no, gender, address, date_of_birth) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  console.log("phone number1",phno)
  console.log("first name",firstName)
  db.query(query, [password, firstName, lastName, email,'student',phno,  gender,address, dob ], (err, results) => {
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
  const { firstName,lastName, email, address, gender, phoneNumber, password,dob } = req.body;

  // Insert the teacher into the database
  const query = 'INSERT INTO users (password,first_name,last_name, email, role,phone_no, gender, address, date_of_birth) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  console.log("phone number1",phoneNumber)
  db.query(query, [password, firstName, lastName, email, 'teacher',phoneNumber,gender,address,dob ], (err, results) => {
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
  const qsql = `SELECT * FROM questions`;
  const [qresultu] = await DB.query(qsql);
  const total_marks = qresultu.length;
  const percentage = (marks/total_marks * 100)
 let  grade = 'F'
  if(percentage>90)
    grade = 'A'
  else if(percentage>80)
    grade = 'B'
  else if(percentage>70)
    grade = 'C'
  else if(percentage>60)
    grade = 'D'
  const query = `INSERT INTO answer_submission(marks,grade,user_id) VALUES (?,?,?)`
  console.log(marks,percentage,grade);
  const [fresult] = await DB.query(query,[marks,grade,payload.user_id]);

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
  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
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
  const query = `SELECT id, first_name,last_name, email, phone_no, address, gender, date_of_birth FROM users where role='student' `;
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});
app.get('/api/teachers', (req, res) => {
  const query = `SELECT id, first_name,last_name, email, phone_no, gender, address,date_of_birth FROM users where role='teacher'`;
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});
app.put('/apii/students', (req, res) => {
  console.log("update working...",req.body)
  const { email, firstname,lastname, ph_no, address, gender, dob } = req.body;
  
  const query = `
    UPDATE users
    SET first_name = ?,last_name = ?, phone_no = ?, address = ?, gender = ?, date_of_birth = ?
    WHERE email = ?`;

  db.query(query, [firstname,lastname, ph_no, address, gender, dob, email], (err, result) => {
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
  console.log("working update...")
  const { email } = req.params;
  const query = 'SELECT id, first_name,last_name, email, phone_no, address, gender, date_of_birth FROM users WHERE email = ?';

  db.query(query, [email], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.length === 0) {
      return res.status(404).send({ message: 'Student not found' });
    }
    console.log(results[0]);
    res.send(results[0]);
  });
});
// New route to fetch teacher details by email
app.get('/api/teachers/:email', (req, res) => {
  const { email } = req.params;
  const query = 'SELECT id, first_name,last_name, email, phone_no, gender, address,date_of_birth FROM users WHERE email = ?';

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
app.put('/api/updateteachers', (req, res) => {
  const { email, first_name,last_name, phone_no, gender, address,date_of_birth } = req.body;
  console.log("update teachers...",req.body)
  const query = `
    UPDATE users
    SET first_name = ?,last_name = ?, phone_no = ?, gender = ?, address = ?, date_of_birth = ?
    WHERE email = ?`;

  db.query(query, [first_name,last_name, phone_no, gender, address,date_of_birth, email], (err, result) => {
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
app.delete('/api/deletestudents/:studentId', (req, res) => {
  const { studentId } = req.params;
  const query = 'DELETE FROM users WHERE id = ?';

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
  const query = 'DELETE FROM users WHERE id = ?';

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
  console.log('test');
  const { user_id } = req.query.id; // Assuming user_id is passed as query parameter
  
  try {
    const query = `
      SELECT id, marks,grade
      FROM answer_submission
      WHERE user_id = ?
    `;
    
    const results = await db.query(query, [user_id]); // Execute the query with user_id parameter
    console.log(results,'test');

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
    const query = "SELECT * FROM users WHERE email = ? AND password = ? AND role='teacher'";
    console.log("email and password", email, password);
    db.query(query, [email, password], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      if (results.length > 0) {
        const user = results[0];  // Assuming `results[0]` contains the user data
        res.json({ success: true, user });  // Include user data in the response
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

  const query = 'SELECT marks,grade FROM answer_submission WHERE user_id = ? ORDER BY id DESC LIMIT 1';
  db.query(query, [userId], (err, results) => {
      if (err) {
          return res.status(500).json({ error: 'Database error' });
      }
      if (results.length > 0) {
          res.json({ success: true, marks: results[0].marks, grade:results[0].grade });
      } else {
          res.status(404).json({ error: 'No marks found for this user' });
      }
  });
});
// server.js
app.get('/exam-results', (req, res) => {
  const query = `
      SELECT 
          answer_submission.id, 
          answer_submission.marks, 
          student.name AS student_name,
          student.email AS student_email
      FROM 
          answer_submission
      INNER JOIN 
          student 
      ON 
          answer_submission.user_id = student.id`;

  db.query(query, (err, results) => {
      if (err) {
          return res.status(500).json({ error: 'Database error' });
      }
      res.json({ success: true, results });
  });
});

app.get('/api/users', (req, res) => {
  const { role, status } = req.query;

  if (role !== 'student' || status !== 'pending') {
    return res.status(400).json({ error: 'Invalid query parameters' });
  }

  const query = `
    SELECT 
      id, first_name, last_name, email, role, phone_no, gender, address, date_of_birth
    FROM 
      users 
    WHERE 
      role = ? AND status = ?`;

  db.query(query, [role, status], (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    res.json(results);
  });
});

// Approve a student
app.post('/api/users/:id/approve', (req, res) => {
  const { id } = req.params;
  const query = 'UPDATE users SET status = ? WHERE id = ? AND role = ? AND status = ?';
  db.query(query, ['approved', id, 'student', 'pending'], (err, results) => {
    if (err) {
      console.error('Error approving student:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Student not found or already approved' });
    }
    res.status(200).json({ message: 'Student approved successfully' });
  });
});

// Reject a student
app.post('/api/users/:id/reject', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM users WHERE id = ? AND role = ? AND status = ?';

  db.query(query, [id, 'student', 'pending'], (err, results) => {
    if (err) {
      console.error('Error deleting student:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Student not found or already rejected' });
    }
    res.status(200).json({ message: 'Student rejected and deleted successfully' });
  });
});

app.get('/users/status', (req, res) => {
  const userId = req.query.user_id;
  console.log("fetching students")
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  const query = 'SELECT status FROM users WHERE id = ?';

  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database query error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const status = results[0].status;
    res.json({ status });
  });
});



app.get('/api/teacherusers', (req, res) => {
  const { role, status } = req.query;
  const query = 'SELECT * FROM users WHERE role = ? AND status = ?';
  
  db.query(query, [role, status], (err, results) => {
    if (err) {
      console.error('Error fetching teachers:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json(results);
  });
});

// Approve teacher
app.post('/api/teacherusers/:id/approve', (req, res) => {
  const { id } = req.params;
  const query = 'UPDATE users SET status = ? WHERE id = ? AND role = ? AND status = ?';
  
  db.query(query, ['approved', id, 'teacher', 'pending'], (err, results) => {
    if (err) {
      console.error('Error approving teacher:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Teacher not found or already approved' });
    }
    res.status(200).json({ message: 'Teacher approved successfully' });
  });
});

// Reject and delete teacher
app.post('/api/teacherusers/:id/reject', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM users WHERE id = ? AND role = ? AND status = ?';

  db.query(query, [id, 'teacher', 'pending'], (err, results) => {
    if (err) {
      console.error('Error rejecting teacher:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Teacher not found or already rejected' });
    }
    res.status(200).json({ message: 'Teacher rejected and deleted successfully' });
  });
});

app.get('/checkusers/status', (req, res) => {
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  const query = 'SELECT status FROM users WHERE id = ? AND role = ?';
  
  db.query(query, [user_id, 'teacher'], (err, results) => {
    if (err) {
      console.error('Error fetching user status:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { status } = results[0];
    res.status(200).json({ status });
  });
});
app.post('/api/feedback', (req, res) => {
  const { id, email, phone, feedback } = req.body;

  const query = 'INSERT INTO feedback (id, email, ph_no, feedback) VALUES (?, ?, ?, ?)';

  db.query(query, [id, email, phone, feedback], (err, results) => {
    if (err) {
      console.error('Error inserting feedback:', err);
      return res.status(500).json({ success: false, error: 'Failed to insert feedback' });
    }
    res.status(200).json({ success: true, message: 'Feedback submitted successfully' });
  });
});
app.get('/feedback', (req, res) => {
  db.query('SELECT * FROM feedback', (error, results) => {
    if (error) {
      console.error('Error fetching feedback:', error);
      res.json({ success: false, error: 'Failed to fetch feedback' });
    } else {
      res.json({ success: true, feedbacks: results });
    }
  });
});

app.listen(8081, () => {
    console.log("Devika Listening on port 8081");
});