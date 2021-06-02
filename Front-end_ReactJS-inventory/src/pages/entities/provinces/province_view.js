import React, { Component } from 'react';
import { getProvinceById } from '../../../service/api_service/province_api';
import { EditDeleteProvince } from './province_edit';

class ProvinceView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            province: {},
            countryObject: {}
        }

    }

    componentDidMount() {
        getProvinceById(this.props.match.params.id)
            .then(response => {
                this.setState({
                    province: response,
                    countryObject: response.country
                });
            });
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron">
                    <h3>{this.state.province.name}</h3>
                    <hr />
                    <div className='row'>
                        <div className='col-sm-2'></div>
                        <div className='col-sm-8'>
                            <table className="table">
                                <thead className="thead-light">
                                    <tr>
                                        <th><div className='col-sm-4'>ID</div></th>
                                        <th><div className='col-sm-4'>Name</div></th>
                                        <th><div className='col-sm-4'>Country</div></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className='col-sm-4'>{this.state.province.id}</div>
                                        </td>
                                        <td>
                                            <div className='col-sm-4'>{this.state.province.name}</div>
                                        </td>
                                        <td>
                                            <div className='col-sm-4'>{ this.state.countryObject.name}</div>
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
                            <EditDeleteProvince getState={this.state.province} />

                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default ProvinceView;