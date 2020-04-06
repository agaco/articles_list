import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';
import store from 'store/store.js';
import { history } from 'store/middleware';
import './App.css';
import { Layout } from 'antd';
import ArticlesList from '../pages/ArticlesList';
import SingleArticle from '../pages/SingleArticle';
import Header from '../components/Header';

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Header/>
        <Layout className='generalSettings'>
          <Switch>
            <Route exact path='/' component={ArticlesList} />
            <Route path="/article/:id" component={SingleArticle} />
          </Switch>
        </Layout>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
