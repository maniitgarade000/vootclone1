import React from 'react'
import "../Components/./MyAccounts/VootMovies/Movie.css"
import ListMovie from '../Components/MyAccounts/VootMovies/ListMovie'
import SliderComponent from '../Components/SliderComponent/SliderComponenet'

const Home = () => {
    return (
        <div>

        <SliderComponent/>
        <ListMovie/>
        </div>
    )
}

export default Home