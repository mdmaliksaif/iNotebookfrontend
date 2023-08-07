import React, { useState } from 'react'
import { useNavigate,Link} from 'react-router-dom'
import Footer from './Footer';

const Login = (props) => {
    const [credentials, setCredentials] = useState({email:"", password:""});
    const navigate = useNavigate();

    const handleSubmit = async(e) =>{
        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST", 
            headers: {
             "Content-Type": "application/json",
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json();
        console.log(json)
        if(json.success){
            //save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            localStorage.setItem('username', json.name);
            // console.log( localStorage.setItem('token', json.authtoken));
            props.showAlert("Logged in Successfully","success")
            navigate('/main', {replace: true});
        }
        else{ 
          props.showAlert("Invalid Credentials","danger") 
        }
    }
    const onChange = (e) =>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

  return (
    <div style={{marginTop:'6rem'}}>
    <div className='container-content' style={{backgroundColor:'#0000'}}>
        <h2 className='text-dark'>Login to continue to iNotebook</h2>
        <form onSubmit={handleSubmit}>
            <div className="my-3 ">
                <label htmlFor="email" className="form-label font-weight text-dark">Email address</label>
                <input type="email" className="form-control dark-wide-border text-dark"
                       style={{backgroundColor:'#0000'}} value={credentials.email} 
                       minLength={5} required onChange={onChange} id="email" name='email' aria-describedby="emailHelp"/>
                <div id="emailHelp" className="form-text custom-font-size text-light">We'll never share your email with anyone else.</div>
            </div>
            <div className="my-3">
                <label htmlFor="password" className="form-label font-weight text-dark">Password</label>
                <input type="password" className="form-control dark-wide-border text-dark"
                       minLength={5} required
                       style={{backgroundColor:'#0000'}} value={credentials.password} onChange={onChange} id="password" name='password'/>
            </div>
            <button type="submit" className="custom-button">Login</button>
        </form>
    </div>
    <p style={{margin:'20px',opacity:'0'}}>hidden</p>
    <p style={{margin:'10px',opacity:'0'}}>hidden</p>
    <p style={{margin:'10px',opacity:'0'}}>hidden</p>
    <p style={{margin:'10px',opacity:'0'}}>hidden</p>
    <p style={{ textAlign: 'center', margin: '10px', opacity: '1', color: '#000000' }}>
        Don't have an account? <Link to="/signup" style={{ color: '#fff', textDecoration: 'underline' }}>Signup</Link>
      </p>
    <Footer/>
    <p style={{margin:'10px',opacity:'0'}}>hidden</p>
    
    

    </div>
  )
}

export default Login
