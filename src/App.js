import React, {Component} from 'react';
import ShopLayout from './components/layouts/shop-layout/shop-layout';
import AuthLayout from './components/layouts/auth-layout/auth-layout';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import Shop from './containers/shop/shop';
import Auth from './containers/auth/auth';
import withAuthentication from './hoc/withAuthentication/withAuthentication';
// import AuthRoute from './hoc/auth-route/auth-route';
import {connect} from 'react-redux';
import {AUTH_MODE} from './containers/auth/auth-constants';
import {compose} from 'redux';

class App extends Component {

  render() {
    const authLayoutRoutes = (
      <AuthLayout>
        <Switch>
          <Route
            path='/signin'
            render={(props) => <Auth { ...props } mode={AUTH_MODE.SIGN_IN}/>}/>
          <Route
            path='/signup'
            render={(props) =>< Auth {
            ...props
          }
          mode = {
            AUTH_MODE.SIGN_UP
          } />}/>
          <Route render={(props) => <Redirect from="*" to='/signin'/>}/>
        </Switch>
      </AuthLayout>
    )

    const shopRoutes = (
      <ShopLayout>
        <Switch>
          <Route path='/orders'/> {/* <AuthRoute
            path='/'
            exact
            component={Shop}
            authenticated={this.props.isAuthenticated}/> */}
          <Route path='/' exact component={withAuthentication(Shop)}/>
          <Route render={(props) => <Redirect from="*" to='/'/>}/>
        </Switch>
      </ShopLayout>
    )
    const displayLayout = this.props.isAuthenticated
      ? shopRoutes
      : authLayoutRoutes;

    return (
      <div>{displayLayout}</div>
    );
  }
}

const mapStateToProps = (state) => ({isAuthenticated: state.auth.isAuthenticated})

export default compose(withRouter, connect(mapStateToProps))(App)
