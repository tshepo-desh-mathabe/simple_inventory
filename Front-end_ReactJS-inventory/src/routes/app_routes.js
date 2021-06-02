import React, { Fragment } from 'react';
import AboutUs from '../pages/main/about_us';
import SignUpForm from '../pages/user/signup_form';
import Continent from '../pages/entities/continents/continent';
import ContinentView from '../pages/entities/continents/continent_view';
import Country from '../pages/entities/countries/country';
import CountryView from '../pages/entities/countries/country_view';
import Province from '../pages/entities/provinces/province';
import ProvinceView from '../pages/entities/provinces/province_view';
import CityTown from '../pages/entities/city_towns/city_town';
import CityTownView from '../pages/entities/city_towns/city_town_view';
import Suburb from '../pages/entities/suburbs/suburb';
import SuburbView from '../pages/entities/suburbs/suburb_view';
import User from '../pages/entities/users/user';
import UserView from '../pages/entities/users/user_view';
import Company from '../pages/entities/companies/company';
import CompanyView from '../pages/entities/companies/company_view';

import LogInForm from '../pages/user/signin_form';
import Home from '../pages/main/home';
import DashBoard from '../pages/main/dashboard';
import { Route, Redirect } from 'react-router-dom';
import store from '../app_state/store';
import { getIsLogged } from '../service/signin_data_model';
// import { getCurrentUserRole } from '../service/current_user_data_model';

const AppRoutes = () => {
    return (
        <Fragment>

            <Route exact path='/' render={() => { return (<Home />); }} />
            <Route exact path='/about-us' component={AboutUs} />
            <Route exact path='/dashboard' render={() => (
                getIsLogged() === true ? <DashBoard /> : (<Redirect to='/' />)
            )} />
            <Route exact path='/login' render={() => (
                store.getState().user.showLogIn_signUp === '/login' ? <LogInForm /> : (<Redirect to='/' />)
            )} />
            <Route exact path='/signup' render={() => (
                store.getState().user.showLogIn_signUp === '/signup' ? <SignUpForm /> : (<Redirect to='/' />)
            )} />

            <Route exact path='/continent' render={() => (
                getIsLogged() === true ? <Continent /> : (<Redirect to='/' />)
            )} />
            <Route exact path='/continent/:id/view' render={(props) => (
                getIsLogged() === true ? <ContinentView {...props} /> : (<Redirect to='/' />)
            )} />

            <Route exact path='/country' render={() => (
                getIsLogged() === true ? <Country /> : (<Redirect to='/' />)
            )} />
            <Route exact path='/country/:id/view' render={(props) => (
                getIsLogged() === true ? <CountryView {...props} /> : (<Redirect to='/' />)
            )} />

            <Route exact path='/province' render={() => (
                getIsLogged() === true ? <Province /> : (<Redirect to='/' />)
            )} />
            <Route exact path='/province/:id/view' render={(props) => (
                getIsLogged() === true ? <ProvinceView {...props} /> : (<Redirect to='/' />)
            )} />

            <Route exact path='/city-town' render={() => (
                getIsLogged() === true ? <CityTown /> : (<Redirect to='/' />)
            )} />
            <Route exact path='/city-town/:id/view' render={(props) => (
                getIsLogged() === true ? <CityTownView {...props} /> : (<Redirect to='/' />)
            )} />

            <Route exact path='/suburb' render={() => (
                getIsLogged() === true ? <Suburb /> : (<Redirect to='/' />)
            )} />
            <Route exact path='/suburb/:id/view' render={(props) => (
                getIsLogged() === true ? <SuburbView {...props} /> : (<Redirect to='/' />)
            )} />

            {/* task should be handled by admins only*/}
            <Route exact path='/system-user' render={() => (<User />
                // getCurrentUserRole() === true ? <User /> : (<Redirect to='/dashboard' />)
            )} />
            <Route exact path='/system-user/:id/view' render={(props) => (<UserView {...props} />
                //    getCurrentUserRole() === true ? <UserView {...props} /> : (<Redirect to='/dashboard' />)
            )} />

            <Route exact path='/company' render={() => (
                getIsLogged() === true ? <Company /> : (<Redirect to='/' />)
            )} />
            <Route exact path='/company/:id/view' render={(props) => (
                getIsLogged() === true ? <CompanyView {...props} /> : (<Redirect to='/' />)
            )} />

        </Fragment>
    );
}

export default AppRoutes;

