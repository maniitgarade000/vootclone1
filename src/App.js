import React, {Fragment, useState, useEffect} from 'react'
import Navbar from './Components/VootHeaders/Navbar'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Components/Auth/Login'
import Register from './Components/Auth/Register'
import Otp from './Components/Auth/Otp'
import Spinner from './Pages/Spinner'
import PasswordReset from './Components/Auth/PasswordReset'
import PageNotFound from './Pages/404'
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import firebase from './firebase'
import MyAccount from './Components/MyAccounts/MyAccount'
import PrivateRoute from './Components/Utill/PrivateRoute'
import PublicRoute from './Components/Utill/PublicRoute'
import UpdatePassword from './Components/MyAccounts/UpdatePassword'
import CreateMovie from './Components/MyAccounts/VootMovies/CreateMovie'
import Movie from './Components/MyAccounts/VootMovies/Movie'
import VideoPlayer from './Components/MyAccounts/VootMovies/VideoPlayer'

const App = ({history}) => {
  let [users, setUsers] = useState("i  manjit")

  //signed in or not
  useEffect(()=>{
  firebase.auth().onAuthStateChanged(user=>{
    if(user){
      setUsers(user)//authnticated user
    }else{
      setUsers("")//anonymous user

    }
  })

  },[users])
    return (
        <Fragment>
          <Router>
          <Navbar users = {users}/>
          <ToastContainer/>
          <Switch>
              <Route path="/" exact>
               <Home/>
              </Route>
              <PublicRoute path="/login" exact>
               <Login/>
              </PublicRoute>
              <PublicRoute path="/register" exact>
                <Register/>
              </PublicRoute>
              <PublicRoute path="/otp" exact>
                 <Otp/>
              </PublicRoute>
             <PublicRoute path="/password-reset" exact>
                 <PasswordReset/>
             </PublicRoute>
              <PublicRoute path="/spinner" exact>
               <Spinner/>
              </PublicRoute>
            

              {!firebase.auth().currentUser ? (
            <PublicRoute path="/shows/:movie_name/:id" exact>
              <Movie />
            </PublicRoute>
          ) : (
            <PrivateRoute path="/shows/:movie_name/:id">
              <Movie />
            </PrivateRoute>
          )}

          {!firebase.auth().currentUser ? (
            <PublicRoute path="/movie/:movie_name/:id" exact>
              <VideoPlayer/>
            </PublicRoute>
          ) : (
            <PrivateRoute path="/movie/:movie_name/:id">
              <VideoPlayer />
            </PrivateRoute>
          )}
             
              <PrivateRoute path="/account" >
              <MyAccount users={users}/>
              </PrivateRoute>
              <PrivateRoute path="/update-password">
                <UpdatePassword/>
              </PrivateRoute>
             <PrivateRoute path="/movies/upload-movies">
              <CreateMovie users = {users}/>
             </PrivateRoute>
              <Route path="*">
              <PageNotFound/>
              </Route>
          </Switch>
          </Router>
        </Fragment>
    )
}

export default App
