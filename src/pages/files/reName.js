import React from 'react';
import $ from 'jquery'
export default class ReName extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    };

    render() {
        return (

            <div className="operate-model-content-file">
                <input className="operate-model-newFile operate-model-reName" placeholder="请输入"></input>
            </div>
        )
    }
}
