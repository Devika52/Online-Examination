import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './Home';
import StudentRegistration from './studentregister';
import AdminLogin from './adminlogin';
import Admin from './adminpage';
import Registration from './Registration';
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Mainlogin from './Mainlogin';
import TeacherLogin from './TeacherLogin';
import StudentLogin from './StudentLogin';
import Appp from './Question1';
import Teacher from './Teacher';
import ViewQuestions from './questions/ViewQuestions';
import Results from './results/Results';
import StudentList from './StudentList';
import TeacherList from './TeacherList';
import UpdateStudent from './UpdateStudent';
import UpdateTeacher from './UpdateTeacher';
import DeleteStudent from './DeleteStudent';
import DeleteTeacher from './DeleteTeacher';
import ViewExamResults from './Examresults';
import AddQuestion from './questions/AddQuestion';
import StudentApproval from './studentApproval';
import TeacherApproval from './TeacherApproval';
import ViewFeedback from './ViewFeedback';
import DeleteQuestion from './questions/DeleteQuestion';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <Router>
      <Routes>
       <Route path="/" element={<Home/>}/>
        <Route path="/admin" element={<Admin />} />
        <Route path="/student-register" element={<StudentRegistration/>}/>
        {/* <Route path="/Main-login" element={<Mainlogin/>}/> */}
        <Route path="/teacher-register" element={<Registration/>}/>
        <Route path="/teacher-login" element={<TeacherLogin/>}/>
        <Route path="/admin-login" element={<AdminLogin/>}/>
        <Route path="/student-login" element={<StudentLogin/>}/>

        {/* Questions */}
        <Route path="/question-bank" element={<Appp/>}/>
        <Route path="/question-bank/add" element={<AddQuestion/>}/>
        <Route path="/question-bank/view" element={<ViewQuestions/>}/>
        <Route path="/question-bank/delete" element={<DeleteQuestion/>}/>
        {/* Results */}
        <Route path="/admin/results" element={<Results/>}/>
        

        <Route path="/teacher" element={<Teacher/>}/>
        <Route path="/student-list" element={<StudentList/>}/>
        <Route path="/teacher-list" element={<TeacherList/>}/>
        <Route path="/update-student" element={<UpdateStudent/>}/>
        <Route path="/update-teacher" element={<UpdateTeacher/>}/>
        <Route path="/delete-student" element={<DeleteStudent/>}/>
        <Route path="/delete-teacher" element={<DeleteTeacher/>}/>
        <Route path="/student-Approval" element={<StudentApproval/>}/>
        <Route path="/teacher-Approval" element={<TeacherApproval/>}/>
        <Route path="/exam-results" element={<ViewExamResults/>}/>
        <Route path="/feedback" element={<ViewFeedback/>}/>
      </Routes>
      </Router>
   
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
