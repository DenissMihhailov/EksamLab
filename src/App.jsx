import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPlates from './components/main-plates/main-plates';
import Header from './components/header/header';
import Authorization from './components/authorization/authorization';

function App() {
    return (
      <Router>
        <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<MainPlates />} />
          <Route path="/authorization" element={<Authorization />} />
        </Routes>
        </div>
      </Router>
    );
  }

export default App;