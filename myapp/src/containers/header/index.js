import React, {Component} from 'react'; // get the React object from the react module
import {
    Link
} from 'react-router-dom';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import i18n from '../../i18n';
import {history} from '../../store';
import {loadState, logout, checkRole} from '../../localstorage/local_storage';
import {Modal} from 'antd';
import {message} from "antd/lib/index";
import {TYPES_RESPONSES} from "../../config/responses";
import * as authActions from "../../actions/login";

let currentUser = loadState('currentUser');
const action = {...authActions};

class Master extends Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    componentWillReceiveProps(newProps) {
        console.log("Master componentWillReceiveProps", newProps);
        if (newProps.logoutStatus !== this.props.logoutStatus) {
            if (newProps.logoutStatus === TYPES_RESPONSES.REQUESTED) {
                console.log("Loading logout account ...");
            } else if (newProps.logoutStatus === TYPES_RESPONSES.SUCCESS) {
                message.success(i18n.t("authentication.disconnect"));
                if (logout()) {
                    history.push('/login')
                }
            } else if (newProps.logoutStatus === TYPES_RESPONSES.ERROR) {
                message.error(i18n.t("authentication.logout_error"));
            }
        }
    }

    logout() {
        Modal.confirm({
            title: i18n.t("authentication.lbl_logout"),
            content: i18n.t("authentication.msg_confirmation_logout"),
            onOk: () => {
                this.props.requestLogout();
            },
            onCancel() {
                console.log('Cancel confirmation logout!');
            },
        });
    }

    renderItem(path, diplayName, role, submenu, location) {
        let checked = checkRole(role);
        let submenuRender = '';
        if (submenu) {
            submenuRender = submenu.map((subm, key) => {
                return (
                    (
                        checkRole(subm.role)
                            ?
                            <li key={key}><Link className={location.pathname == subm.path ? 'active' : ""}
                                                to={subm.path}
                                                replace>{subm.label}</Link></li>
                            :
                            ''
                    )
                );
            });
        }

        return (
            checked
                ?
                <li className={(submenu ? 'nav-item parent' : 'nav-item')}>
                    <Link className={location.pathname.indexOf(path) > -1 ? 'active' : ""} to={path}
                          replace>{diplayName}</Link>
                    {
                        (
                            submenu != null
                                ?
                                <ul>{submenuRender}</ul>
                                : ''
                        )
                    }
                </li>
                :
                null
        );
    }

    render() {
        const userProfil = JSON.parse(localStorage.getItem('currentUser'));
        const location = this.props.location;
        return (

            <div className="page-header">
                <nav className="navbar page-header navbar-expand-lg navbar-light fixed-top be-top-header">
                    <div className="logo-container">
                        <div className="logo-bp"></div>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <div className="field-search">
                            <div className="hidden-section">
                                <i className="material-icons">search</i>
                                <input type="text" name="" id="" placeholder="Rechercher un client"/>
                            </div>
                        </div>
                    </div>
                    <div className="user-infos">
                        <span
                            className="user-name">{i18n.t('authentication.msg_bienvenue')}
                            <strong>{userProfil ? userProfil.user.login : ''}</strong></span>
                        <ul>
                            <li className="nav-item" onClick={this.logout}>
                                <span>{i18n.t('authentication.btn_logout')} <i
                                    className="material-icons">exit_to_app</i></span>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}


const styles = {
    navBar: {
        backgroundColor: "#e67b00"
    },
    title: {
        color: '#333',
        fontSize: '24px'
    }
};


function mapStateToProps(state) {
    console.log('state ', state);
    return {
        logoutStatus: state.authentication.logoutStatus,
        error: state.authentication.error,
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
)(Master);