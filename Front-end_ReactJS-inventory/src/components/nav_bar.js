import React from 'react';
import { NavLink } from 'react-router-dom';
// import createHistory from 'history/createBrowserHistory';

import glyphicons_user from '../assets/glyphicons_free/glyphicons_user.png';
import glyphicons_login from '../assets/glyphicons_free/glyphicons_login.png';
import glyphicons_logout from '../assets/glyphicons_free/glyphicons_logout.png';
import glyphicons_parents from '../assets/glyphicons_free/glyphicons_parents.png';
import glyphicons_database_plus from '../assets/glyphicons_free/glyphicons_database_plus.png';

import UpdateProfile from '../pages/user/user_profile';

// import { USER_NAME_EMAIL, ACCESS_TOKEN, IS_LOGGED } from '../constants/index';
import * as UserModel from '../service/signin_data_model';

// const history = createHistory();

export function DisplayUsername() {
    if (UserModel.getUsername() != null) {
        return (
            <span className='glyphicon glyphicon-user'>
                <img src={glyphicons_parents} alt='' /> {UserModel.getUsername()}
            </span>
        );
    } else {
        return (
            <span className='glyphicon glyphicon-user'>
                <img src={glyphicons_parents} alt='' /> Accounts
            </span>
        );
    }
}

export function AccountsDropDowns() {
    if (UserModel.getIsLogged() === true) {
        return (
            <div className='dropdown-menu' aria-labelledby='navbarDropdownMenuLink'>
                <NavLink
                    to='/'
                    exact activeStyle={{
                        backgroundColor: 'white',
                        color: 'black'
                    }}
                    className='dropdown-item'
                    onClick={() => {
                        UpdateProfile();
                    }}>
                    <img src={glyphicons_user} alt='' /> Profile</NavLink>

                <div className='dropdown-divider'></div>

                <NavLink
                    to='/'
                    exact activeStyle={{ color: '/FF6913' }}
                    className='dropdown-item'
                    onClick={() => {
                        sessionStorage.clear();
                        window.location.reload(true);
                    }}>
                    <img src={glyphicons_logout} alt='' /> Log Out</NavLink>
            </div>
        );
    } else {
        return (
            <div className='dropdown-menu' aria-labelledby='navbarDropdownMenuLink'>
                <NavLink
                    to='/login'
                    exact activeStyle={{ color: '/FF6913' }}
                    className='dropdown-item'>
                    <img src={glyphicons_login} alt='' /> Log In</NavLink>
                <NavLink
                    to='/signup'
                    exact activeStyle={{ color: '/FF6913' }}
                    className='dropdown-item'>
                    <img src={glyphicons_user} alt='' /> Sign Up</NavLink>
            </div>
        );
    }
}

export function Entities() {
    if (UserModel.getIsLogged() === true) {
        return (
            <li className='nav-item dropdown active'>
                <a className='nav-link dropdown-toggle' href='/' id='navbarDropdownMenuLink' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                    <img src={glyphicons_database_plus} alt='' /> Entities
                </a>
                <div className='dropdown-menu' aria-labelledby='navbarDropdownMenuLink'>
                    <NavLink
                        to='/suburb'
                        exact activeStyle={{ color: '/FF6913' }}
                        className='dropdown-item'>Suburbs</NavLink>
                    <NavLink
                        to='/city-town'
                        exact activeStyle={{ color: '/FF6913' }}
                        className='dropdown-item'>Cities / Towns</NavLink>
                    <NavLink
                        to='/province'
                        exact activeStyle={{ color: '/FF6913' }}
                        className='dropdown-item'>Provinces</NavLink>
                    <NavLink
                        to='/country'
                        exact activeStyle={{ color: '/FF6913' }}
                        className='dropdown-item'>Countries</NavLink>
                    <NavLink
                        to='/continent'
                        exact activeStyle={{ color: '/FF6913' }}
                        className='dropdown-item'>Continents</NavLink>
                    <NavLink
                        to='/stock'
                        exact activeStyle={{ color: '/FF6913' }}
                        className='dropdown-item'>Stock Items</NavLink>
                    <NavLink
                        to='/system-user'
                        exact activeStyle={{ color: '/FF6913' }}
                        className='dropdown-item'>System Users</NavLink>
                    <NavLink
                        to='/supplier'
                        exact activeStyle={{ color: '/FF6913' }}
                        className='dropdown-item'>Suppliers</NavLink>
                    <NavLink
                        to='/partner'
                        exact activeStyle={{ color: '/FF6913' }}
                        className='dropdown-item'>Partners</NavLink>
                    <NavLink
                        to='/company-type'
                        exact activeStyle={{ color: '/FF6913' }}
                        className='dropdown-item'>Company Type</NavLink>
                    <NavLink
                        to='/company'
                        exact activeStyle={{ color: '/FF6913' }}
                        className='dropdown-item'>Companies</NavLink>
                </div>
            </li>
        );
    } else {
        return (
            <li></li>
        );
    }
}

export function UserTabs() {
    if (UserModel.getIsLogged() === true) {
        return (
            <ul className='navbar-nav mr-auto'>
                <li className='nav-item'>
                    <NavLink
                        to='/dashboard'
                        exact activeStyle={{ color: '/FF6913' }}
                        className='nav-link'>Dashboard</NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink
                        to='/company'
                        exact activeStyle={{ color: '/FF6913' }}
                        className='nav-link'>Companies</NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink
                        to='/stock'
                        exact activeStyle={{ color: '/FF6913' }}
                        className='nav-link'>Stock</NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink
                        to='/partners'
                        exact activeStyle={{ color: '/FF6913' }}
                        className='nav-link'>Partners</NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink
                        to='/suppliers'
                        exact activeStyle={{ color: '/FF6913' }}
                        className='nav-link'>Suppliers</NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink
                        to='/orders'
                        exact activeStyle={{ color: '/FF6913' }}
                        className='nav-link'>Orders</NavLink>
                </li>
            </ul>
        );
    } else {
        return (<ul className='navbar-nav mr-auto'></ul>);
    }
}

