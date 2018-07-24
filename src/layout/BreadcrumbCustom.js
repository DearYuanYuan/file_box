import React from 'react';
import { connect } from 'react-redux';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';


class BreadcrumbCustom extends React.Component {
    constructor(props) {
        super(props);
    };
    // shouldComponentUpdate(nextProps, nextState) {
    //     if (nextProps.breadCrumb !== this.props.breadCrumb) {
    //        alert(1111)
    //         return false;
    //     }else{
    //         alert(2222)
    //     }

    //    return true;
    // }
    render() {
        let { breadCrumb } = this.props;
        return (
            <Breadcrumb className='breadCrumb' >
                <Breadcrumb.Item><Link to={`${breadCrumb.path}`}>{breadCrumb.text}</Link></Breadcrumb.Item>

            </Breadcrumb>
            
        )
    }
}

const mapStateToProps = state => {
    const BreadcrumbReducer = state.BreadcrumbReducer;
    return {
        breadCrumb: BreadcrumbReducer.breadCrumb
    }
}

export default connect(mapStateToProps)(BreadcrumbCustom);