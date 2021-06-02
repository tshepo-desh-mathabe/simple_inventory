import React, { Component } from 'react';
import { Router, Link } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { getCurrentUser } from '../../service/api_service/user_api';

import { bindActionCreators } from 'redux';
import connect from 'react-redux/lib/connect/connect';
import * as StateActionCreator from '../../app_state/http_state/action';
import store from '../../app_state/store';

import * as CurrentUser from '../../service/current_user_data_model';

import './main.css';

const history = createHistory();

class DashBoard extends Component {
    
    componentDidMount() {
        getCurrentUser()
            .then(response => { 
                CurrentUser.setCurrentUser(response)
            });
    }

    componentWillUnmount() {
        CurrentUser.removeCurrentUser();
    }

    render() {
        return (
            <Router history={history}>
                <main className='main'>
                    <div className="container">
                        <div className="jumbotron">
                            <h3>More Options</h3>
                            <hr />
                            <ul>
                                <li>
                                    <Link
                                        to='/calculator'
                                        exact='true'
                                        className='nav-link'>Calculator</Link>
                                </li>
                                <li>
                                    <Link
                                        to='/calender'
                                        exact='true'
                                        className='nav-link'>Calender (set reminder 'n staff)</Link>
                                </li>
                                <li>
                                    <Link
                                        to='/message-supplier'
                                        exact='true'
                                        className='nav-link'>Chat with Supplier</Link>
                                </li>
                                <li>
                                    <Link
                                        to='/message-partner'
                                        exact='true'
                                        className='nav-link'>Chat with Partner</Link>
                                </li>
                                <li>
                                    <Link
                                        to='/set-auto/stock-ordering'
                                        exact='true'
                                        className='nav-link'>Set automated stock ordering</Link>
                                </li>
                                <li>
                                    <Link
                                        to='/stock-timeline'
                                        exact='true'
                                        className='nav-link'>View stock timeline</Link>
                                </li>
                                <li>
                                    <Link
                                        to='/sales-graph'
                                        exact='true'
                                        className='nav-link'>View sales graphs (weekly sales should be default)</Link>
                                </li>
                            </ul>
                            <hr />
                        </div>
                    </div>
                </main>
            </Router>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        http_responses: state.http_responses
    }
}

const mapDispacthToProps = (dispatch) => {
    let action = StateActionCreator.systemUserHttpResponse(CurrentUser.getCurrentUser());
    store.dispatch(action);
    return bindActionCreators(StateActionCreator, dispatch);
}

export default connect(mapStateToProps, mapDispacthToProps)(DashBoard);