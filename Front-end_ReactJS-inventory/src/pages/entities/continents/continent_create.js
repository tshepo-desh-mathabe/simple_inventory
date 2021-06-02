import React from 'react';
import { saveContinent } from '../../../service/api_service/continent_api';

export const CreateContinent = (props) => {
    return (
        <main>
            <div className="modal fade" id="createContinent" tabIndex="-1" role="dialog" aria-labelledby="createContinentLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">

                            <h4 className="modal-title" id="createContinentLabel">Create New Continent</h4>

                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>

                        </div>
                        <div className="modal-body">

                            <label htmlFor='continent'><b>Continent Name:</b></label>
                            <input
                                type="text"
                                className='form-control w-75'
                                id="continent"
                                required='true'
                                placeholder='Africa'
                                value={props.continentName}
                                onChange={props.onChange}
                            />

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" >Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => {
                                const continentRequest = {
                                    name: props.continentName
                                }
                                saveContinent(continentRequest)
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

            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#createContinent">
                Create New Continent
            </button>

        </main>
    );
}
