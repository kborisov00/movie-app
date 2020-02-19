import React, { useState, useEffect } from 'react';
import MovieCard from '../movie_card/MovieCard';
import './SearchResults.scss';

const SearchResults = (props) => {
    const query = props.match.params.query;
    const [results, setResults] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [pageNum, setPageNum] = useState(null);
    const [page, setPage] = useState(1);

    useEffect(() => {

        fetch(`https://api.themoviedb.org/3/search/movie?api_key=73eb6f4f083c00ebce6c3c33cb6f3027&query=${query}&page=${page}`)
            .then(res => res.json())
            .then(data => {
                setResults(data.results);
                setPageNum(data.total_pages);
                setLoaded(true);
            })
            .catch(err => {
                setError(err);
                setLoaded(true);
            })
    })

    const changePage = (direction, currentPage, pageNum) => {
        if (direction === 'f') {
            if (currentPage < pageNum) {
                setPage(currentPage + 1);
            }
        } else if (direction === 'b') {
            if (currentPage > 1) {
                setPage(currentPage - 1)
            }
        }
    }

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

                <div className="buttons">
                    <button onClick={() => changePage('b', page, pageNum)}><i className="fas fa-angle-double-left"></i></button>
                    <button onClick={() => changePage('f', page, pageNum)}><i className="fas fa-angle-double-right"></i></button>
                </div>
            </div>
        )
    }


}

export default SearchResults;