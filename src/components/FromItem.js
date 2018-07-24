import React from 'react';
require('./fromItem.less')
class FromItem extends React.Component {

    render() {
        return (
            <label htmlFor={this.props.type} className='from_label'>  {this.props.text}
                <input type={this.props.type} placeholder={this.props.placeholder} className='from_input' />
            </label>

        )
    }
}

export default FromItem