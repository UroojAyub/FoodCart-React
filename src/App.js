import React, {Component} from 'react';
import ShopLayout from './components/layouts/shop-layout/shop-layout';
import {Route, Switch} from 'react-router-dom';
import Shop from './containers/shop/shop';

class App extends Component {
  render() {
    return (
      <div >
        <ShopLayout>
          <Switch>
            <Route path='/checkout' />
            <Route path='/your-orders' />
            <Route path='/' exact component={Shop}/>
          </Switch>
        </ShopLayout>
      </div>
    );
  }
}

export default App;
