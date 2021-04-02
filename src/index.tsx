import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import Header from './components/header';
import Routines from './pages/routines';
import Add from './pages/add';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});


const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <Header />
      <Switch>
        <Route path="/routines">
          <Routines />

        </Route>
        <Route path="/add">
          <Add />
        </Route>
      </Switch>
    </Router>
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));