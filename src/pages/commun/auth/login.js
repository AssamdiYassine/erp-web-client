import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SVG from "react-inlinesvg";
import { withTranslation } from 'react-i18next';
import { GoogleLogin } from 'react-google-login';

import { toAbsoluteUrl } from "helpers";
import { pushUserData } from 'redux/actions';
import { LoginFunc, CheckFunc, GoogleSigninFunc } from 'configs/commun' 

const Login = ({ pushUserData, history, t }) => {
  const [loading, setLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPSW] = useState('');
  const [remember_me, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [select, setSelect] = useState("TPE");

  const CheckUser = async (user_email) => {
    try {
      // Check User if exist
      const check = await CheckFunc(user_email);
      return check.data
    } catch (error) {
      setLoading(false);
      setBtnDisabled(false);
    }
  }

  const loginHandle = async () => {
    try {
      // Verify if email text is empty
      if (email.length === 0) {
        setErrors({ ...errors, email: 'empty' });
        return;
      }

      // Verify if email text is invalid
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      // const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(email)) {
        setErrors({ ...errors, email: 'invalid' });
        return;
      }

      // Verify if password text is empty
      if (password.length === 0) {
        setErrors({ ...errors, password: 'empty' });
        return;
      }

      setLoading(true);
      setBtnDisabled(true);

      // Check user
      const check = await CheckUser(email);
      if (check.error) {
        setErrors({ ...errors, email: 'not_exist' });
        setLoading(false);
        setBtnDisabled(false);
        return;
      }

      // Do Login
      const res = await LoginFunc({ email, password });
      const { error, user, token } = res.data;

      // if Error
      if (error) {
        setErrors({ ...errors, email: 'missmatch' });
        setLoading(false);
        setBtnDisabled(false);
        return;
      }

      // Did Logged
      if (remember_me) {
        localStorage.setItem('REMEMBER_ME', true)
      }
      localStorage.setItem('TOKEN', token)
      localStorage.setItem('COUNTRY', user.country)
      console.log(user);
      pushUserData({ user, token, country: user.country });
      if (user) {
        if (user.signupStage === 10) {
          history.push('/welcome');
          return;
        } else if (user.signupStage === 20) {
          history.push('/account-setup/siret');
          return;
        } else if (user.signupStage === 30) {
          history.push('/account-setup/bank');
          return;
        } else {
          history.push('/dashboard');
          return;
        }
      }
      history.push('/')
      history.push('/dashboard');
    } catch (error) {
      setLoading(false);
      setBtnDisabled(false);

    }
  }

  const responseGoogle = async (response) => {
    try {
      // Check user
      const check = await CheckUser(response.profileObj.email);
      console.log(check)
      if (check && check.error) {
        setErrors({ ...errors, email: 'not_exist' });
        setLoading(false);
        setBtnDisabled(false);
        return;
      }

      // Do Login
      let res = await GoogleSigninFunc(response.accessToken);
      const { error, user, token } = res.data;

      // if Error
      if (error) {
        setErrors({ ...errors, email: 'missmatch' });
        setLoading(false);
        setBtnDisabled(false);
        return;
      }

      // Did Logged
      pushUserData({ user, token });
      history.push('/dashboard');
    } catch (error) {
      console.log(error)
    }

  }

  return (

    <div className="login-form login-signin" id="kt_login_signin_form">
      {/*begin::Title*/}
      <div className="pb-13 pt-lg-0 pt-5">
        <h3 className="font-weight-bolder text-dark font-size-h2 font-size-h1-lg m-0">{t("login:welcome_to_chronos")}</h3>
        
      </div>
      {/*begin::Title*/}

      {/*begin::login */}
      <>
      <span className="text-muted font-weight-bold font-size-h4 ">
        {t("login:you_are_not_registered")} ?
        <Link to="/auth/sign-up" id="kt_login_signup" className="text-primary font-weight-bolder ml-3">{t("login:create_an_account")}</Link>
      </span>
      <div className="form-group fv-plugins-icon-container mt-5">
        <label className="font-size-h6 font-weight-bolder text-dark">{t("login:email")} {t("login:or")} {t("login:phone")}</label>
        <input
          placeholder={t("login:email") + " " + t("login:or") + " " + t("login:phone")}
          type="email"
          name="email"
          onChange={(e) => { setEmail(e.target.value); setErrors({ ...errors, email: false }) }}
          className={`form-control form-control-solid h-auto py-5 px-6 ${errors.email && "is-invalid"}`}
        />
        {errors.email === 'empty' ?
          <div className="my-1 pl-5 alert-text font-weight-medium">{t('login:error_email_obligatoire')}</div>
          : errors.email === 'invalid' ?
            <div className="my-1 pl-5 alert-text font-weight-medium">{t('login:error_email_invalid')}</div>
            : errors.email === 'not_exist' ?
              <div className="my-1 pl-5 alert-text font-weight-medium">{t('login:error_email_not_exist')}</div>
              : errors.email === 'missmatch' &&
              <div className="my-1 pl-5 alert-text font-weight-medium">{t('login:error_credentials_invalid')}</div>
        }
      </div>
      <div className="form-group fv-plugins-icon-container">
        <div className="d-flex justify-content-between mt-n5">
          <label className="font-size-h6 font-weight-bolder text-dark pt-5">{t("login:password")}</label>
          <Link to="/auth/forgot-password" className="text-secondary font-size-h6 font-weight-bolder text-hover-primary pt-5" id="kt_login_forgot">
            {t("login:forgot_your_password")} ?
          </Link>
        </div>
        <input
          placeholder={t("login:password")}
          type="password"
          className={`form-control form-control-solid h-auto py-5 px-6 ${errors.password && "is-invalid"}`}
          name="password"
          onChange={(e) => { setPSW(e.target.value); setErrors({ ...errors, password: false }) }}
        />
        {errors.password === 'empty' ?
          <div className="my-1 pl-5 alert-text font-weight-medium">{t('login:error_password_obligatoire')}</div>
          : errors.password === 'invalid' &&
          <div className="my-1 pl-5 alert-text font-weight-medium">{t('login:error_password_invalid')}</div>}
      </div>
      <div className="form-group">
        <label className="checkbox mb-0">
          <input type="checkbox" name="acceptTerms" checked={remember_me} onChange={() => { setRememberMe(!remember_me); }} />
          <span style={{ marginRight: 4 }} />
          {t("login:remember_me")}
        </label>
      </div>
      <div className="pb-lg-0 pb-5">
        <button onClick={loginHandle} disabled={btnDisabled} id="kt_login_signin_submit" type="submit" className={`btn btn-myColor font-weight-bolder font-size-h6 px-8 py-4 my-3 mr-3`}>
          <span>{t("login:log_in")}</span>
          {loading && <span className="ml-3 spinner spinner-white"></span>}
        </button>

      </div>
    </>
      {/*end::login*/}
    </div>
  )
}

export default withRouter(withTranslation()(connect(null, { pushUserData })(Login)));
