import React, { Component } from 'react';
import { updateCityTown, deleteCityTown } from '../../../service/api_service/city_town_api';
import { getAllProvinces } from '../../../service/api_service/province_api';

export class EditDeleteCityTown extends Component {
    constructor(props) {
        super(props)

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
                this.setState({ provinces: response });
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
    
    render() {
        return (
            <main>
                <div className="modal fade" id="createCityTown" tabIndex="-1" role="dialog" aria-labelledby="createCityTownLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
    
                                <h4 className="modal-title" id="createCityTownLabel">Edit {this.props.getState.name}</h4>
    
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
    
                            </div>
                            <div className="modal-body">
    
                                <label htmlFor='cityTown'><b>City Town Name:</b></label>
                                <input
                                    type="text"
                                    className='form-control w-75'
                                    id="cityTown"
                                    required='true'
                                    placeholder='Edit here'
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

                                    let findProvince = this.state.provinces.find( (con) => {
                                        return ( con.name === this.state.province ? con : null);
                                    });

                                    const cityTownRequest = {
                                        id:this.props.getState.id,
                                        name: this.state.cityTownName,
                                        province: findProvince
                                    }
    
                                    updateCityTown(cityTownRequest)
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
    
                <button type="button" className="btn btn-secondary" data-toggle="modal" data-target="#createCityTown">
                    Edit
                </button>
    
                <button type='button' className='btn btn-danger' onClick={() => {

                    deleteCityTown(this.props.getState.id)
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
    
                }}>Delete</button>
            </main>
        );
    }
}
