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
import Loader from './components/ui/loader/loader';
import Alert from './components/ui/alert/alert';
import * as actions from './actions/index';

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
        <Loader show={this.props.shopLoading}/>
        <Alert show={this.props.showAlert} type={this.props.alertType} message={this.props.alertMessage} onClose={this.props.clearSuccessError}/>
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

const mapStateToProps = (state) => {

  return {
    isAuthenticated: state.auth.isAuthenticated,
    shopLoading: state.shop.loading,
    showAlert: (state.shop.error || state.shop.success ? true : false),
    alertType: (state.shop.error ? 'alert-danger' : (state.shop.success ? 'alert-success' : '')),
    alertMessage: (state.shop.error ? state.shop.error : (state.shop.success ? state.shop.success : ''))
  }
}


export default compose(withRouter, connect(mapStateToProps,actions))(App)
