import React from 'react';
import $ from 'jquery'
export default class NewFile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    };

    render() {
        return (

            <div className="operate-model-content-file">
                <input className="operate-model-newFile" placeholder="新建文件夹"></input>
            </div>
        )
    }
}
