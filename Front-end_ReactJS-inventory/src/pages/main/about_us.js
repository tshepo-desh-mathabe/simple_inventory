import React, { Component } from 'react';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();

class AboutUs extends Component {
    componentDidMount() {
        history.push('/about-us');
    }

    render() {
        return (
            <div>
                <br /><br />
                <h1 style={{ color: 'black' }}>AboutUs Page</h1>
            </div>
        );
    }
}

export default AboutUs;