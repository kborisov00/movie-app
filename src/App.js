import React from 'react';
import './assets/styles/main.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import NavigationBar from './components/navigation_bar/NavigationBar';
import Home from './components/home/Home';
import SearchResults from './components/search_results/SearchResults';
import MovieDetails from './components/movie_details/MovieDetails';
import Footer from './components/footer/Footer';

function App() {
    return (
        <Router>
            <NavigationBar />

            <Switch>
                <div style={{paddingTop: '80px'}}>
                    <Route exact path="/" component={Home} />
                    <Route path="/search/:query" component={SearchResults} />
                    <Route path="/movie/:id" component={MovieDetails} />
                </div>
            </Switch>

            <Footer />
        </Router>

    );
}

export default App;
