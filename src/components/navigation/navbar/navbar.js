import React from 'react'
import {NavLink} from 'react-router-dom';
import Logo from '../../../assets/imgs/logo.png';
import SignOutButton from '../../../containers/auth/sign-out-button/sign-out-button';

function Navbar(props) {
    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
            <NavLink className="navbar-brand" to='/'>
                <img src={Logo} alt="FastFoodShop" width="50"/>
            </NavLink>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink to='/' exact className="nav-link" activeClassName="active">Order Food</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/orders' className="nav-link" activeClassName="active">Orders</NavLink>
                    </li>
                </ul>
                <SignOutButton/>

            </div>
        </nav>
    )
}

export default Navbar
