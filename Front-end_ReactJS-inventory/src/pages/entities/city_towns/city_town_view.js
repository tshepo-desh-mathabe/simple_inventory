import React, { Component } from 'react';
import { getCityTownById } from '../../../service/api_service/city_town_api';
import { EditDeleteCityTown } from './city_town_edit';

class CityTownView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cityTown: {},
            provinceObject: {}
        }

    }

    componentDidMount() {
        getCityTownById(this.props.match.params.id)
            .then(response => {
                this.setState({
                    cityTown: response,
                    provinceObject: response.province
                });
            });
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="jumbotron">
                        <h3>{this.state.cityTown.name}</h3>
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
                                                <div className='col-sm-4'>{this.state.cityTown.id}</div>
                                            </td>
                                            <td>
                                                <div className='col-sm-4'>{this.state.cityTown.name}</div>
                                            </td>
                                            <td>
                                                <div className='col-sm-4'>{this.state.provinceObject.name}</div>
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
                                <EditDeleteCityTown getState={this.state.cityTown} />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default CityTownView;