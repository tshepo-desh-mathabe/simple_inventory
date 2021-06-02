import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { CreateContinent } from './continent_create';
import { getAllContinents } from '../../../service/api_service/continent_api';

class Continent extends Component {
    constructor() {
        super()

        this.state = {
            continents: [],
            name: ''
        }

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        getAllContinents()
            .then(response => {
                this.setState({
                    continents: response
                });
            });
    }

    handleChange(e) {
        this.setState({
            name: e.target.value
        });
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron">
                    <h3>Continents</h3>
                    <hr />
                    <div className='row'>
                        <div className='col-sm-2'></div>
                        <div className='col-sm-9'>
                            <table className="table">
                                <thead className="thead-light">
                                    <tr>
                                        <th><div className='col-sm-4'>ID</div></th>
                                        <th><div className='col-sm-4'>Name</div></th>
                                        <th>
                                            <div className='col-sm-4'>
                                                <CreateContinent continentName={this.state.name} onChange={this.handleChange} />
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.continents.map(e => {
                                            return (

                                                <tr key={e.id}>
                                                    <td>
                                                        <div className='col-sm-4'>{e.id}</div>
                                                    </td>
                                                    <td>
                                                        <Link
                                                            to={`/continent/${e.id}/view`}>
                                                            <div className='col-sm-4'>{e.name}</div>
                                                        </Link>
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
                        <div className='col-sm-1'></div>
                    </div>
                    <hr />
                    Add Pagination
                </div>
            </div>
        );
    }
}

export default Continent;