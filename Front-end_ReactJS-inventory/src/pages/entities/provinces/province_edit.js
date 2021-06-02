import React, { Component } from 'react';
import { updateProvince, deleteProvince } from '../../../service/api_service/province_api';
import { getAllCountries } from '../../../service/api_service/country_api';

export class EditDeleteProvince extends Component {
    constructor(props) {
        super(props)

        this.state = {
            countries: [],
            provinceName: '',
            country: {}
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    componentDidMount() {
        getAllCountries()
            .then(response => {
                this.setState({ countries: response });
            });
    }
    
    handleChange(e) {
        this.setState({
            provinceName: e.target.value
        });
    }

    handleSelectChange(e) {
        this.setState({ country: e.target.value });        
    }
    
    render() {
        return (
            <main>
                <div className="modal fade" id="createProvince" tabIndex="-1" role="dialog" aria-labelledby="createCityTownLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
    
                                <h4 className="modal-title" id="createCityTownLabel">Edit {this.props.getState.name}</h4>
    
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
    
                            </div>
                            <div className="modal-body">
    
                                <label htmlFor='province'><b>Province Name:</b></label>
                                <input
                                    type="text"
                                    className='form-control w-75'
                                    id="province"
                                    required='true'
                                    placeholder='Edit here'
                                    value={this.state.provinceName}
                                    onChange={this.handleChange}
                                />
                               <br />
                                    <div className='form-group w-75'>
                                        <label htmlFor='country'><b>Select Country</b></label>
                                        <select className='form-control' id='country' onChange={this.handleSelectChange} >
                                            <option></option>
                                            {
                                                this.state.countries.map((e, i) => {
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
    
                                    let findCountry = this.state.countries.find( (con) => {
                                        return ( con.name === this.state.province ? con : null);
                                    });

                                    const provinceRequest = {
                                        id:this.props.getState.id,
                                        name: this.state.provinceName,
                                        continent: findCountry
                                    }
    
                                    updateProvince(provinceRequest)
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
    
                <button type="button" className="btn btn-secondary" data-toggle="modal" data-target="#createProvince">
                    Edit
                </button>
    
                <button type='button' className='btn btn-danger' onClick={() => {

                    deleteProvince(this.props.getState.id)
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
