import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import React, {Component} from 'react';

const action = {};

class Home extends Component {

    componentWillMount() {
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillReceiveProps(newProps) {
        console.log("Home componentWillReceiveProps", newProps);

    }

    render() {
        return (
            <div className="">
                Here
            </div>
        )
    }
}

Home.defaultProps = {};

const mapStateToProps = (state) => {
    return {}
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        action,
        dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);