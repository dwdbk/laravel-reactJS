import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component } from 'react';

const NotFoundPage = props => (
    <div className="page">
        <div className="app-header">
            <h1 className="title is-1 has-text-primary">Page Not Found</h1>
            <h1>Nothing to see here, move along, move along...</h1>
        </div>
    </div>
)

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch)
};

export default connect(
    null,
    mapDispatchToProps
)(NotFoundPage);