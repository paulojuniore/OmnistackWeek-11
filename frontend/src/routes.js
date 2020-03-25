import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Logon} exact />
        <Route path="/register" component={Register} />
      </Switch>
    </BrowserRouter>
  )
}

