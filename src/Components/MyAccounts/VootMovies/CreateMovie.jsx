import React, {useState} from 'react'
import "../VootMovies/Movie.css"
import firebase from "firebase"
import {toast } from "react-toastify"
import {Link, withRouter} from "react-router-dom"


const CreateMovie = props => {
    let [state, setState] = useState({
        movie_name: "",
        movie_year: "",
        movie_description: "",
        movie_language: "",
        movie_certificate: "",
        movie_rating: "",
        barStatus: false,
        loading:false,
       
        progress: 0,
     
      });
    
      let [Poster, setPoster] = useState({})
      let [Video, setVideo]   = useState({}) 

      let handlePoster = e => {
        setPoster({ Poster: e.target.files[0] });
      };
    
      let handleVideo = e => {
        setVideo({ Video: e.target.files[0] });
      };
      let handleChange = e => {
        setState({ ...state, [e.target.name]: e.target.value });
      };
    
      let {
        movie_name,
        movie_year,
        movie_description,
        movie_rating,
        movie_certificate,
        movie_language,
        barStatus,
        loading,
        progress,
        
     
      
      } = state;
    
      
  let handleSubmit = async e => {
    e.preventDefault();

    try {
    setState({ loading: true })

      firebase
        .storage()
        .ref(`/upload-poster/${Poster.Poster.name}`)
        .put(Poster.Poster);
      let uploadVideo = firebase
        .storage()
        .ref(`/upload-video/${Video.Video.name}`)
        .put(Video.Video);

      //==========================update Video ===========================//
      uploadVideo.on(
        "state_changed",
        snapShot => {
           //progressBar purpose

           let progress = Math.round(
            (snapShot.bytesTransferred / snapShot.totalBytes) * 100
          );
          setState({ progress: progress, barStatus: true });
        },
        
        err => {},
        async () => {
          let downloadPoster = await firebase
            .storage()
            .ref("upload-poster")
            .child(Poster.Poster.name)
            .getDownloadURL();
          setPoster({ downloadPoster });

          let downloadVideo = await firebase
            .storage()
            .ref("upload-video")
            .child(Video.Video.name)
            .getDownloadURL();
          setVideo({ downloadVideo });

          await firebase
            .database()
            .ref("voot-video")
            .push({
              ...state,
              downloadPoster,
              downloadVideo,
            });
        }
      );
     
      toast.success("successfully uploaded")
      props.history.push("/")
    } catch (err) {
      toast.error(err.message)
    }
    setState({loading: false});
  };
  let ProgressBar = () => {
    return <progress value={progress} max={100} min={0}></progress>;
     };
      return (
        <section id="MovieBlock">
        <header className="progressBlock">
        <div className="leftProgress">
          {barStatus === true ? <ProgressBar /> : ""}
        </div>
        <div className="rightProgress">
          {barStatus === true ? progress + "%" : ""}
        </div>
      </header>
          <article>
            <div>
              <h1>Welcome to Voot!</h1>
              <p>Upload Movies for a more personalized experience.</p>
              <form onSubmit={handleSubmit}>
                <div >
                  <label htmlFor="movie_name">Movie Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="movie_name"
                    name="movie_name"
                    value={movie_name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="movie_poster">Movie Poster</label>
                  <input
                    type="file"
                    className="form-control"
                    id="movie_poster"
                    name="poster"
                    onChange={handlePoster}
                  />
                </div>
                <div >
                  <label htmlFor="movie_video">Movie Video</label>
                  <input
                    type="file"
                    className="form-control"
                    id="movie_video"
                    name="video"
                    onChange={handleVideo}
                  />
                </div>
                <div >
                  <label htmlFor="movie_year">Year</label>
                  <input
                    type="date"
                    className="form-control"
                    id="movie_year"
                    name="movie_year"
                    value={movie_year}
                    onChange={handleChange}
                  />
                </div>
                <div >
                  <label htmlFor="movie_language">Language</label>
                  <input
                    type="text"
                    className="form-control"
                    id="movie_language"
                    name="movie_language"
                    value={movie_language}
                    onChange={handleChange}
                  />
                </div>
    
                <div >
                  <label htmlFor="movie_certificate">Movie Certificate</label>
                  <input
                    type="text"
                    className="form-control"
                    id="movie_certificate"
                    name="movie_certificate"
                    value={movie_certificate}
                    onChange={handleChange}
                  />
                </div>
                <div >
                  <label htmlFor="movie_rating">Movie Rating</label>
                  <input
                    type="number"
                    className="form-control"
                    id="movie_rating"
                    name="movie_rating"
                    value={movie_rating}
                    onChange={handleChange}
                  />
                </div>
                <div >
                  <label htmlFor="movie_description">Movie description</label>
                  <textarea
                    className="form-control"
                    id="movie_description"
                    name="movie_description"
                    value={movie_description}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="form_group register_block " >
              <Link to="/account">Go back to Account</Link>
            </div>
                <div className=" btn-group">
                  <button>{loading === true ? "loading" : "Create Movie"}</button>
                </div>
              </form>
            </div>
          </article>
        </section>
      );
}

export default withRouter(CreateMovie)
