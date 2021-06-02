import React, { Component } from 'react';
import createHistory from 'history/createBrowserHistory';
import { ViewAll } from './user_data_view';
import { CreateUser } from './user_create';
import { getAllUsers } from '../../../service/api_service/user_api';

const history = createHistory();
class User extends Component {
    constructor() {
        super()

        this.state = {
            users: [],
            showAllData: false
        }
        this.handleDataShow = this.handleDataShow.bind(this);
    }

    componentDidMount() {
        history.push('/system-user');
        getAllUsers()
            .then(response => {
                this.setState({
                    users: response
                });
            });
    }

    handleDataShow() {
        this.setState(prevState => ({
            showAllData: !prevState.showAllData
        }))
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron">
                    <div className='row'>
                        <div className='col-sm-6'>
                            <h3>Registered Users</h3>
                        </div>
                        <div className='col-sm-6'>
                            <button type="button" className="btn btn-secondary" onClick={this.handleDataShow}>
                                Show All User Data</button>
                            <CreateUser />
                        </div>
                    </div>
                    <hr />
                    <ViewAll showData={this.state.showAllData} users={this.state.users}/>
                    <hr />
                    Add Pagination
                </div>
            </div>
        );
    }
}


export default User;