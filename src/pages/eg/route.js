import React from 'react'
import { Redirect, Switch } from "react-router-dom";
import {Router} from '../router';

// Layouts
import Layout from 'layouts/layout';

// Routes
import Eg from './index';

export default function route() {
  return (
    <Switch>
      <Router routeName="dashboard" path="/" component={Eg.Dashboard} layout={Layout} />
      <Redirect to="/404" />
    </Switch>
  )
}
