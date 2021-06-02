import React, { Component } from 'react';
import { getCompanyById } from '../../../service/api_service/company_api';
import { EditDeleteCompany } from './company_edit';

class CompanyView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            userRole: []
        }

    }

    componentDidMount() {
        getCompanyById(this.props.match.params.id)
            .then(response => {
                this.setState({
                    user: response,
                    userRole: response.roles
                });
            });
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="jumbotron">
                        <h3>{this.state.user.firstName} {this.state.user.lastName} aka {this.state.user.username}</h3>
                        <hr />
                        <div className='row'>
                            <div className='col-sm-2'></div>
                            <div className='col-sm-8'>
                                <table className="table">
                                    <thead className="thead-light">
                                        <tr>
                                            <th>ID</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{this.state.user.id}</td>
                                            <td>{this.state.user.firstName}</td>
                                            <td>{this.state.user.lastName}</td>
                                            <td>{this.state.user.email}</td>
                                            <td>
                                                {this.state.userRole.map(i => {
                                                    return (<div key={i.id}>{i.name}</div>)
                                                })}
                                            </td>
                                            <td>
                                                <div className='center-img'>
                                                    <img src={this.state.user.photo} className='img-fluid h-50 w-50' alt='' />
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className='col-sm-2'></div>
                        </div>
                        <hr />

                        <div className='row'>
                            <div className='col-sm-2'></div>
                            <div className='col-sm-4'>
                                <button type='button' className='btn btn-primary' onClick={() => {
                                    window.history.back();
                                }}>Back</button>
                            </div>

                            <div className='col-sm-6'>
                                <EditDeleteCompany userId={this.props.match.params.id}/>

                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }

}

export default CompanyView;