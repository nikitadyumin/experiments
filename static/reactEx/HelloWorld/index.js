import ReactDOM from 'react-dom';
import React from 'react';

let HelloMessage = (props) => {
    return ( <div>Hello {props.name}!</div>);
};

ReactDOM.render(<HelloMessage name='World'/>, document.getElementById('playground'));
