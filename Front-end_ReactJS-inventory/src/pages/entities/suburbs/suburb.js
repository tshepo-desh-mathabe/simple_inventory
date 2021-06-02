import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { CreateSuburb } from './suburb_create';
import { getAllSuburbs } from '../../../service/api_service/suburb_api';

class Suburb extends Component {
    constructor() {
        super()

        this.state = {
            suburbs: []
        }
    }

    componentDidMount() {
        getAllSuburbs()
            .then(response => {
                this.setState({
                    suburbs: response
                });
            });
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron">
                    <h3>Suburbs</h3>
                    <hr />
                    <div className='row'>
                        <div className='col-sm-1'></div>
                        <div className='col-sm-10'>
                            <table className="table">
                                <thead className="thead-light">
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>City/Town</th>
                                        <th>Province</th>
                                        <th>Country</th>
                                        <th><CreateSuburb /></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.suburbs.map(e => {
                                            return (

                                                <tr key={e.id}>
                                                    <td>{e.id}</td>
                                                    <td>
                                                        <Link
                                                            to={`/suburb/${e.id}/view`}>
                                                            {e.name}
                                                        </Link>
                                                    </td>
                                                    <td>{e.cityTown.name} </td>
                                                    <td>{e.cityTown.province.name}</td>
                                                    <td>{e.cityTown.province.country.name}</td>
                                                    <td></td>
                                                </tr>

                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className='col-sm-1'></div>
                    </div>
                </div>
                <hr />
                Add Pagination
                </div>
        );
    }
}

export default Suburb;