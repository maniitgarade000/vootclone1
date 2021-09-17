import React,{useState} from 'react'
import {Link} from "react-router-dom"
import { toast } from 'react-toastify';
import "./auth.css"
import firebase from "../../firebase"
import { withRouter } from 'react-router-dom';

const PasswordReset = ({history}) => {
 let[user, setUser] = useState({
    email : "",
    loading : false
 })

 let {email, loading} = user;

 let handleChange = e =>{
     setUser({...user, [e.target.name]: e.target.value});
 }

 let handleSubmit = async e =>{
     e.preventDefault();
    try {
        setUser({loading: true});
        await firebase.auth().sendPasswordResetEmail(email)
        let message = `Please check your registered ${email} and update it`
        toast.success(message)
        history.push("/login")
    } catch (error) {
        toast.error(error)
    }
    setUser({loading: false})
 };
    return (
        <section id="auth_block">
        <article>
          <div>
          <h1>Welcome to Voot!</h1>
          <p>Please Reset Password for a more personalised experience.</p>
  
      
        <form onSubmit={handleSubmit}>
            
            <div className="form_group">
                <input
                  type="text"
                  id="email"
                  name="email"
                  value = {email}
                  onChange={handleChange}
                
                ></input>
              <label htmlFor="email">Email</label>

             
            </div>
           
            <div className="form_group register_block" >
             
              <Link to="/login">go back to login</Link>

            </div>
            <div className="form_group">
              <button >
                  {loading === true ? "loading" : "Reset Password"}
              </button>
            </div>
             
          </form>
          </div>
        
        </article>
      </section>
    )
}

export default withRouter(PasswordReset)
