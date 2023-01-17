import React, { useState } from "react";
import { Link } from "react-router-dom";
import SVG from "react-inlinesvg";
import { withTranslation } from 'react-i18next';

import { toAbsoluteUrl } from "helpers";

// const initialValues = {
//   email: "",
// };

function ForgotPassword(props) {
  const  {t} = props
  const [loading, setLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [isRequested, setIsRequested] = useState(false);

  const getInputClasses = (fieldname) => {
    // if (formik.touched[fieldname] && formik.errors[fieldname]) {
    //   return "is-invalid";
    // }
    // if (formik.touched[fieldname] && !formik.errors[fieldname]) {
    //   return "is-valid";
    // }
    return "";
  };

  const forgetPasswordHandle = () => {
    setLoading(true);
    setBtnDisabled(true);
    setTimeout(() => {
      setIsRequested(true);
    }, 1000);
  };


  return (
    <>
      {!isRequested && (
        <div className="login-form login-forgot" style={{ display: "block" }}>
          {/*begin::Title*/}
          <div className="pb-13 pt-lg-0 pt-5">
            <h3 className="font-weight-bolder text-dark font-size-h2 font-size-h1-lg">
              {t("forgot_password:forgot_your_password")} ?
            </h3>
            <span className="text-muted font-weight-bold font-size-h4">
              {t("forgot_password:please_enter_your_email_to_reset_your_password")}
            </span>
          </div>
          {/*begin::Title*/}
          {/* <form onSubmit={formik.handleSubmit} className="form fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp"> */}
            {/* {formik.status && (
              <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
                <div className="alert-text font-weight-bold">{formik.status}</div>
              </div>
            )} */}
            <div className="form-group fv-plugins-icon-container">
              <label className="font-size-h6 font-weight-bolder text-dark">{t("forgot_password:email")}</label>
              <input placeholder={`${t("forgot_password:email")}`} type="email" className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses("email")}`} name="email"
              // {...formik.getFieldProps("email")}
              />
              {/* {formik.touched.email && formik.errors.email ? (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">{formik.errors.email}</div>
                </div>
              ) : null} */}
            </div>
            <div className="pb-lg-0 pb-5">
              <button onClick={forgetPasswordHandle} disabled={btnDisabled} id="kt_login_forgot_submit" type="submit" className="btn btn-primary font-weight-bold px-9 py-4 my-3">
                <span>{t("forgot_password:send")}</span>
                {loading && <span className="ml-3 spinner spinner-white"></span>}
              </button>
              <Link to="/auth/sign-in">
                <button type="button" id="kt_login_forgot_cancel" className="btn btn-light font-weight-bold px-9 py-4 my-3 mx-4">{t("forgot_password:cancel")}</button>
              </Link>
            </div>
          {/* </form> */}
        </div>
      )}
      {isRequested && (
        <div className="login-form login-signin" id="kt_mail_info_form">
          {/*begin::Title*/}
          <div className="pb-13 pt-lg-0 pt-5">
            <h3 className="font-weight-bolder text-dark font-size-h4 font-size-h1-lg">{t("forgot_password:reset_your_password")}</h3>
            <span className="text-muted font-weight-bold font-size-h4">{t("forgot_password:check_your_email")}</span>
          </div>
          {/*begin::Title*/}
          {/*begin::Icon*/}
          <div className="pb-5 pt-lg-0 pt-3">
            <span className="svg-icon svg-icon-primary svg-icon-5x">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Communication/Readed-mail.svg")} />
            </span>
          </div>
          {/*begin::Icon*/}
          <div className="mb-10 mb-lg-20">
            <h3>{t("forgot_password:we_sent_you_email_messages_title", { user_name: 'txt@txt.com'})}!</h3>
            <p className="text-muted font-weight-bold">{t("forgot_password:we_sent_you_email_messages_subtitle")}</p>
          </div>
        </div>
      )}
    </>
  );
}

// export default ForgotPassword;
export default withTranslation()(ForgotPassword);
