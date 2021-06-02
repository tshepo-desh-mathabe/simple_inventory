import React, { Component } from 'react';
import './App.css';
import { Router, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import { bindActionCreators } from 'redux';
import connect from 'react-redux/lib/connect/connect';
import * as StateActionCreator from './app_state/nav_state/action';
import store from './app_state/store';
import { Foot } from './components/footer';
import { DisplayUsername, AccountsDropDowns, UserTabs, Entities } from './components/nav_bar';
import * as SignInModel from './service/signin_data_model';

// import routeListener from './routes/util';
import AppRoutes from './routes/app_routes';
import LogInForm from './pages/user/signin_form';
import SignUpForm from './pages/user/signup_form';
import Home from './pages/main/home';
// import home_pic from './assets/home_pic.jpg';

const history = createHistory();

const NavigationBar = () => {
    return (
        <Router history={history}>
            <div className='App'>
                <nav className='navbar fixed-top navbar-expand-sm bg-dark navbar-dark'>
                    <NavLink
                        to='about-us'
                        exact activeStyle={{ color: '/FF6913' }}
                        className='navbar-brand' data-toggle='tooltip' title='What is the system all about'>About Inventory
                    </NavLink>
                    <button className='navbar-toggler' type='button' data-toggle='collapse'
                        data-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false'
                        aria-label='Toggle navigation'>
                        <span className='navbar-toggler-icon'></span>
                    </button>

                    <div className='collapse navbar-collapse' id='navbarNav'>
                        <UserTabs />
                        <ul className='navbar-nav'>
                            <Entities />
                            <li className='nav-item dropdown active'>
                                <a className='nav-link dropdown-toggle' href='/' id='navbarDropdownMenuLink' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                                    <DisplayUsername />
                                </a>
                                <AccountsDropDowns />
                            </li>
                        </ul>
                    </div>
                </nav>
                <AppRoutes />
            </div>
        </Router>
    );
}

function RenderNavBar() {
    if (store.getState().user.showLogIn_signUp === '/login') {
        return <LogInForm />;
    }
    else if (store.getState().user.showLogIn_signUp === '/signup') {
        return <SignUpForm />;
    }
    else if (SignInModel.getIsLogged() === true) {
        history.push('/dashboard');
        return (
            <main>
                <NavigationBar />
                {/* <Dashboard /> */}
                <Foot />
            </main>
        );
    }
    else {
        return (
            <main>
                <NavigationBar />
                <Home />
                <Foot />
            </main>
        );
    }
}


class App extends Component {

    render() {
        return (<RenderNavBar />);
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispacthToProps = (dispatch) => {
    history.listen((location) => {
        if (location.pathname === '/login' || location.pathname === '/signup') {
            let action = StateActionCreator.showPage(location.pathname);
            store.dispatch(action);
        }
    });
    return bindActionCreators(StateActionCreator, dispatch);
}

export default connect(mapStateToProps, mapDispacthToProps)(App);
