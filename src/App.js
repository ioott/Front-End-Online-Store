import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import ShoppingCard from './pages/ShoppingCard';

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route extc path="/" component={ ShoppingCard } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
