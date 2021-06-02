import React, { Component } from 'react';
import * as SingleImageBase64Model from '../service/base64_data_model';

let isLoad = false; // use session storage
class ImageFilePicker extends Component {
    constructor() {
        super()
        this.state = {
            isImageLoaded: false
        }
    }

    shouldComponentUpdate(nextProp, nextState) {

        // console.log('next state', nextState,
        //             'previous state', this.state, 
        //             'session data', JSON.parse( sessionStorage.getItem('load'))
        //         );

        return (JSON.parse( sessionStorage.getItem('load') ) === nextState.isImageLoaded ? true : false)
    }

    componentWillUnmount() {
        SingleImageBase64Model.removeSingleImageBase64();
    }

    render() {
        return (
            <div className='form-group'>
                <label htmlFor='filePickerImage'><b>User Image: fix loader</b></label>
                <div className='center-img'>
                    <img src={SingleImageBase64Model.getSingleImageBase64()} className='img-fluid h-50 w-50' alt='' />
                </div>
                <br />
                <input
                    id="filePickerImage"
                    className='w-100'
                    name='filePickerImage'
                    type="file"
                    onChange={(evt) => {

                        let files = evt.target.files;
                        let file = files[0];

                        if (files && file) {
                            let reader = new FileReader();
                            reader.onload = function (readerEvt) {
                                let binaryString = readerEvt.target.result;
                                const image = btoa(binaryString);
                                const formattedImage = 'data:image/octet-stream;base64,' + image;
                                isLoad = true
                                sessionStorage.setItem('load', JSON.stringify(isLoad))
                                SingleImageBase64Model.setSingleImageBase64(formattedImage);
                            }
                            reader.readAsBinaryString(file);


                            if ( JSON.parse(sessionStorage.getItem('load')) === true) {
                                this.setState({ isImageLoaded: true });
                            } else {
                                this.setState({ isImageLoaded: false });
                            }
                        }
                    }}
                    accept="image/*" />
                <div className='invalid-feedback' />
            </div>
        );
    }
}

export default ImageFilePicker;