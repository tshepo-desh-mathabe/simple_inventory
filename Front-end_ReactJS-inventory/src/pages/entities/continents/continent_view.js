import React, { Component } from 'react';
import { getContinentById } from '../../../service/api_service/continent_api';
import { EditDeleteContinent } from './continent_edit';

class ContinentView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            continent: {},
            name: '',
        }

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        getContinentById(this.props.match.params.id)
            .then(response => {
                this.setState({ continent: response });
            });
    }

    handleChange(e) {
        this.setState({
            name: e.target.value
        });
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="jumbotron">
                        <h3>{this.state.continent.name}</h3>
                        <hr />
                        <div className='row'>
                            <div className='col-sm-2'></div>

                            <div className='col-sm-8'>
                                <table className="table">
                                    <thead className="thead-light">
                                        <tr>
                                            <th><div className='col-sm-4'>ID</div></th>
                                            <th><div className='col-sm-4'>Name</div></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className='col-sm-4'>{this.state.continent.id}</div>
                                            </td>
                                            <td>
                                                <div className='col-sm-4'>{this.state.continent.name}</div>
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
                                <EditDeleteContinent continentName={this.state.name} onChange={this.handleChange} getState={this.state.continent} />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default ContinentView;