import React from 'react';
import $ from 'jquery'
import { Tooltip } from 'antd';
export default class ShareFileCancel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    };


    componentWillMount() {

    }
    render() {
        return (

            <div className="operate-model-content-file">
                <ul className="operate-model-file-list">
                    <li> <i className="fa fa-file"></i>{this.props.operateFileName}</li>
                </ul>
            </div>
        )
    }
}
