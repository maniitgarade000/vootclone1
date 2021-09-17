
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import firebase from "../../firebase"
const DropDownMenu = props => {
  let toggleRef = useRef();

  useEffect(() => {
    if (props.toggle === true) {
      toggleRef.current.style.display = "block";
    } else {
      toggleRef.current.style.display = "none";
      document.body.onclick = function(){
      toggleRef.current.style.display = "none";

      }
    }
  }, [props.toggle]);

  let logout = () => {
    firebase
      .auth()
      .signOut()
      .then(_ => {
        toast.success("successfully logged out");
        props.history.push("/login");
      })
      .catch(error => {
        toast.error(error.message);
      });
  };
  let AnonymousUser =()=>{
    return(
      <fragment>
        <li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </li>
      </fragment>
    )
  }
  let AuthenticatedUser =()=>{
    return(
      <fragment>
        <li>
          <li>
           <a href="#" onClick={logout}> logout </a>
          </li>
          <li>
            <Link to="/account">My Account</Link>
          </li>
        </li>
      </fragment>
    )
  }
  return (
    <div className="dropdown" ref={toggleRef}>
      <div className="arrow-up"></div>
      <ul>
        {firebase.auth().currentUser ?(
          <AuthenticatedUser/>
        ):
        (
          <AnonymousUser/>
        )}
        <li>
          <a href="/">help and legal</a>
        </li>
        <li>
        </li>
      </ul>
    </div>
  );
};

export default DropDownMenu;