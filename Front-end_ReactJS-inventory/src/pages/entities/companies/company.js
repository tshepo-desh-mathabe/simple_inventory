import React, { Component } from 'react';
import { ViewAll } from './company_data_view';
import { CreateCompany } from './company_create';
import { getAllCompanies } from '../../../service/api_service/company_api';

class Company extends Component {
    constructor() {
        super()
        this.state = {
            users: [],
            showAllData: false
        }
        this.handleDataShow = this.handleDataShow.bind(this);
    }

    componentDidMount() {
        getAllCompanies()
            .then(response => {
                console.log('response:::', response)
                this.setState({ users: response });
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
                            <h3>Companies</h3>
                        </div>
                        <div className='col-sm-6'>
                            <button type="button" className="btn btn-secondary" onClick={this.handleDataShow}>
                                Show All Company Data</button>
                            <CreateCompany />
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


export default Company;