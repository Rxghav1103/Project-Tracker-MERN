import React,{useState} from 'react'
import Generator from './Generator'
import ProjectLogin from './ProjectLogin';
import './ProjectGenerator.css';


const LandingPage = () => {
  const [mode, setMode] = useState('create'); 
  return (
    <div >
      <div className='rd'>
        <label>
          <input
            type="radio"
            value="create"
            checked={mode === 'create'}
            onChange={() => setMode('create')}
          />
          Create New Project
        </label>
        <label>
          <input
            type="radio"
            value="login"
            checked={mode === 'login'}
            onChange={() => setMode('login')}
          />
          Login to Existing Project
        </label>
      </div>
      {mode === 'create' && (
      <div> 
        <Generator/>
      </div>)}
      {mode === 'login' && (
        <ProjectLogin/>
      )}
      
    </div>
  )
}

export default LandingPage