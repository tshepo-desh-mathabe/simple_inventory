import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { CreateCityTown } from './city_town_create';
import { getAllCityTowns } from '../../../service/api_service/city_town_api';

class CityTown extends Component {
    constructor() {
        super()

        this.state = {
            cityTowns: []
        }
    }

    componentDidMount() {
        getAllCityTowns()
            .then(response => {
                this.setState({
                    cityTowns: response
                });
            });
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron">
                    <h3>City/Town</h3>
                    <hr />
                    <div className='row'>
                        <div className='col-sm-2'></div>
                        <div className='col-sm-8'>
                            <table className="table">
                                <thead className="thead-light">
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Province</th>
                                        <th>Country</th>
                                        <th><CreateCityTown /></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.cityTowns.map(e => {
                                            return (

                                                <tr key={e.id}>
                                                    <td>{e.id}</td>
                                                    <td>
                                                        <Link
                                                            to={`/city-town/${e.id}/view`}>
                                                            {e.name}
                                                        </Link>
                                                    </td>
                                                    <td>{e.province.name}</td>
                                                    <td>{e.province.country.name}</td>
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

export default CityTown;