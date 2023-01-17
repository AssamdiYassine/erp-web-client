import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import SVG from "react-inlinesvg";

import { toAbsoluteUrl } from "helpers";
import { pushUserData } from 'redux/actions';

import { activateUserByToken, goToSiretStepFunc } from 'configs/fr'

function Welcome(props) {
  const { t, pushUserData, history } = props;
  const [loading, setLoading] = useState(props.match.params.token ? true : false);
  const [token, setToken] = useState(props.match.params.token);

  useEffect(() => {
    if (token) {
      activateUser(token); 
    } 
  });

  const activateUser = async (token) => {
    if (token) {
      let res = await activateUserByToken(token);
      setLoading(false);
      setToken(null);
      localStorage.setItem('TOKEN', res.data.token)
      localStorage.setItem('COUNTRY', res.data.user.country)
      pushUserData({user: res.data.user, token: res.data.token, country: res.data.user.country});
    }
  }
  
  const goToSiretStep = async () => {
    let res = await goToSiretStepFunc(props.token);
    localStorage.setItem('TOKEN', res.data.token)
    localStorage.setItem('COUNTRY', res.data.user.country)
    pushUserData({user: res.data.user, token: res.data.token, country: res.data.user.country});
    history.push('/account-setup/siret');
  }



  if (loading || !props.user) {
    return (
      <>
        {/*begin::Title*/}
        <div className="pb-13 pt-lg-0 pt-5">
          <h3 className="font-weight-bolder text-dark font-size-h4 font-size-h1-lg pb-8">
            {t("check_email:WELCOME_TITLE")}
          </h3>
          <span className="text-muted font-weight-bold font-size-h4">
            {t("check_email:WELCOME_HOME_DESC1")}
            <br />
            {t("check_email:WELCOME_HOME_DESC2")}
            <br />
            {t("check_email:WELCOME_HOME_DESC3")}
            <br />
          </span>
        </div>
        <div className="m-auto">
          {/*begin::Loading*/}
          <svg className="splash-spinner ml-0" viewBox="0 0 50 50">
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
      </>
    )
  }

  const { active, email, fullname } = props.user

  if (active) {
    return (
      <>
        {/*begin::Title*/}
        <div className="pb-13 pt-lg-0 pt-5">
          <h3 className="font-weight-bolder text-dark font-size-h4 font-size-h1-lg pb-8">
            {t("check_email:WELCOME_TITLE")}
          </h3>
          <span className="text-muted font-weight-bold font-size-h4">
            {t("check_email:WELCOME_HOME_DESC1")}
            <br />
            {t("check_email:WELCOME_HOME_DESC2")}
            <br />
            {t("check_email:WELCOME_HOME_DESC3")}
            <br />
          </span>
        </div>
        {/*begin::Title*/}
        <Link to="#" onClick={goToSiretStep}>
          <button
            type="submit"
            className="btn btn-primary font-weight-bolder font-size-h6 px-8 py-4 my-3 mr-4"
          >
            <span>
              {t("check_email:BTN_LETS_GO")}
            </span>
          </button>
        </Link>
      </>
    );
  }

  return (
    <div className="login-form login-signin" id="kt_login_signin_form">
      {/*begin::Title*/}
      <div className="pb-13 pt-lg-0 pt-5">
        <h3 className="font-weight-bolder text-dark font-size-h4 font-size-h1-lg">
          {t("check_email:CONFIRME_EMAIL")}
        </h3>
        <span className="text-muted font-weight-bold font-size-h4">
          {t("check_email:CONGRATS_USER", { name: fullname.split(' ').length > 1 ? fullname.split(' ')[0] : fullname })}
        </span>
      </div>
      {/*begin::Title*/}
      {/*begin::Icon*/}
      <div className="pb-5 pt-lg-0 pt-3">
        <span className="svg-icon svg-icon-primary svg-icon-5x">
          <SVG
            src={toAbsoluteUrl(
              "/media/svg/icons/Communication/Readed-mail.svg"
            )}
          />
        </span>
      </div>
      {/*begin::Icon*/}
      <div className="mb-10 mb-lg-20">
        <h3>
          {t("check_email:WE_SENT_YOU_EMAIL", { email })}
        </h3>
        <p className="text-muted font-weight-bold">
          {t("check_email:CHECK_SPAM")}
        </p>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { userreducer } = state;
  return {
    user: userreducer.user,
    token: userreducer.token,
  };
};

export default withRouter(withTranslation()(connect(mapStateToProps, { pushUserData })(Welcome)));
