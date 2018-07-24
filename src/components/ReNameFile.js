import React from 'react';



import { Modal, Button } from 'antd';
import { Link } from 'react-router-dom';



//search页面重命名模块
class ReNameFile extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Modal
                title="重命名(原名称)"
                wrapClassName="vertical-center-modal"
                visible={this.props.openReName}
                onOk={this.props.submitReName}
                onCancel={this.props.closeReName}
                cancelText={this.props.cancelText}
                okText={this.props.okText}
            >
                <form action='' onSubmit={this.props.submitReName} >
                    <label className='action_label'>
                        文件/文件夹名称:<input className='action_input' type="reName" placeholder="········" onChange={this.props.handleReName} value={this.props.reName} />
                    </label>
                </form>

                <style>
                {`
                /* 模块居中样式    */
                    .vertical-center-modal {
                        text-align: center;
                        white-space: nowrap;
                    }
        
                    .vertical-center-modal:before {
                        content: '';
                        display: inline-block;
                        height: 100%;
                        vertical-align: middle;
                        width: 0;
                     }
        
                    .vertical-center-modal .ant-modal {
                        display: inline-block;
                        vertical-align: middle;
                        top: 0;
                        text-align: left;
                    }
        
                    .vertical-center-modal {
                        display: flex;
                         align-items: center;
                        justify-content: center;
                    }
        
                    .vertical-center-modal .ant-modal {
                         top: 0;
                    }`
                    
                }
                </style>
            </Modal>

        )
    }
}

export default ReNameFile