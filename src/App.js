import {BrowserRouter, Routes, Route} from 'react-router-dom'


import Navbar from "./view/part/navbar";
import Sidebar from "./view/part/sidebar"
import Main from "./view/part/test";

import HomePage from "./view/pages/HomePage";
import Login from './view/pages/login';
import Signup from './view/pages/signup';
import Welcome from './view/pages/welcome';
import Mainobj from './view/pages/mainobj';
import Kindofwork from './view/pages/kindofwork';
import ProjectCreate from './view/pages/projectCreate';
import Teamates from './view/pages/teamates';
import TeamCreate from './view/pages/teamCreate';
import TeamMember from './view/pages/teamMember';
import TeamGoal from './view/pages/teamGoal';
import Error404 from './view/pages/error404';
import EmailVerifySuccess from './view/pages/emailVerifySuccess';
import ForgotPassword from './view/pages/forgotPassword';
import PasswordReset from './view/pages/resetPassword';
import AdminDashboard from './view/pages/adminDashboard';
import AdminOrg from './view/components/adminOrg';
import AdminUser from './view/components/adminUser';
function App() {
  return (
    <div className="w-full h-full bg-gradient-to-r from-[#65A0FD] via-[#E8CCCC] to-[#FFA9F1B5] ">
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/welcome' element={<Welcome/>}/>
          <Route path='/objective' element={<Mainobj/>}/>
          <Route path='/work' element={<Kindofwork/>}/>
          <Route path='/app' element={<Main/>}/>
          <Route path='/projectCreate' element={<ProjectCreate/>}/>
          <Route path='/team' element={<Teamates/>}/>
          <Route path='/teamCreate' element={<TeamCreate/>}/>
          <Route path='/teamMember' element={<TeamMember/>}/>
          <Route path='/teamGoal' element={<TeamGoal/>}/>
          <Route path='/error' element={<Error404/>}/>
          <Route path="/verifySuccess" element={<EmailVerifySuccess/>}/>
          <Route path="/forgotPassword" element={<ForgotPassword/>}/>
          <Route path="/resetPassword" element={<PasswordReset/>}/>
          <Route path="/adminDashboard" element={<AdminDashboard/>}/>
          <Route path="/adminOrg" element={<AdminOrg/>}/>
          <Route path="/adminUser" element={<AdminUser/>}/>
          <Route path="*" element={<Error404/>}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
