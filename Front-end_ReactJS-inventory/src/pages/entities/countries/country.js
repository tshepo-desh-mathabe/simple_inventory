import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { CreateCountry } from './country_create';
import { getAllCountries } from '../../../service/api_service/country_api';

class Country extends Component {
    constructor() {
        super()

        this.state = {
            countries: []
        }
    }

    componentDidMount() {
        getAllCountries()
            .then(response => {
                this.setState({
                    countries: response
                });
            });
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron">
                    <h3>Countries</h3>
                    <hr />
                    <div className='row'>
                        <div className='col-sm-2'></div>
                        <div className='col-sm-8'>
                            <table className="table">
                                <thead className="thead-light">
                                    <tr>
                                        <th><div className='col-sm-4'>ID</div></th>
                                        <th><div className='col-sm-4'>Name</div></th>
                                        <th><div className='col-sm-4'>Continent</div></th>
                                        <th>
                                            <div className='col-sm-4'>
                                                <CreateCountry />
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.countries.map(e => {
                                            return (

                                                <tr key={e.id}>
                                                    <td>
                                                        <div className='col-sm-4'>{e.id}</div>
                                                    </td>
                                                    <td>
                                                        <Link
                                                            to={`/country/${e.id}/view`}>
                                                            <div className='col-sm-4'>{e.name}</div>
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <div className='col-sm-4'>{e.continent.name}</div>
                                                    </td>
                                                    <td>
                                                        <div className='col-sm-4'></div>
                                                    </td>
                                                </tr>

                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className='col-sm-2'></div>
                    </div>
                    <hr />
                    Add Pagination
                </div>
            </div>
        );
    }
}

export default Country;