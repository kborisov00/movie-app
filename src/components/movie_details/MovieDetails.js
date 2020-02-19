import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import './MovieDetails.scss';

const MovieDetails = (props) => {
    const movie_id = props.match.params.id;
    const [movie, setMovie] = useState([]);
    const [cast, setCast] = useState([]);
    let movie_backdrop;

    useEffect(() => {
        // fetch movie data
        fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=73eb6f4f083c00ebce6c3c33cb6f3027&language=en-US`)
            .then(res => res.json())
            .then(data => {
                setMovie(data);
            });

        // fetch cast data
        fetch(`https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=73eb6f4f083c00ebce6c3c33cb6f3027`)
            .then(res => res.json())
            .then(data => {
                setCast(data.cast);
            });
    }, []);

    const sliderOptions = {
        slidesToShow: 5,
        draggable: false,
        responsive: [
            {
                breakpoint: 1390,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 1086,
                settings: {
                    slidesToShow: 3,
                    draggable: true,
                }
            },
            {
                breakpoint: 784,
                settings: {
                    slidesToShow: 2,
                    arrows: false,
                    centerMode: true,
                }
            },
            {
                breakpoint: 614,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    arrows: false
                }
            }
        ],
    }

    // check if backdrop image is available
    if (movie.backdrop_path === null || movie.backdrop_path === undefined) {
        movie_backdrop = 'https://upload.wikimedia.org/wikipedia/commons/7/75/No_image_available.png';
    } else {
        movie_backdrop = `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`;
    }

    // render when genres are fetched
    if (movie.genres) {
        return (
            <>
                <div className="backdrop">
                    <img className="backdrop__img" src={movie_backdrop} alt={movie.title} />

                    <div className="backdrop__info-wrap">
                        <img className="backdrop__poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                        <div className="backdrop__info">
                            <h5 className="backdrop__status">{movie.status}</h5>
                            <h3 className="backdrop__title">{movie.title}</h3>

                            <div className="backdrop__genres">
                                {movie.genres.slice(0, 2).map(genre => (
                                    <h4 key={genre.id} className="backdrop__genre">{genre.name}</h4>
                                ))}
                            </div>

                            <div className="backdrop__rating">
                                <i className="fas fa-star"></i>
                                <h4>{movie.vote_average}</h4>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="summary">
                        <h3>Summary</h3>
                        <p className="summary__summary">{movie.overview}</p>
                    </div>

                    <div className="cast">
                        <h3>Cast</h3>
                        <Slider {...sliderOptions}>
                            {cast.map(member => {
                                let profile_path;
                                if (member.profile_path === null || member.profile_path === undefined) {
                                    profile_path = 'https://gfsstore.com/wp-content/uploads/2018/09/No_Image_Available.png';
                                } else {
                                    profile_path = `https://image.tmdb.org/t/p/w500${member.profile_path}`;
                                }
                                return (
                                    <div key={member.id} className="cast__member">
                                        <img className="cast__img" src={profile_path} alt={member.name} />
                                        <h3 className="cast__name">{member.name}</h3>
                                    </div>
                                )
                            })}
                        </Slider>
                    </div>
                </div>
            </>
        )
    } else {
        return <h1>Loading...</h1>
    }
}

export default MovieDetails;