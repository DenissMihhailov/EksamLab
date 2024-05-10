import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPlates from './components/main-plates/main-plates';
import Header from './components/header/header';
import Authorization from './components/authorization/authorization';
import Registration from './components/registration/registration';
import EmailConfirmation from './components/email-confirmation/email-confirmation';
import UserProfile from './components/user-profile/user-profile';
import ChangePassword from './components/change-password/change-password';
import ThemeSubject from './components/theme-subject/theme-subject';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<MainPlates />} />
          <Route path="/authorization" element={<Authorization />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/email" element={<EmailConfirmation />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/themes/:subjectTitle/:themeTitle/:taskYear" element={<ThemeSubject />} />
          <Route path="/themes/:subjectTitle/:themeTitle/*" element={<ThemeSubject />} /> 
        </Routes>

      </div>
    </Router>
  );
}

export default App;