import React, { Component } from 'react';
import { getSuburbById } from '../../../service/api_service/suburb_api';
import { EditDeleteSuburb } from './suburb_edit';

class SuburbView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            suburb: {},
            cityTownObject: {}
        }

    }

    componentDidMount() {
        getSuburbById(this.props.match.params.id)
            .then(response => {
                this.setState({
                    suburb: response,
                    cityTownObject: response.cityTown
                });
            });
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron">
                    <h3>{this.state.suburb.name}</h3>
                    <hr />
                    <div className='row'>
                        <div className='col-sm-2'></div>
                        <div className='col-sm-8'>
                            <table className="table">
                                <thead className="thead-light">
                                    <tr>
                                        <th><div className='col-sm-4'>ID</div></th>
                                        <th><div className='col-sm-4'>Name</div></th>
                                        <th><div className='col-sm-4'>City/Town</div></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className='col-sm-4'>{this.state.suburb.id}</div>
                                        </td>
                                        <td>
                                            <div className='col-sm-4'>{this.state.suburb.name}</div>
                                        </td>
                                        <td>
                                            <div className='col-sm-4'>{this.state.cityTownObject.name}</div>
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
                            <EditDeleteSuburb getState={this.state.suburb} />

                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default SuburbView;