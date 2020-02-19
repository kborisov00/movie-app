import React, { useState, useEffect } from 'react';
import MovieCard from '../movie_card/MovieCard';
import './SearchResults.scss';

const SearchResults = (props) => {
    const query = props.match.params.query;
    const [results, setResults] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {

        fetch(`https://api.themoviedb.org/3/search/movie?api_key=73eb6f4f083c00ebce6c3c33cb6f3027&query=${query}&page=1`)
            .then(res => res.json())
            .then(data => {
                setResults(data.results);
                setLoaded(true);
            })
            .catch(err => {
                setError(err);
                setLoaded(true);
            })
    })

    if (error) {
        return <div>Error: {error.message}</div>
    } else if (!loaded) {
        return <h3>Loading..</h3>
    } else {
        return (
            <div style={{ overflow: 'hidden' }} key={query}>
                <h3 style={{marginLeft: '50px'}}>Search results for "{query}"</h3>
                <div className="movie-grid">
                    {results.map(movie => (
                        <MovieCard key={movie.id} movie_data={movie} />
                    ))}
                </div>
            </div>
        )
    }


}

export default SearchResults;