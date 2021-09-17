import React, { useState } from "react";
import { useParams, Link, withRouter } from "react-router-dom";
import firebase from "../../firebase";
import { toast } from "react-toastify";
import "./MyAccount.css"
const UploadPhoto = props => {
  let {id} = useParams()
  let [state, setState] = useState({
      password : "",
      confirm_password : "",
      loading : false,

  })
  let {password, confirm_password, loading} = state;

  let handleChange = e =>{
      let {name , value} = e.target;
      setState({...state, [name] : value})

  }

 let handleSubmit = async e =>{
     e.preventDefault();
     try {
         setState({loading: true})
         if(password === confirm_password){
             let user = firebase.auth().currentUser;
            await user.updatePassword(password)
            toast.success("succuesfully password updated")
            props.history.push("/account")
         }else{
             toast.error("password is not matched")
         }

     } catch (err) {
         toast.error(err.message)
     }
 }

  return (
    <section id="auth_block" className="profile_block ">
     

      <article>
        <div>
          <h1>Welcome to Voot!</h1>
          <p> {id} Update Password</p>

          <form onSubmit={handleSubmit}>
            <div className="form_group">
              <input
                type="password"
                name="password"
                id="password"
                value = {password}
                onChange={handleChange}
                required
              
              />
              <label htmlFor="password">Enter New Password</label>
            </div>
            <div className="form_group">
              <input
                type="password"
                name="confirm_password"
                id="confirmpassword"
                value = {confirm_password}
                onChange={handleChange}
                required
                
              />
              <label htmlFor="confirmpassword">ConfirmPassword</label>
            </div>

            <div className="form_group register_block " >
              <Link to="/account">Go back to Account</Link>
            </div>
            <div className="form_group">
              <button className= "btn">
                {loading === true ? "loading..." : "Update Password"}
              </button>
            </div>
          </form>
        </div>
      </article>
    </section>
  );
};

export default withRouter(UploadPhoto);