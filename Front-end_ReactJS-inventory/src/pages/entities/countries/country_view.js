import React, { Component } from 'react';
import { getCountryById } from '../../../service/api_service/country_api';
import { EditDeleteCountry } from './country_edit';

class CountryView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            country: {},
            continentObject: {}
        }

    }

    componentDidMount() {
        getCountryById(this.props.match.params.id)
            .then(response => {
                this.setState({
                    country: response,
                    continentObject: response.continent
                });
            });
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="jumbotron">
                        <h3>{this.state.country.name}</h3>
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
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className='col-sm-4'>{this.state.country.id}</div>
                                            </td>
                                            <td>
                                                <div className='col-sm-4'>{this.state.country.name}</div>
                                            </td>
                                            <td>
                                                <div className='col-sm-4'>{this.state.continentObject.name}</div>
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
                                <EditDeleteCountry getState={this.state.country} />

                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }

}

export default CountryView;