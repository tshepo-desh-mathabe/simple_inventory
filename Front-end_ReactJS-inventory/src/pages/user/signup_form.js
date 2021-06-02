import React, { PureComponent } from 'react';
import { Router } from 'react-router-dom';
import FormValidation from '../error_handling/form_validation';
import createHistory from 'history/createBrowserHistory';
import signup_pic from '../../assets/signup_pic.png';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/lib/connect/connect';
import * as StateActionCreatorNavBar from '../../app_state/nav_state/action';
// import * as StateActionCreatorHttp from '../../app_state/http_state/action';
import store from '../../app_state/store';
import { saveUser } from '../../service/api_service/user_api';
import { getAllUserRoles } from '../../service/api_service/user_role_api';

import './user.css';
const history = createHistory();

class SignUpForm extends PureComponent {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            username: '',
            firstName: '',
            lastName: '',
            confirmPassword: '',
            securityQuestion: '',
            securityAnswer: '',
            roles: [],
            showPasswordError: false
        }

        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    /**
     * This method is the one that should handle your form submits.
     * Timpcally, it will send the form data with an ajax call to your server.
     * In react, you would usually use the axios lib for that.
     **/
    submit() {

        if (this.state.password !== this.state.confirmPassword) {
            this.setState({ ...this.state, showPasswordError: true });
            setTimeout(() => { this.setState({ showPasswordError: true }); }, 500);
        }
        else {
            const findRoleAdmin = this.state.roles.filter( e => {
                return e.name === 'ROLE_ADMIN' ? e : null;
            });            

            const requestBody = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                username: this.state.username,
                password: this.state.password,
                securityQuestion: this.state.securityQuestion,
                securityAnswer: this.state.securityAnswer,
                roles: findRoleAdmin,
            };
            
            saveUser(requestBody)
                .then(response => {
                    if ( response.success === true)
                        alert(response.message);
                    history.push('/login');
                })
                .catch(error => {
                    if ( error.message.substr(0,28) === 'Validation failed for object'){
                        alert(error.errors[0].field + " " + error.errors[0].defaultMessage + " characters")
                        
                    } else {                    
                    alert(error.message);
                    }
                });
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    _renderSuccessMessage() {
        return (
            <div className='alert alert-danger alert-dismissible fade show mt-4' role='alert'>
                Passwords do not match, please re-try
                <button type='button' className='close' data-dismiss='alert' aria-label='Close'>
                    <span aria-hidden='true'>&times;</span>
                </button>
            </div>
        );
    }

    handleKeyPress(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
        }
    }

    componentDidMount() {
        history.push('/signup');

        getAllUserRoles()
        .then(response => {
            this.setState({ roles: response });
        });
    }
    componentWillUnmount() { }

    render() {
        return (
            <Router history={history}>
                    <div className='container'>
                        <div className='card bg-light text-dark w-75 mx-auto d-block d-flex'>
                            <div className='card-header'>
                                <h3>
                                    <b>Inventory User Registration</b>
                                </h3>
                            </div>
                            <div className='row'>
                                <div className='col-sm-1'></div>
                                <div className='col-sm-11'>
                                    <div className='card-body '>
                                        <div className='center-img'>
                                            <img src={signup_pic} className='img-fluid h-25 w-25 mx-auto d-block' alt='' />
                                        </div>
                                        <br />
                                        <FormValidation submit={this.submit}>
                                            <div className='row'>
                                                <div className='col-sm-6'>

                                                    <div className='form-group'>
                                                        <label htmlFor='firstName'><b>First Name:</b></label>
                                                        <input
                                                            id={'firstName'}
                                                            className={'form-control w-75'}
                                                            required={true}
                                                            name={'firstName'}
                                                            type={'text'}
                                                            value={this.state.firstName}
                                                            onChange={this.handleChange} />
                                                        <div className='invalid-feedback' />
                                                    </div>

                                                    <div className='form-group'>
                                                        <label htmlFor='lastName'><b>Last Name:</b></label>
                                                        <input
                                                            id={'lastName'}
                                                            className={'form-control w-75'}
                                                            required={true}
                                                            name={'lastName'}
                                                            type={'text'}
                                                            value={this.state.lastName}
                                                            onChange={this.handleChange} />
                                                        <div className='invalid-feedback' />
                                                    </div>

                                                    <div className={'form-group'}>
                                                        <label htmlFor={'username'} ><b>User Name:</b></label>
                                                        <input
                                                            id={'username'}
                                                            className={'form-control w-75'}
                                                            required={true}
                                                            name={'username'}
                                                            type={'username'}
                                                            value={this.state.username}
                                                            onChange={this.handleChange} />
                                                        <div className='invalid-feedback' />
                                                    </div>
                                                </div>

                                                <div className='col-sm-6'>

                                                    <div className={'form-group'}>
                                                        <label htmlFor={'email'} ><b>Email:</b></label>
                                                        <input
                                                            id={'email'}
                                                            className={'form-control w-75'}
                                                            required={true}
                                                            name={'email'}
                                                            type={'email'}
                                                            value={this.state.email}
                                                            onChange={this.handleChange} />
                                                        <div className='invalid-feedback' />
                                                    </div>

                                                    <div className='form-group'>
                                                        <label htmlFor='password'><b>Password:</b></label>
                                                        <input
                                                            id={'password'}
                                                            className={'form-control w-75'}
                                                            required={true}
                                                            name={'password'}
                                                            type={'password'}
                                                            value={this.state.password}
                                                            onChange={this.handleChange} />
                                                        <div className='invalid-feedback' />
                                                    </div>

                                                    <div className='form-group'>
                                                        <label htmlFor='confirmPassword'><b>Confirm Password:</b></label>
                                                        <input
                                                            id={'confirmPassword'}
                                                            className={'form-control w-75'}
                                                            required={true}
                                                            name={'confirmPassword'}
                                                            type={'password'}
                                                            value={this.state.confirmPassword}
                                                            onChange={this.handleChange} />
                                                        <div className='invalid-feedback' />
                                                    </div>

                                                    {/* <div className='checkbox'>
                                                        <label>
                                                            <input
                                                                type='checkbox'
                                                                checked={this.state.isAdmin}
                                                                onChange={this.handleChange}
                                                                name='isAdmin' />
                                                            <b>Is Admin</b>
                                                        </label>
                                                    </div> */}

                                                    {/* <div className='form-group w-75'>
                                                        <label htmlFor='role'>Example select</label>
                                                        <select className='form-control' id='role'>
                                                            <option>HC-ROLE_USER</option>
                                                            <option>NC-ROLE_ADMIN</option>
                                                        </select>
                                                    </div> */}

                                                </div>
                                            </div>


                                            <div className='row'>
                                                <div className='col-sm-11'>
                                                    <hr />

                                                    <div className='row'>
                                                        <div className='col-sm-7'>
                                                            <div className='form-group'>
                                                                <label htmlFor='securityQuestion'><b>Security Question:</b></label>
                                                                <input
                                                                    id={'securityQuestion'}
                                                                    className={'form-control w-75'}
                                                                    required={true}
                                                                    name={'securityQuestion'}
                                                                    type={'text'}
                                                                    value={this.state.securityQuestion}
                                                                    onChange={this.handleChange} />
                                                                <div className='invalid-feedback' />
                                                            </div>
                                                        </div>

                                                        <div className='col-sm-5'>
                                                            <div className='form-group'>
                                                                <label htmlFor='securityAnswer'><b>Security Answer:</b></label>
                                                                <input
                                                                    id={'securityAnswer'}
                                                                    className={'form-control w-50'}
                                                                    required={true}
                                                                    name={'securityAnswer'}
                                                                    type={'password'}
                                                                    value={this.state.securityAnswer}
                                                                    onChange={this.handleChange} />
                                                                <div className='invalid-feedback' />
                                                            </div> 
                                                        </div>

                                                    </div>
                                                    <hr />
                                                </div>
                                            </div>


                                            <div className='row'>
                                                <div className='col-sm-6'>
                                                    <button type='submit' value='submit' className='btn btn-primary' >Register</button>
                                                </div>
                                                <div className='col-sm-6'>
                                                    <button type='button' className='btn btn-secondary' onClick={() => {
                                                        history.push('/login')
                                                    }}>Log In</button>
                                                    <button type='button' className='btn btn-secondary' onClick={() => {
                                                        history.push('/')
                                                    }}>Home</button>
                                                </div>
                                            </div>
                                        </FormValidation>
                                        {this.state.showPasswordError ? this._renderSuccessMessage() : null}
                                    </div>
                                </div>
                            </div>
                            <div className='card-footer text-muted text-center'>© 2019 All rights reserved 2019-2020 </div>
                        </div>
                    </div>
            </Router>
        );
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
            let action = StateActionCreatorNavBar.showPage(location.pathname);
            store.dispatch(action);
        } else {
            let action = StateActionCreatorNavBar.showPage(null);
            store.dispatch(action);
        }
    });
    return bindActionCreators(StateActionCreatorNavBar, dispatch);
}

export default connect(mapStateToProps, mapDispacthToProps)(SignUpForm);
