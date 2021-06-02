import React, { Component, Fragment } from 'react';
import FormValidation from '../../error_handling/form_validation';
import { getAllCompanyTypes } from '../../../service/api_service/company_type_api';
import { getAllContinents } from '../../../service/api_service/continent_api';
import { getAllCountries } from '../../../service/api_service/country_api';
import { getAllProvinces } from '../../../service/api_service/province_api';
import { getAllCityTowns } from '../../../service/api_service/city_town_api';
import { getAllSuburbs } from '../../../service/api_service/suburb_api';
import { getAllAddressTypes } from '../../../service/api_service/address_type';
import { saveCompany } from '../../../service/api_service/company_api';
import './user.css';

/**
 * ***********************TO DO******************************
 * Filter country, province, city/town, and suburb dropdowns
 * **********************************************************
 */

export class CreateCompany extends Component {
    constructor() {
        super()

        this.state = {
            companyTypes: [],
            companyTypeDescriptions: [],

            addressTypes: [],

            companyType: '',
            companyName: '',
            companyDescription: '',

            email: '',
            fax: '',
            landLine: '',
            mobile: '',

            postalLine_1: '',
            postalLine_2: '',
            postalContinents: [],
            postalContinent: '',
            postalCountries: [],
            postalCountry: '',
            postalProvinces: [],
            postalProvince: '',
            postalCityTowns: [],
            postalCityTown: '',
            postalSuburbs: [],
            postalSuburb: '',
            postalCode: '',
            postalAddressType: {},

            residentialLine_1: '',
            residentialLine_2: '',
            residentialContinents: [],
            residentialContinent: '',
            residentialCountries: [],
            residentialCountry: '',
            residentialProvinces: [],
            residentialProvince: '',
            residentialCityTowns: [],
            residentialCityTown: '',
            residentialSuburbs: [],
            residentialSuburb: '',
            residentialCode: '',
            residentialAddressType: {}
        }

        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    submit() {

        if (this.state.password !== this.state.confirmPassword) {
            this.setState({ ...this.state, showPasswordError: true });
            setTimeout(() => { this.setState({ showPasswordError: true }); }, 500);
        }
        else {

            const filterPosContinent = this.state.postalContinents.filter(e => {
                return e.name === this.state.postalContinent ? e : null;
            });
            const filterResContinent = this.state.residentialContinents.filter(e => {
                return e.name === this.state.residentialContinent ? e : null;
            });

            const filterPosCountry = this.state.postalCountries.filter(e => {
                return e.name === this.state.postalCountry ? e : null;
            });
            const filterResCountry = this.state.residentialCountries.filter(e => {
                return e.name === this.state.residentialCountry ? e : null;
            });

            const filterPosProvince = this.state.postalProvinces.filter(e => {
                return e.name === this.state.postalProvince ? e : null;
            });
            const filterResProvince = this.state.residentialProvinces.filter(e => {
                return e.name === this.state.residentialProvince ? e : null;
            });

            const filterPosCityTown = this.state.postalCityTowns.filter(e => {
                return e.name === this.state.postalCityTown ? e : null;
            });
            const filterResCityTown = this.state.residentialCityTowns.filter(e => {
                return e.name === this.state.residentialCityTown ? e : null;
            });

            const filterPosSuburb = this.state.postalSuburbs.filter(e => {
                return e.name === this.state.postalSuburb ? e : null;
            });
            const filterResSuburb = this.state.residentialSuburbs.filter(e => {
                return e.name === this.state.residentialSuburb ? e : null;
            });

            const filterPosAddressType = this.state.addressTypes.filter(e => {
                return e.description === 'Postal' ? e : null;
            });
            const filterResAddressType = this.state.addressTypes.filter(e => {
                return e.description === 'Residential' ? e : null;
            });

            const posAddressRequest = [];
            const resAddressRequest = [];

            const posAddressData = {
                line_1: this.state.postalLine_1,
                line_2: this.state.postalLine_2,
                cityTown: filterPosCityTown,
                suburb: filterPosSuburb,
                province: filterPosProvince,
                country: filterPosCountry,
                continent: filterPosContinent,
                code: this.state.postalCode,
                addressType: filterPosAddressType
            };

            const resAddressData = {
                line_1: this.state.residentialLine_1,
                line_2: this.state.residentialLine_2,
                cityTown: filterResCityTown,
                suburb: filterResSuburb,
                province: filterResProvince,
                country: filterResCountry,
                continent: filterResContinent,
                code: this.state.residentialCode,
                addressType: filterResAddressType
            }

            posAddressRequest.push(posAddressData);
            resAddressRequest.push(resAddressData);

            const contactDetailRequest = {
                email: this.state.email,
                fax: this.state.fax,
                landLine: this.state.landLine,
                mobile: this.state.mobile,
                residentialAddress: resAddressRequest,
                postalAddress: posAddressRequest
            };

            const requestBody = {
                name: this.state.companyName,
                description: this.state.companyDescription,
                companyTypeData: this.state.companyType,
                contactDetails: contactDetailRequest,
            };

            console.log(':::Data to be sent:::', requestBody);
            saveCompany(requestBody)
                .then(response => {
                    if (response.success === true)
                        alert(response.message);
                })
                .catch(error => {
                    if (error.message.substr(0, 28) === 'Validation failed for object') {
                        alert(error.errors[0].field + " " + error.errors[0].defaultMessage + " characters")

                    } else {
                        alert(error.message);
                    }
                });
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSelectChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });

        console.log('Yo Cube', this.state);

    }

