import React from 'react';
import {
    BrowserRouter as Router,
    IndexRoute,
    Route,
    Link,
    Switch,
    Redirect,
    withRouter
} from "react-router-dom";
import Login from './login';
import Home from './home';
import NotFoundPage from './notFoundPage';
import {isAuthenticated} from '../localstorage/local_storage';
import {Breadcrumb} from 'antd';
import Master from './header';


const breadcrumbNameMap = {
    // '/': 'Home',
    // '/home': 'Home',
    '/users': 'Les utilisateurs',
    '/clients': 'Les clients abonnés',
    '/addClient': 'Abonner un nouveau client\n',
};


const App = withRouter((props) => {
    const {location} = props;
    const pathSnippets = location.pathname.split('/').filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        return (
            <Breadcrumb.Item key={url}>
                <Link to={url} replace>
                    {breadcrumbNameMap[url] ? breadcrumbNameMap[url] : pathSnippets[index] ? pathSnippets[index] : ""}
                </Link>
            </Breadcrumb.Item>
        );
    });
    const breadcrumbItems = [(
        <Breadcrumb.Item key="home">
            <Link to="/">Home</Link>
        </Breadcrumb.Item>
    )].concat(extraBreadcrumbItems);
    return (
        <div className="page-wrapper be-wrapper" id={(isAuthenticated() && location.pathname.indexOf("login") === -1) ? '' : 'login'}>
            {(isAuthenticated() && location.pathname.indexOf("login") === -1) ? <Master location={props.location}/> : ''}
            <div className="main-content">
                <div className="content">
                    <Switch>
                        <Route exact path="/login" component={Login}/>
                        <PrivateRoute exact path="/" component={Home}/>
                        <PrivateRoute component={NotFoundPage}/>
                    </Switch>
                </div>
            </div>
        </div>
    );
});

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: {from: props.location}
                    }}
                />
            )
        }
    />
);

export default App;