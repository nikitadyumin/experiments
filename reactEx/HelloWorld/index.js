import ReactDOM from 'react-dom';
import React from 'react';

let HelloMessage = class extends React.Component {
    render() {
        return <div>Hello {this.props.name}!</div>;
    }
};

ReactDOM.render(<HelloMessage name='World'/>, document.getElementById('playground'));
