import React, { Component } from 'react';
import { updateCountry, deleteCountry } from '../../../service/api_service/country_api';
import { getAllContinents } from '../../../service/api_service/continent_api';

export class EditDeleteCountry extends Component {
    constructor(props) {
        super(props)

        this.state = {
            continents: [],
            countryName: '',
            continent: {}
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    componentDidMount() {
        getAllContinents()
            .then(response => {
                this.setState({ continents: response });
            });
    }
    
    handleChange(e) {
        this.setState({
            countryName: e.target.value
        });
    }

    handleSelectChange(e) {
        this.setState({ continent: e.target.value });        
    }
    
    render() {
        return (
            <main>
                <div className="modal fade" id="createCountry" tabIndex="-1" role="dialog" aria-labelledby="createCountryLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
    
                                <h4 className="modal-title" id="createCountryLabel">Edit {this.props.getState.name}</h4>
    
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
    
                            </div>
                            <div className="modal-body">
    
                                <label htmlFor='country'><b>Country Name:</b></label>
                                <input
                                    type="text"
                                    className='form-control w-75'
                                    id="country"
                                    required='true'
                                    placeholder='Edit here'
                                    value={this.state.countryName}
                                    onChange={this.handleChange}
                                />
                               <br />
                                    <div className='form-group w-75'>
                                        <label htmlFor='continent'><b>Select Continent</b></label>
                                        <select className='form-control' id='continent' onChange={this.handleSelectChange} >
                                            <option></option>
                                            {
                                                this.state.continents.map((e, i) => {
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

                                    let findContinent = this.state.continents.find( (con) => {
                                        return ( con.name === this.state.continent ? con : null);
                                    });

                                    const countryRequest = {
                                        id:this.props.getState.id,
                                        name: this.state.countryName,
                                        continent: findContinent
                                    }
    
                                    updateCountry(countryRequest)
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
    
                <button type="button" className="btn btn-secondary" data-toggle="modal" data-target="#createCountry">
                    Edit
                </button>
    
                <button type='button' className='btn btn-danger' onClick={() => {
    
                    deleteCountry(this.props.getState.id)
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
