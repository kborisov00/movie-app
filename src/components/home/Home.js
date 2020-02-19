import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import MovieSlider from '../movie_slider/MovieSlider';
import './Home.scss';

const Home = (props) => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=73eb6f4f083c00ebce6c3c33cb6f3027')
            .then(res => res.json())
            .then(data => {
                setResults(data.results)
            })
    }, []);

    const sliderSettings = {
        dots: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 4000,
        draggable: false,
        pauseOnHover: false,
    }


    return (
        <>
            <Slider className="top-slider" {...sliderSettings}>
                {results.slice(0, 5).map(movie => (
                    <Link key={movie.id} className="top-slider__slide" to={`/movie/${movie.id}`}>
                        <img className="top-slider__poster" src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`} alt={movie.title} />

                        <div className="top-slider__info">
                            <h5 className="top-slider__status">Now playing</h5>
                            <h3 className="top-slider__title">{movie.title}</h3>
                        </div>
                    </Link>
                ))}
            </Slider>

            <div className="container">
                <MovieSlider title={'Popular'} api={'https://api.themoviedb.org/3/movie/popular?api_key='} />

                <MovieSlider title={'Top Rated'} api={'https://api.themoviedb.org/3/movie/top_rated?api_key='} />

                <MovieSlider title={'Upcoming'} api={'https://api.themoviedb.org/3/movie/upcoming?api_key='} />
            </div>
        </>
    )
}

export default Home;