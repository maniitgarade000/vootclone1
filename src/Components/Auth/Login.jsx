import React,{useState} from 'react'
import {Link} from "react-router-dom"
import { toast } from 'react-toastify';
import "./auth.css"
import firebase from "../../firebase"
import { withRouter } from 'react-router-dom';

const Login = ({history}) => {
  let [setUser, setStateUser] = useState({
       
    email : "",
    password : "",
   loading : false
  });
  let {email, password, loading} = setUser;
  
  let handleChange = e =>{
    let {name, value} = e.target;
    setStateUser({...setUser,[name]: value});
  };
  
 let handleSubmit = async e =>{
       e.preventDefault();
      try {
        setStateUser({loading:true})
        let userData = await firebase.auth().signInWithEmailAndPassword(email, password)
       
        if(userData.user.emailVerified === true){
          let message = `${userData.user.email} has been successfully login`
          toast.success(message)
          history.push("/")
        }else{
          let message = `${userData.user.email} not yet verified pls verified and login`
          toast.error(message)
        }
      } catch (err) {
        toast.error(err.message)
      }
  }

  
    return (
        <section id="auth_block">
        <article>
          <div>
          <h1>Welcome to Voot!</h1>
          <p>Please  Login for a more personalised experience.</p>
  
          <div className="form_group">
            <Link to="/otp" className="phoneBtn">
              continue with phone number
            </Link>
          </div>
        <form onSubmit={handleSubmit}>
            
            <div className="form_group">
                <input
                  type="text"
                  id="email"
                  name="email"
                  value= {email}
                  onChange={handleChange}
                ></input>
              <label htmlFor="email">Email</label>

             
            </div>
            <div className="form_group">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                 
                ></input>
              <label htmlFor="password">Password</label>

           
            </div>
            <div className="form_group register_block" >
              <Link to="/register">Register</Link>
              <Link to="/password-reset">Password Reset</Link>

            </div>
            <div className="form_group">
              <button >Login</button>
            </div>
             
          </form>
          </div>
        
        </article>
      </section>
    )
}

export default withRouter(Login)
