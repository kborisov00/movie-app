import React, { useState } from 'react'
import { Link, useHistory } from "react-router-dom";

import './NavigationBar.scss'
import logo from '../../assets/logo.svg';

const NavigationBar = (props) => {
    const [query, setQuery] = useState('');
    const [isActive, setIsActive] = useState(false);
    const history = useHistory();

    const onChange = (e) => {
        setQuery(e.target.value);
    }

    const findMovie = (e) => {
        e.preventDefault();

        history.push(`/search/${query}`);
        e.target.reset();
        setIsActive(!isActive);
    }

    const toggleClass = () => {
        setIsActive(!isActive);
    }

    return (
        <>
            <div className="navbar">
                <Link to="/">
                    <img className="navbar__logo" src={logo} alt="logo" />
                </Link>

                <ul className="navbar__nav">
                    <li className="navbar__item">
                        <Link className="navbar__link" to="/">HOME</Link>
                    </li>
                </ul>

                <ul className="navbar__nav">
                    <li className="navbar__item">
                        <Link className="navbar__link" to="/about">ABOUT</Link>
                    </li>
                </ul>

                <form className="navbar__searchbox" onSubmit={findMovie}>
                    <input className="navbar__search-bar" onChange={onChange} type="text" placeholder="Search..." />
                    <button className="navbar__search-btn" type="submit"><i className="fas fa-search"></i></button>
                </form>

                <button className="navbar__sign-in">SIGN IN</button>

                <i className="navbar__burger-menu fas fa-bars" onClick={toggleClass}></i>
            </div>

            <div className={`navbar-mobile ${isActive ? 'active' : null}`}>
                <form className="navbar__searchbox" onSubmit={findMovie}>
                    <input className="navbar__search-bar" onChange={onChange} type="text" placeholder="Search..." />
                    <button className="navbar__search-btn" type="submit"><i className="fas fa-search"></i></button>
                </form>

                <ul className="navbar__nav">
                    <li className="navbar__item">
                        <Link className="navbar__link" to="/" onClick={toggleClass}>HOME</Link>
                    </li>

                    <li className="navbar__item">
                        <Link className="navbar__link" to="/about" onClick={toggleClass}>ABOUT</Link>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default NavigationBar;
