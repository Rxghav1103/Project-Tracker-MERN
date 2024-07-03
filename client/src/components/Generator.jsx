import React, { useState } from 'react';
import axios from 'axios';
import './ProjectGenerator.css'; // Ensure your CSS file path is correct
//import "../css/Generator.module.css"

const Generator = () => {
  const [projectName, setProjectName] = useState('');
  const [projectId, setProjectId] = useState('');
  const [projectPassword, setProjectPassword] = useState('');

  const handleGenerate = () => {
    const id = `proj-${Math.random().toString(36).substr(2, 9)}`;
    const password = Math.random().toString(36).substr(2, 12);
    setProjectId(id);
    setProjectPassword(password);
  };

  const handleSave = async () => {
    if (projectName && projectId && projectPassword) {
      // try {
      //   await axios.post('http://your-backend-url.com/projects', {
      //     name: projectName,
      //     id: projectId,
      //     password: projectPassword
      //   });
      //   alert('Project saved successfully!');
      // } catch (error) {
      //   console.error('Error saving project:', error);
      //   alert('Failed to save project.');
      // }

      
      const response = await fetch("http://localhost:5555/project/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name:projectName, id:projectId,password:projectPassword }),
      });
      const data = await response.json();
      console.log(data);
    } else {
      alert('Please generate project ID and password first.');
    }
  };

  return (
    <div className="project-generator">
      <h2>Project Generator</h2>
      <input
        type="text"
        placeholder="Enter Project Name..."
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />
      <button onClick={handleGenerate}>Generate</button>
      {projectId && (
        <div>
          <p><strong>Project ID:</strong> {projectId}</p>
          <p><strong>Project Password:</strong> {projectPassword}</p>
        </div>
      )}
      <button onClick={handleSave}>Save to Backend</button>
    </div>
  );
};

export default Generator;