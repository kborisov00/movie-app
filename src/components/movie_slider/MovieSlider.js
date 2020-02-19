import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import './MovieSlider.scss';

const MovieSlider = (props) => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        fetch(`${props.api}73eb6f4f083c00ebce6c3c33cb6f3027`)
            .then(res => res.json())
            .then(data => {
                setResults(data.results);
            })
    }, []);

    const sliderSettings = {
        slidesToShow: 5,
        draggable: false,
        responsive: [
            {
                breakpoint: 1505,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 1211,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 921,
                settings: {
                    slidesToShow: 2,
                    centerMode: true,
                    arrows: false,
                }
            },
            {
                breakpoint: 515,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: '120px',
                    arrows: false,
                }
            },
            {
                breakpoint: 439,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: '80px',
                    arrows: false,
                }
            },
            {
                breakpoint: 383,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: '60px',
                    arrows: false,
                }
            }
        ]  
    }

    return (
        <>
            <h3>{props.title}</h3>
            <Slider {...sliderSettings} className="slider">
                {results.map(movie => (
                    <div key={movie.id} className="movie">
                        <img className="movie__slide" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                        <p className="movie__rating"><i class="fas fa-star"></i> {movie.vote_average}</p>
                        <h3 className="movie__title">{movie.title}</h3>
                    </div>
                ))}
            </Slider>
        </>
    )
}

export default MovieSlider;