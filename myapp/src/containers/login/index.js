import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {history} from '../../store';
import {saveState} from '../../localstorage/local_storage';
import {message} from 'antd';
import {TYPES_RESPONSES} from "../../config/responses";
import * as authActions from '../../actions/login';
import * as i18n from "i18next";

const action = {...authActions};

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            login: '',
            password: ''
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.userSignin = this.userSignin.bind(this);
    }

    // user signing
    userSignin(event) {
        event.preventDefault();
        if (this.state.login === '' || this.state.password === '') {
            message.error(i18n.t("authentication.form_invalid"));
        } else {
            this.props.requestSignin({
                data: this.state,
            });
        }
    }

    // onInputchange
    onInputChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    componentWillReceiveProps(newProps) {
        console.log("componentWillReceiveProps Login");
        if (newProps.signinStatus !== this.state.signinStatus) {
            if (newProps.signinStatus === TYPES_RESPONSES.REQUESTED) {
                console.log("Loading signin user ...");
            } else if (newProps.signinStatus === TYPES_RESPONSES.SUCCESS) {
                console.log("Login SUCCESS ");
                saveState('currentUser', newProps.auth);
                history.push('/');
            } else if (newProps.signinStatus === TYPES_RESPONSES.ERROR) {
                console.log("Login ERROR ", newProps.error);
                message.error(i18n.t("authentication.cnx_error"), 5);
            }
        }
    }

    render() {
        const {signinStatus} = this.props;

        return (
            <div className="main-content container-fluid">
                <div className="splash-container login-content">
                    <div className="card card-border-color card-border-color-primary">
                        <div className="card-header">
                            <div className="logo-bp"></div>
                            <span>{i18n.t("authentication.title")}</span>
                        </div>
                        <div className="card-body be-loading">
                            <div
                                className={"be-loading " + (signinStatus === TYPES_RESPONSES.REQUESTED && "be-loading-active")}>

                                {(signinStatus === TYPES_RESPONSES.REQUESTED) ?
                                    <div className="be-spinner">
                                        <svg width="40px" height="40px" viewBox="0 0 66 66"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <circle fill="none" strokeWidth="4" strokeLinecap="round" cx="33" cy="33"
                                                    r="30" className="circle"></circle>
                                        </svg>
                                    </div>
                                    :
                                    null}
                                <form onSubmit={this.userSignin} className="form-group">
                                    <div className="form-group">
                                        <input id="login" className="form-control require"
                                               placeholder={i18n.t("authentication.lbl_login")}
                                               name="login"
                                               type="login"
                                               value={this.state.login}
                                               onChange={this.onInputChange}
                                        />
                                    </div>
                                    <div className="form-group">

                                        <input id="password" className="form-control require"
                                               placeholder={i18n.t("authentication.lbl_password")}
                                               name="password"
                                               type="password"
                                               value={this.state.password}
                                               onChange={this.onInputChange}
                                        />
                                    </div>
                                    <div className="form-group login-submit">
                                        <button type="submit"
                                                className="btn btn-primary btn-xl btn-block">{i18n.t("authentication.btn_login")}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.authentication.auth,
        signinStatus: state.authentication.signinStatus,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        action,
        dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);