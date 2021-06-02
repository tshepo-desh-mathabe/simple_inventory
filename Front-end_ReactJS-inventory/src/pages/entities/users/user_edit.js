import React, { Component, Fragment } from 'react';
import FormValidation from '../../error_handling/form_validation';
// import { saveUser } from '../../../service/api_service/user_api';
import { getAllUserRoles } from '../../../service/api_service/user_role_api';
import ImageFilePicker from '../../../components/image_file_picker';
import { getUserById, deleteUser, updateUser } from '../../../service/api_service/user_api';
import './user.css';
// import { HashSet } from '../../../hash-lib/hashset';

export class EditDeleteUser extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userRoles: [],
            userRole: {},
            role: '',
            email: '',
            password: '',
            username: '',
            firstName: '',
            lastName: '',
            confirmPassword: '',
            photo: '',
            securityAnswer: '',
            securityQuestion: '',
            showPasswordError: false
        }

        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    componentDidMount() {
        getUserById(this.props.userId)
            .then(response => {                
                this.setState({
                    email: response.email,
                    username: response.username,
                    firstName: response.firstName,
                    lastName: response.lastName,
                    photo: response.photo
                })
            });

        getAllUserRoles()
            .then(response => {
                this.setState({ userRoles: response });

            });
    }

    submit() {

        if (this.state.password !== this.state.confirmPassword) {
            this.setState({ ...this.state, showPasswordError: true });
            setTimeout(() => { this.setState({ showPasswordError: true }); }, 500);
        }
        else {            
            let findRole = this.state.userRoles.filter( (e) => {
                return ( e.name === this.state.userRole ? e : null);
            });  

            const requestBody = {
                id: this.props.userId,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                username: this.state.username,
                password: this.state.password,
                securityQuestion: this.state.securityQuestion,
                securityAnswer: this.state.securityAnswer,
                roles: findRole
                // photo: getSingleImageBase64(),
            };

            updateUser(requestBody)
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
        this.setState({ userRole: e.target.value });        
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

    render() {
        return (
            <Fragment>
                <div className="modal fade" id="editDeleteUser" tabIndex="-1" role="dialog" aria-labelledby="editDeleteUserLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">

                                <h4 className="modal-title" id="editDeleteUserLabel">Edit User {this.state.firstName} {this.state.lastName}</h4>

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
                                                        <label htmlFor='firstName'><b>First Name:</b></label>
                                                        <input
                                                            id={'firstName'}
                                                            className={'form-control w-75'}
                                                            required={true}
                                                            name={'firstName'}
                                                            type={'text'}
                                                            value={this.state.firstName}
                                                            onChange={this.handleChange} />
                                                        <div className='invalid-feedback' />
                                                    </div>

                                                    <div className='form-group'>
                                                        <label htmlFor='lastName'><b>Last Name:</b></label>
                                                        <input
                                                            id={'lastName'}
                                                            className={'form-control w-75'}
                                                            required={true}
                                                            name={'lastName'}
                                                            type={'text'}
                                                            value={this.state.lastName}
                                                            onChange={this.handleChange} />
                                                        <div className='invalid-feedback' />
                                                    </div>

                                                    <div className={'form-group'}>
                                                        <label htmlFor={'username'} ><b>User Name:</b></label>
                                                        <input
                                                            id={'username'}
                                                            className={'form-control w-75'}
                                                            required={true}
                                                            name={'username'}
                                                            type={'username'}
                                                            value={this.state.username}
                                                            onChange={this.handleChange} />
                                                        <div className='invalid-feedback' />
                                                    </div>

                                                    <div className={'form-group'}>
                                                        <label htmlFor={'email'} ><b>Email:</b></label>
                                                        <input
                                                            id={'email'}
                                                            className={'form-control w-75'}
                                                            required={true}
                                                            name={'email'}
                                                            type={'email'}
                                                            value={this.state.email}
                                                            onChange={this.handleChange} />
                                                        <div className='invalid-feedback' />
                                                    </div>
                                                </div>

                                                <div className='col-sm-6'>

                                                    <ImageFilePicker />

                                                    <div className='form-group'>
                                                        <label htmlFor='password'><b>Password:</b></label>
                                                        <input
                                                            id={'password'}
                                                            className={'form-control w-75'}
                                                            required={true}
                                                            name={'password'}
                                                            type={'password'}
                                                            value={this.state.password}
                                                            onChange={this.handleChange} />
                                                        <div className='invalid-feedback' />
                                                    </div>

                                                    <div className='form-group'>
                                                        <label htmlFor='confirmPassword'><b>Confirm Password:</b></label>
                                                        <input
                                                            id={'confirmPassword'}
                                                            className={'form-control w-75'}
                                                            required={true}
                                                            name={'confirmPassword'}
                                                            type={'password'}
                                                            value={this.state.confirmPassword}
                                                            onChange={this.handleChange} />
                                                        <div className='invalid-feedback' />
                                                    </div>

                                                </div>
                                            </div>
                                            <hr />
                                            <div className='row'>
                                                <div className='col-sm-3'></div>
                                                <div className='col-sm-6'>
                                                    <div className='form-group w-75'>
                                                        <label htmlFor='role'><b>Select User Role</b></label>
                                                        <select
                                                            id={'role'}
                                                            className={'form-control'}
                                                            required={true}
                                                            name={'role'}
                                                            onChange={this.handleSelectChange} >
                                                            <option></option>
                                                            {
                                                                this.state.userRoles.map((e, i) => {
                                                                    return (
                                                                        <option
                                                                            key={i}
                                                                            value={e.json}
                                                                        >{e.name}</option>
                                                                    )
                                                                })
                                                            }
                                                        </select>
                                                        <div className='invalid-feedback' />
                                                    </div>
                                                </div>
                                                <div className='col-sm-6'></div>
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
                                        {this.state.showPasswordError ? this._renderSuccessMessage() : null}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <button type="button" className="btn btn-secondary" data-toggle="modal" data-target="#editDeleteUser">
                    Edit
                </button>

                <button type='button' className='btn btn-danger' onClick={() => {

                    deleteUser(this.props.userId)
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

            </Fragment>
        );
    }
}
