import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';
import store from 'store/store.js';
import { history } from 'store/middleware';
import './App.css';
import { Layout } from 'antd';
import ArticlesList from '../pages/ArticlesList';

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Layout className='generalSettings'>
          <Switch>
            <Route exact path='/create' component={ArticlesList} />
            <Route exact path='/' component={ArticlesList} />
            {/*<Route path='' component={News} />*/}
          </Switch>
        </Layout>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
