import React, { Component } from 'react';
import { saveCityTown } from '../../../service/api_service/city_town_api';
import { getAllProvinces } from '../../../service/api_service/province_api';

export class CreateCityTown extends Component {
    constructor() {
        super()

        this.state = {
            provinces: [],
            cityTownName: '',
            province: {}
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    componentDidMount() {
        getAllProvinces()
            .then(response => {
                this.setState({
                    provinces: response
                });
            });
    }

    handleChange(e) {
        this.setState({
            cityTownName: e.target.value
        });
    }

    handleSelectChange(e) {
        this.setState({ province: e.target.value });
    }

    shouldComponentUpdate(nextProp, nextState) {
        return (this.state.province === nextState.province ? true : false)
    }

    render() {
        return (
            <main>
                <div className="modal fade" id="createCityTown" tabIndex="-1" role="dialog" aria-labelledby="createCityTownLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">

                                <h4 className="modal-title" id="createCityTownLabel">Create New City Town</h4>

                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>

                            </div>
                            <div className="modal-body">

                                <label htmlFor='CityTown'><b>City/Town Name:</b></label>
                                <input
                                    type="text"
                                    className='form-control w-75'
                                    id="CityTown"
                                    required='true'
                                    placeholder='Soweto'
                                    value={this.state.cityTownName}
                                    onChange={this.handleChange}
                                />
                                <br />
                                <div className='form-group w-75'>
                                    <label htmlFor='province'><b>Select Province</b></label>
                                    <select className='form-control' id='province' onChange={this.handleSelectChange} >
                                        <option></option>
                                        {
                                            this.state.provinces.map((e, i) => {
                                                return (
                                                    <option
                                                        key={i}
                                                        value={e.json}
                                                    >{e.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" >Close</button>
                                <button type="button" className="btn btn-primary" onClick={() => {

                                    let findProvince = this.state.provinces.find((con) => {
                                        return (con.name === this.state.province ? con : null);
                                    });

                                    const cityTownRequest = {
                                        name: this.state.cityTownName,
                                        province: findProvince
                                    }                                    

                                    saveCityTown(cityTownRequest)
                                        .then(response => {
                                            if (response.success === true) {
                                                alert(response.message);
                                            }
                                        })
                                        .catch(error => {

                                            if (error.message.substr(0, 28) === 'Validation failed for object') {
                                                alert(error.errors[0].field + " " + error.errors[0].defaultMessage + " characters")

                                            } else {
                                                alert(error.message);
                                            }
                                        })
                                }}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>

                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#createCityTown">
                    Create New Country
            </button>

            </main>
        );
    }
}
