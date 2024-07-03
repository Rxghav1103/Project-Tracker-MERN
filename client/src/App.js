import React from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import Home from './components/Home';
import ProjectTracker from './ui/src/ProjectTracker';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/task/:pid" element={<ProjectTracker />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
