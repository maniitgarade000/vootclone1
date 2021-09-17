import React from 'react'
import "./MyAccount.css"
import {Link, Switch,Route, useRouteMatch} from "react-router-dom"
import UploadPhoto from './UploadPhoto';
import firebase from "../../firebase"
import {toast} from "react-toastify"

const MyAccount = (props) => {
    let {path, url} = useRouteMatch();
    let {photoURL, displayName, email} = props.users;

    let onRemoveUser = async () =>{
        let user = firebase.auth().currentUser;
        await user.delete()
        toast.success("successfully account deleted")
    }

    return (
        <section id="MyAccountBlock">
            <article>
                <aside>
               <header>
               
                    <figure>
                    <Link to = {`${url}/update-photo`}>
                        <span>
                            <i class="fa fa-pencil" area-hidden="true"></i>
                        </span>
                        <img src={photoURL} alt={displayName}/>

                    </Link>
                    </figure>
                <h3>{displayName}</h3>
                
               </header>
               <main>
                   <h4>{email}</h4>
                 <ul>
                 <li>
                       <Link to="/update-password">Update Password</Link>
                   </li>
                   <li>
                       <Link to="/movies/upload-movies">Upload Movie</Link>
                   </li>
                 </ul>
               </main>
                 <footer>
                 
                 
                     <button onClick={onRemoveUser}> RemoveUser</button>
                    
                  

                 </footer>
                </aside>
                <main>
                <Switch>
                    <Route path={`${path}/:id`} exact>
                      <UploadPhoto users = {props.users}/>
                    </Route>
                </Switch>
                </main>
            </article>
        </section>
           )
}
export default MyAccount
