import React from 'react';

export const Foot = () => {
    return (
        <footer style={{
            backgroundColor: 'rgb(35, 35, 35)',
            position: 'fixed',
            bottom: '0',
            left: '0',
            right: '0',
            textAlign: 'center',
            color: '#CCC',
            padding: '12px'
        }}>
            <p>&copy; All rights reserved for fun Ha!!!</p>
        </footer>

        // <footer className='navbar fixed-bottom navbar-expand-sm bg-dark navbar-dark'style={{
        //     textAlign: 'center',
        //     color: '#CCC',
        // }}>
        // <p >&copy; All rights reserved 2019-2020</p>
        // </footer>

    );
}