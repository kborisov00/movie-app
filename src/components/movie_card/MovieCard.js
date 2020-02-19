import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.scss';

const MovieCard = (props) => {
    // movie data variable
    const { movie_data } = props;

    // movie poster variable
    let moviePoster;

    // if movie poster variable is null, show 404 pic
    if (movie_data.poster_path === null) {
        moviePoster = 'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png';
    } else {
        moviePoster = `https://image.tmdb.org/t/p/w500${movie_data.poster_path}`;
    }

    return (
        <Link to={`/movie/${movie_data.id}`}>
            <div className="movie-card">
                <img src={moviePoster} className="movie-card__poster" alt={movie_data.title}/>
                <i className="fas fa-eye movie-card__view"></i>
                <p className="movie-card__rating">{movie_data.vote_average}</p>
            </div>
        </Link>
    )
}

export default MovieCard;