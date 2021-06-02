import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { CreateProvince } from './province_create';
import { getAllProvinces } from '../../../service/api_service/province_api';

class Province extends Component {
    constructor() {
        super()

        this.state = {
            provinces: []
        }
    }

    componentDidMount() {
        getAllProvinces()
            .then(response => {
                this.setState({
                    provinces: response
                });
            });
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron">
                    <h3>Provinces</h3>
                    <hr />
                    <div className='row'>
                        <div className='col-sm-2'></div>
                        <div className='col-sm-8'>
                            <table className="table">
                                <thead className="thead-light">
                                    <tr>
                                        <th><div className='col-sm-3'>ID</div></th>
                                        <th><div className='col-sm-3'>Name</div></th>
                                        <th><div className='col-sm-3'>Country</div></th>
                                        <th><div className='col-sm-3'>Continent</div></th>
                                        <th>
                                            <div className='col-sm-3'>
                                                <CreateProvince />
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.provinces.map(e => {
                                            return (

                                                <tr key={e.id}>
                                                    <td>
                                                        <div className='col-sm-3'>{e.id}</div>
                                                    </td>
                                                    <td>
                                                        <Link
                                                            to={`/province/${e.id}/view`}>
                                                            <div className='col-sm-3'>{e.name}</div>
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <div className='col-sm-3'>{e.country.name}</div>
                                                    </td>
                                                    <td>
                                                        <div className='col-sm-3'>{e.country.continent.name}</div>
                                                    </td>
                                                </tr>

                                            );
                                        })
                                    }
                                </tbody>
                            </table></div>
                        <div className='col-sm-2'></div>
                    </div>
                    <hr />
                    Add Pagination
                </div>
            </div>
        );
    }
}

export default Province;