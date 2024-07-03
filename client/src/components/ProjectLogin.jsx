import React, { useState } from 'react';
import axios from 'axios';
import './ProjectGenerator.css'; // Ensure your CSS file path is correct

import { useNavigate } from 'react-router-dom';

const ProjectLogin = () => {
  const [projectId, setProjectId] = useState('');
  const [projectPassword, setProjectPassword] = useState('');

  const navigate = useNavigate();
  const handleLogin = async () => {
    //proj-65dcec148
    //qdf2t991ckc
    
    // try {
    //   const response = await axios.post('http://your-backend-url.com/login', {
    //     id: projectId,
    //     password: projectPassword
    //   });
    //   alert('Login successful!');
    // } catch (error) {
    //   console.error('Error logging in:', error);
    //   alert('Login failed.');
    // }

    const response = await fetch("http://localhost:5555/project/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id:projectId, password:projectPassword }),
    });

    if(response.status === 200){
      const data = await response.json();

      localStorage.setItem("project", projectId)

      navigate(`/task/${projectId}`)
    }else{
      const data = await response.json();
      alert(data.message)


    }


  };

  return (
    <div className="project-generator">
      <h2>Login to Existing Project</h2>
      <input
        type="text"
        placeholder="Enter Project ID..."
        value={projectId}
        onChange={(e) => setProjectId(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter Project Password..."
        value={projectPassword}
        onChange={(e) => setProjectPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default ProjectLogin;
