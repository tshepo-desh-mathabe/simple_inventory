import React, { Component } from 'react';
import { saveSuburb } from '../../../service/api_service/suburb_api';
import { getAllCityTowns } from '../../../service/api_service/city_town_api';

export class CreateSuburb extends Component {
    constructor() {
        super()

        this.state = {
            cityTowns: [],
            suburbName: '',
            cityTown: {}
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    componentDidMount() {
        getAllCityTowns()
            .then(response => {
                this.setState({ cityTowns: response });
            });
    }

    handleChange(e) {
        this.setState({
            suburbName: e.target.value
        });
    }

    handleSelectChange(e) {
        this.setState({ cityTown: e.target.value });        
    }

    shouldComponentUpdate(nextProp, nextState) {
        return (this.state.cityTown === nextState.cityTown ? true : false )
    }

    render() {
        return (
            <main>
                <div className="modal fade" id="createSuburb" tabIndex="-1" role="dialog" aria-labelledby="createSuburbLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">

                                <h4 className="modal-title" id="createSuburbLabel">Create New Suburb</h4>

                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>

                            </div>
                            <div className="modal-body">

                                <label htmlFor='suburb'><b>Suburb Name:</b></label>
                                <input
                                    type="text"
                                    className='form-control w-75'
                                    id="suburb"
                                    required='true'
                                    placeholder='Pimville'
                                    value={this.state.suburbName}
                                    onChange={this.handleChange}
                                />
                                <br />
                                <div className='form-group w-75'>
                                    <label htmlFor='cityTown'><b>Select City/Town</b></label>
                                    <select className='form-control' id='cityTown' onChange={this.handleSelectChange} >
                                        <option></option>
                                        {
                                            this.state.cityTowns.map((e, i) => {
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
                                    
                                    let findCityTown = this.state.cityTowns.find( (con) => {
                                        return ( con.name === this.state.cityTown ? con : null);
                                    });

                                    const suburbRequest = {
                                        name: this.state.suburbName,
                                        cityTown: findCityTown
                                    }

                                    saveSuburb(suburbRequest)
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

                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#createSuburb">
                    Create New Suburb
            </button>

            </main>
        );
    }
}
