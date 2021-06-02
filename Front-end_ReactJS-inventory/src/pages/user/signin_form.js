import React, { PureComponent } from 'react';
import login_pic from '../../assets/login_pic.png';
import { Router } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/lib/connect/connect';
import * as StateActionCreator_Nav from '../../app_state/nav_state/action';
import * as StateActionCreator_Login from '../../app_state/http_state/action';
import store from '../../app_state/store';
import FormValidation from '../error_handling/form_validation';
import { login } from '../../service/api_service/user_api';
import * as SignInModel from '../../service/signin_data_model';
import './user.css';

import createHistory from 'history/createBrowserHistory';

const history = createHistory();

class LogInForm extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            emailUsername: '',
            password: '',
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

        const requestBody = {
            usernameOrEmail: this.state.emailUsername,
            password: this.state.password,
        }

        login(requestBody)
            .then(response => {
                SignInModel.setUsername(this.state.emailUsername);
                SignInModel.setSecretToken(response.accessToken)
                SignInModel.setIsLogged(true);
                alert('LogIn Successful');
                history.push('/dashboard');
            }).catch(error => {
                console.error('Something Went wrong...', error);
            });
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
        history.push('/login')
    }
    componentWillUnmount() { }

    render() {
        return (
            <Router history={history}>
                <div className='container'>
                    <div className='card bg-light text-dark w-75 mx-auto d-block'>
                        <div className='card-header'>
                            <h3>
                                <b>Inventory User LogIn</b>
                            </h3>
                        </div>
                        <div className='row'>
                            <div className='col-sm-2'></div>
                            <div className='col-sm-10'>
                                <div className='card-body '>
                                    <div className='center-img'>
                                        <img src={login_pic} className='img-fluid h-25 w-25' alt='' />
                                    </div>
                                    <br />
                                    <FormValidation submit={this.submit}>
                                        <div className={'form-group'}>
                                            <label htmlFor={'emailUsername'} ><b>Email / Username:</b></label>
                                            <input
                                                id={'emailUsername'}
                                                className={'form-control w-50'}
                                                required={true}
                                                name={'emailUsername'}
                                                type={'emailUsername'}
                                                value={this.state.emailUsername}
                                                onChange={this.handleChange} />
                                            <div className='invalid-feedback' />
                                        </div>

                                        <div className='form-group'>
                                            <label htmlFor='password'><b>Password:</b></label>
                                            <input
                                                id={'password'}
                                                className={'form-control w-50'}
                                                required={true}
                                                name={'password'}
                                                type={'password'}
                                                value={this.state.password}
                                                onChange={this.handleChange} />
                                            <div className='invalid-feedback' />
                                        </div>

                                        <div className='row'>
                                            <div className='col-sm-6'>
                                                <button type='button' className='btn btn-link'>I forgot my password, please help...</button>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-sm-6'>
                                                <hr />
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-sm-3'>
                                                <button type='submit' value='submit' className='btn btn-primary'>LogIn</button>
                                            </div>
                                            <div className='col-sm-9'>
                                                <button type='button' className='btn btn-secondary' onClick={() => {
                                                    history.push('/signup')
                                                }}>Sign Up</button>
                                                <button type='button' className='btn btn-secondary' onClick={() => {
                                                    history.push('/')
                                                }}>Home</button>
                                            </div>
                                        </div>
                                    </FormValidation>
                                </div>
                            </div>
                        </div>
                        <div className='card-footer text-muted text-center'>&copy; 2019 All rights reserved 2019-2020 </div>
                    </div>
                </div>
            </Router>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        http_responses: state.http_responses
    }
}

const mapDispacthToProps = (dispatch) => {
    history.listen((location) => {
        if (location.pathname === '/login' || location.pathname === '/signup') {
            let actionNav = StateActionCreator_Nav.showPage(location.pathname);
            store.dispatch(actionNav);
        } else {
            let actionNav = StateActionCreator_Nav.showPage(null);
            store.dispatch(actionNav);
        }
    });

    return bindActionCreators({ StateActionCreator_Nav, StateActionCreator_Login }, dispatch);
}

export default connect(mapStateToProps, mapDispacthToProps)(LogInForm);
