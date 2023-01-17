//Dependencies
import React from "react";
import { Redirect, Switch } from "react-router-dom";
import {connect} from 'react-redux'
import {Router} from './router';

// Layouts
import LayoutAuth from "layouts/LayoutAuth";
import LayoutEmpty from "layouts/LayoutEmpty";
import Layout from "layouts/layout"

// Router
import Loading from "./loading";
import Commun from './commun';
import Ma from './ma/route';
import Eg from './eg/route';

const Routes = ({user, token, loading}) => {
  if(loading) {
    return <Loading />;
  }
  return (
    <Switch>
      <Redirect from="/" exact={true} to="/auth/sign-in" />
      <Redirect from="/auth" exact={true} to="/auth/sign-in" />
      {/* Auth Pages */}
      <Router routeName="sign-in" path="/auth/sign-in" component={Commun.Login} layout={LayoutAuth} />
      <Router routeName="sign-up" path="/auth/sign-up" component={Commun.Register} layout={LayoutAuth} /> 
      <Router routeName="forgot-password" path="/auth/forgot-password" component={Commun.ForgotPassword} layout={LayoutAuth} />
      <Router routeName="reset-password" path="/auth/new-password/:token" component={Commun.NewPassword} layout={LayoutAuth} />
      <Router routeName="welcome-step" path="/welcome" component={Commun.Welcome} layout={LayoutAuth} />
      <Router routeName="activate-step" path="/activate-account/:token?" component={Commun.Welcome} svg="/media/svg/illustrations/people.svg" showLogo={true} layout={LayoutAuth} />
      {/* User Routing Defined by Country */}
      {getDedicatedRoutes(user)}
      {/* Error Routes */}
      <Router path="/404" exact component={Commun.ErrorPage} layout={LayoutEmpty} />
      <Redirect to="/404" />
    </Switch>
  );
}

const mapStateToProps = ({userreducer}) => {
  return {...userreducer};
}

export default connect(mapStateToProps)(Routes);


const getDedicatedRoutes = (user) => {
  if (user) {
    switch (user.country) {
      case 'Morocco':
        return <Ma />;
      case 'Egypt':
        return <Eg />;
      default:
        break;
    }
  }
  
}
