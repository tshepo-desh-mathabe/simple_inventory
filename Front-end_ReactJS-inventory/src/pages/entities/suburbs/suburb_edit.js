import React, { Component } from 'react';
import { updateSuburb, deleteSuburb } from '../../../service/api_service/suburb_api';
import { getAllCityTowns } from '../../../service/api_service/city_town_api';

export class EditDeleteSuburb extends Component {
    constructor(props) {
        super(props)

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
    
    render() {
        return (
            <main>
                <div className="modal fade" id="createSuburb" tabIndex="-1" role="dialog" aria-labelledby="createSuburbLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
    
                                <h4 className="modal-title" id="createSuburbLabel">Edit {this.props.getState.name}</h4>
    
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
                                    placeholder='Edit here'
                                    value={this.state.suburbName}
                                    onChange={this.handleChange}
                                />
                               <br />
                                    <div className='form-group w-75'>
                                        <label htmlFor='province'><b>Select Province</b></label>
                                        <select className='form-control' id='province' onChange={this.handleSelectChange} >
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
                                        id:this.props.getState.id,
                                        name: this.state.suburbName,
                                        cityTown: findCityTown
                                    }
    
                                    updateSuburb(suburbRequest)
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
    
                <button type="button" className="btn btn-secondary" data-toggle="modal" data-target="#createSuburb">
                    Edit
                </button>
    
                <button type='button' className='btn btn-danger' onClick={() => {
    
                    deleteSuburb(this.props.getState.id)
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
