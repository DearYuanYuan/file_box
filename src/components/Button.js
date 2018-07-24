import React from 'react';
require('./button.less')
class Button extends React.Component {

    render() {
        return (
            <div className={`button ${this.props.color}`} onClick={() => {this.props.btnClick(this.props.text)}}>
                {this.props.text}
            </div>
        )
    }
}

export default Button