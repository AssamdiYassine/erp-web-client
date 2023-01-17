import { AutorizedFunc } from 'configs/commun';
import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {pushUserData} from '../redux/actions';

const Loading = ({pushUserData, user, token, country, history, location}) => {

  /*useEffect(() => {
    window.addEventListener("beforeunload", () => {
      if (!localStorage.getItem('REMEMBER_ME')) {
        localStorage.removeItem('TOKEN')
        localStorage.removeItem('COUNTRY')
      }
    });

    if (!token) {
      pushUserData({user: null, token: null, loading: false});
      if (location.pathname.indexOf("activate-account") === -1) {
        history.push('/auth');
      }
      return
    }

    // Check Token Func
    const checkToken = async (token) => {
      try {
        const res = await AutorizedFunc(token);
        const { error } = res.data;
        // if Error
        if (error) {
          pushUserData({user: null, token: null, loading: false});
          history.push('/auth')
          return
        }

        // Did Logged
        localStorage.setItem('TOKEN', res.data.token)
        localStorage.setItem('COUNTRY', res.data.user.country)
        pushUserData({user: res.data.user, token: res.data.token, country: res.data.user.country, loading: false});
        if (res.data.user) {
          if (res.data.user.signupStage === 10) {
            if (location.pathname.indexOf("/welcome") === -1) {
              history.push('/welcome');
              return;
            } else if (location.pathname.indexOf("/activate-account") === -1) {
              history.push('/activate-account');
              return;
            }
          } else if (res.data.user.signupStage === 20) {
            if (location.pathname !== "/account-setup/siret") {
              history.push('/account-setup/siret');
              return;
            }
          } else if (res.data.user.signupStage === 30) {
            if (location.pathname !== "/account-setup/bank") {
              history.push('/account-setup/bank');
              return;
            }
          } else {
            // history.push('/');
            return;
          }
        } else {
          history.push('/')
        }
      } catch (error) {
          localStorage.removeItem('REMEMBER_ME')
          localStorage.removeItem('TOKEN')
          localStorage.removeItem('COUNTRY')
          pushUserData({user: null, token: null, loading: false});
          history.push('/')
      }
    }
    // Call Func
    checkToken(token)
  }, [pushUserData, user, token, history, country, location])*/

  useEffect(() => {
    pushUserData({user: {country: 'Morocco'}, token: null, loading: false});
    history.push('/dashboard')
  }, [])

  return (
    <div id="splash-screen" className="kt-splash-screen">
      <img src="/media/logos/logo-dark.png" alt="Chronos" />
      <svg className="splash-spinner" viewBox="0 0 50 50">
        <circle
          className="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="5"
        ></circle>
      </svg>
    </div>
  )
}

const mapStateToProps = ({userreducer}) => {
  return userreducer;
}

export default withRouter(connect(mapStateToProps, {pushUserData})(Loading));