    _renderSuccessMessage() {
        return (
            <div className='alert alert-danger alert-dismissible fade show mt-4' role='alert'>
                Passwords do not match, please re-try
                <button type='button' className='close' data-dismiss='alert' aria-label='Close'>
                    <span aria-hidden='true'>&times;</span>
                </button>
            </div>
        );
    }

    handleKeyPress(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
        }
    }

    componentDidMount() {
        getAllCompanyTypes()
            .then(response => {
                this.setState({ companyTypes: response });
            });

        getAllContinents()
            .then(response => {
                this.setState({
                    postalContinents: response,
                    residentialContinents: response
                });
            });
        getAllCountries()
            .then(response => {
                this.setState({
                    postalCountries: response,
                    residentialCountries: response
                });
            });
        getAllProvinces()
            .then(response => {
                this.setState({
                    postalProvinces: response,
                    residentialProvinces: response
                });
            });
        getAllCityTowns()
            .then(response => {
                this.setState({
                    postalCityTowns: response,
                    residentialCityTowns: response
                });
            });
        getAllSuburbs()
            .then(response => {
                this.setState({
                    postalSuburbs: response,
                    residentialSuburbs: response
                });
            });


        getAllAddressTypes()
            .then(response => {
                console.log('address type', response);
                this.setState({ addressTypes: response });
            })
    }

    render() {
        return (
            <Fragment>
                <div className="modal fade" id="createCompany" tabIndex="-1" role="dialog" aria-labelledby="createCompanyLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">

                                <h4 className="modal-title" id="createCompanyLabel">Create New Company</h4>

                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>

                            </div>
                            <div className="modal-body">
                                <div className='row'>
                                    <div className='col-sm-1'></div>
                                    <div className='col-sm-11'>
                                        <FormValidation submit={this.submit}>
                                            <div className='row'>
                                                <div className='col-sm-6'>
                                                    <div className='form-group'>
                                                        <label htmlFor='companyName'><b>Company Name:</b></label>
                                                        <input
                                                            id={'companyName'}
                                                            className={'form-control w-100'}
                                                            required={true}
                                                            name={'companyName'}
                                                            type={'text'}
                                                            value={this.state.companyName}
                                                            onChange={this.handleChange} />
                                                        <div className='invalid-feedback' />
                                                    </div>
                                                </div>

                                                <div className='col-sm-6'>
                                                    <div className='form-group'>
                                                        <label htmlFor='companyType'><b>Company Type</b></label>
                                                        <select
                                                            id={'companyType'}
                                                            className={'form-control w-100'}
                                                            required={true}
                                                            name={'companyType'}
                                                            onChange={this.handleSelectChange} >
                                                            <option></option>
                                                            {
                                                                this.state.companyTypes.map((e, i) => {
                                                                    return (
                                                                        <option
                                                                            key={i}
                                                                            value={e.json}
                                                                        >{e}</option>
                                                                    )
                                                                })
                                                            }
                                                        </select>
                                                        <div className='invalid-feedback' />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-sm-2'></div>
                                                <div className='col-sm-8'>
                                                    <div className='form-group'>
                                                        <label htmlFor='companyDescription'><b>Company Description:</b></label>
                                                        <textarea
                                                            id={'companyDescription'}
                                                            className={'form-control w-100'}
                                                            required={true}
                                                            name={'companyDescription'}
                                                            type={'text'}
                                                            value={this.state.companyDescription}
                                                            onChange={this.handleChange} ></textarea>
                                                        <div className='invalid-feedback' />
                                                    </div>
                                                </div>
                                                <div className='col-sm-2'></div>
                                            </div>
                                            <hr />

                                            <div className='row'>
                                                <div className='col-sm-6'>
                                                    <div className='form-group'>
                                                        <label htmlFor='email'><b>Email Address:</b></label>
                                                        <input
                                                            id={'email'}
                                                            className={'form-control w-100'}
                                                            required={true}
                                                            name={'email'}
                                                            type={'email'}
                                                            value={this.state.email}
                                                            onChange={this.handleChange} />
                                                        <div className='invalid-feedback' />
                                                    </div>

                                                    <div className='form-group'>
                                                        <label htmlFor='landLine'><b>Landline No.:</b></label>
                                                        <input
                                                            id={'landLine'}
                                                            className={'form-control w-100'}
                                                            required={true}
                                                            name={'landLine'}
                                                            type={'text'}
                                                            value={this.state.landLine}
                                                            onChange={this.handleChange} />
                                                        <div className='invalid-feedback' />
                                                    </div>

                                                </div>
                                                <div className='col-sm-6'>
                                                    <div className='form-group'>
                                                        <label htmlFor='fax'><b>Fax:</b></label>
                                                        <input
                                                            id={'fax'}
                                                            className={'form-control w-100'}
                                                            required={false}
                                                            name={'fax'}
                                                            type={'text'}
                                                            value={this.state.fax}
                                                            onChange={this.handleChange} />
                                                        <div className='invalid-feedback' />
                                                    </div>

                                                    <div className='form-group'>
                                                        <label htmlFor='mobile'><b>Mobile No.:</b></label>
                                                        <input
                                                            id={'mobile'}
                                                            className={'form-control w-100'}
                                                            required={false}
                                                            name={'mobile'}
                                                            type={'text'}
                                                            value={this.state.mobile}
                                                            onChange={this.handleChange} />
                                                        <div className='invalid-feedback' />
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />

                                            <div className='row'>
                                                <div className='col-sm-6'>
                                                    <label ><h6><b>Postal Address</b></h6></label>
                                                    <br />
                                                    <div className='form-group'>
                                                        <label htmlFor='postalLine_1'><b>Line 1:</b></label>
                                                        <input
                                                            id={'postalLine_1'}
                                                            className={'form-control w-100'}
                                                            required={true}
                                                            name={'postalLine_1'}
                                                            type={'text'}
                                                            value={this.state.postalLine_1}
                                                            onChange={this.handleChange} />
                                                        <div className='invalid-feedback' />
                                                    </div>

                                                    <div className='form-group'>
                                                        <label htmlFor='postalLine_2'><b>Line 2:</b></label>
                                                        <input
                                                            id={'postalLine_2'}
                                                            className={'form-control w-100'}
                                                            required={true}
                                                            name={'postalLine_2'}
                                                            type={'text'}
                                                            value={this.state.postalLine_2}
                                                            onChange={this.handleChange} />
                                                        <div className='invalid-feedback' />
                                                    </div>

                                                    <div className='form-group'>
                                                        <label htmlFor='postalContinent'><b>Continent:</b></label>
                                                        <select
                                                            id={'postalContinent'}
                                                            className={'form-control w-100'}
                                                            onChange={this.handleSelectChange}
                                                            required={true}
                                                            name={'postalContinent'} >
                                                            <option></option>
                                                            {
                                                                this.state.postalContinents.map((e, i) => {
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

                                                    <div className='form-group'>
                                                        <label htmlFor='postalCountry'><b>Country:</b></label>
                                                        <select
                                                            id={'postalCountry'}
                                                            className={'form-control w-100'}
                                                            onChange={this.handleSelectChange}
                                                            required={true}
                                                            name={'postalCountry'} >
                                                            <option></option>
                                                            {
                                                                this.state.postalCountries.map((e, i) => {
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

                                                    <div className='form-group'>
                                                        <label htmlFor='postalProvince'><b>Province:</b></label>
                                                        <select
                                                            id={'postalProvince'}
                                                            className={'form-control w-100'}
                                                            onChange={this.handleSelectChange}
                                                            required={true}
                                                            name={'postalProvince'} >
                                                            <option></option>
                                                            {
                                                                this.state.postalProvinces.map((e, i) => {
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

                                                    <div className='form-group'>
                                                        <label htmlFor='postalCityTown'><b>City/Town:</b></label>
                                                        <select
                                                            id={'postalCityTown'}
                                                            className={'form-control w-100'}
                                                            onChange={this.handleSelectChange}
                                                            required={true}
                                                            name={'postalCityTown'} >
                                                            <option></option>
                                                            {
                                                                this.state.postalCityTowns.map((e, i) => {
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

                                                    <div className='form-group'>
                                                        <label htmlFor='postalCityTown'><b>Suburb:</b></label>
                                                        <select
                                                            id={'postalSuburb'}
                                                            className={'form-control w-100'}
                                                            onChange={this.handleSelectChange}
                                                            required={true}
                                                            name={'postalSuburb'} >
                                                            <option></option>
                                                            {
                                                                this.state.postalSuburbs.map((e, i) => {
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

                                                    <div className='form-group'>
                                                        <label htmlFor='postalCode'><b>Code:</b></label>
                                                        <input
                                                            id={'postalCode'}
                                                            className={'form-control w-100'}
                                                            required={true}
                                                            name={'postalCode'}
                                                            type={'text'}
                                                            value={this.state.postalCode}
                                                            onChange={this.handleChange} />
                                                        <div className='invalid-feedback' />
                                                    </div>
                                                </div>

                                                <div className='col-sm-6'>
                                                    <label><h6><b>Residential Address</b></h6></label>
                                                    <br />
                                                    <div className='form-group'>
                                                        <label htmlFor='residentialLine_1'><b>Line 1:</b></label>
                                                        <input
                                                            id={'residentialLine_1'}
                                                            className={'form-control w-100'}
                                                            required={true}
                                                            name={'residentialLine_1'}
                                                            type={'text'}
                                                            value={this.state.residentialLine_1}
                                                            onChange={this.handleChange} />
                                                        <div className='invalid-feedback' />
                                                    </div>

                                                    <div className='form-group'>
                                                        <label htmlFor='residentialLine_2'><b>Line 2:</b></label>
                                                        <input
                                                            id={'residentialLine_2'}
                                                            className={'form-control w-100'}
                                                            required={true}
                                                            name={'residentialLine_2'}
                                                            type={'text'}
                                                            value={this.state.residentialLine_2}
                                                            onChange={this.handleChange} />
                                                        <div className='invalid-feedback' />
                                                    </div>

                                                    <div className='form-group'>
                                                        <label htmlFor='residentialContinent'><b>Continent:</b></label>
                                                        <select
                                                            id={'residentialContinent'}
                                                            className={'form-control w-100'}
                                                            onChange={this.handleSelectChange}
                                                            required={true}
                                                            name={'residentialContinent'} >
                                                            <option></option>
                                                            {
                                                                this.state.residentialContinents.map((e, i) => {
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

                                                    <div className='form-group'>
                                                        <label htmlFor='residentialCountry'><b>Country:</b></label>
                                                        <select
                                                            id={'residentialCountry'}
                                                            className={'form-control w-100'}
                                                            onChange={this.handleSelectChange}
                                                            required={true}
                                                            name={'residentialCountry'} >
                                                            <option></option>
                                                            {
                                                                this.state.residentialCountries.map((e, i) => {
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

                                                    <div className='form-group'>
                                                        <label htmlFor='residentialProvince'><b>Province:</b></label>
                                                        <select
                                                            id={'residentialProvince'}
                                                            className={'form-control w-100'}
                                                            onChange={this.handleSelectChange}
                                                            required={true}
                                                            name={'residentialProvince'} >
                                                            <option></option>
                                                            {
                                                                this.state.residentialProvinces.map((e, i) => {
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

                                                    <div className='form-group'>
                                                        <label htmlFor='residentialCityTown'><b>City/Town:</b></label>
                                                        <select
                                                            id={'residentialCityTown'}
                                                            className={'form-control w-100'}
                                                            onChange={this.handleSelectChange}
                                                            required={true}
                                                            name={'residentialCityTown'} >
                                                            <option></option>
                                                            {
                                                                this.state.residentialCityTowns.map((e, i) => {
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

                                                    <div className='form-group'>
                                                        <label htmlFor='residentialSuburb'><b>Suburb:</b></label>
                                                        <select
                                                            id={'residentialSuburb'}
                                                            className={'form-control w-100'}
                                                            onChange={this.handleSelectChange}
                                                            required={true}
                                                            name={'residentialSuburb'} >
                                                            <option></option>
                                                            {
                                                                this.state.residentialSuburbs.map((e, i) => {
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

                                                    <div className='form-group'>
                                                        <label htmlFor='residentialCode'><b>Code:</b></label>
                                                        <input
                                                            id={'residentialCode'}
                                                            className={'form-control w-100'}
                                                            required={true}
                                                            name={'residentialCode'}
                                                            type={'text'}
                                                            value={this.state.residentialCode}
                                                            onChange={this.handleChange} />
                                                        <div className='invalid-feedback' />
                                                    </div>
                                                </div>

                                            </div>

                                            <hr />
                                            <div className='row'>
                                                <div className='col-sm-6'></div>
                                                <div className='col-sm-6'>
                                                    <button type='submit' value='submit' className='btn btn-primary' >Register</button>
                                                    <button type="button" className="btn btn-secondary" data-dismiss="modal" >Close</button>
                                                </div>
                                            </div>
                                        </FormValidation>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#createCompany">
                    Create New Company
                </button>

            </Fragment >
        );
    }
}
