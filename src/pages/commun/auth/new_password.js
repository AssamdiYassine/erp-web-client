import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { withTranslation } from 'react-i18next';

// const initialValues = {
//   password: "",
//   changepassword: "",
// };

function NewPassword(props) {
  const  {t} = props
  const [isRequested, setIsRequested] = useState(false);
  const [loading, setLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);

  const getInputClasses = (fieldname) => {
    // if (formik.touched[fieldname] && formik.errors[fieldname]) {
    //   return "is-invalid";
    // }
    // if (formik.touched[fieldname] && !formik.errors[fieldname]) {
    //   return "is-valid";
    // }
    return "";
  };

  const newPasswordHandle = () => {
    setLoading(true);
    setBtnDisabled(true);
    setTimeout(() => {
      setIsRequested(true);
    }, 1000);
  };

  return (
    <>
      {isRequested && <Redirect to="/auth/sign-in" />}
      {!isRequested && (
        <div className="login-form login-forgot" style={{ display: "block" }}>
          {/*begin::Title*/}
          <div className="pb-13 pt-lg-0 pt-5">
            <h3 className="font-weight-bolder text-dark font-size-h2 font-size-h1-lg">{t("new_password:new_password")}</h3>
            <span className="text-muted font-weight-bold font-size-h4">{t("new_password:please_enter_your_new_password")}</span>
          </div>
          {/*begin::Title*/}
          {/* <form onSubmit={formik.handleSubmit} className="form fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp"> */}
            {/* {formik.status && (
              <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
                <div className="alert-text font-weight-bold">{formik.status}</div>
              </div>
            )} */}
            {/* begin: Password */}
            <div className="form-group fv-plugins-icon-container">
              <label className="font-size-h6 font-weight-bolder text-dark">{t("new_password:new_password")}</label>
              <input
                placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                type="password"
                className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses("password")}`}
                name="password"
                // {...formik.getFieldProps("password")}
              />
              {/* {formik.touched.password && formik.errors.password ? (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">{formik.errors.password}</div>
                </div>
              ) : null} */}
            </div>
            {/* end: Password */}

            {/* begin: Confirm Password */}
            <div className="form-group fv-plugins-icon-container">
              <label className="font-size-h6 font-weight-bolder text-dark">{t("new_password:confirm_the_new_password")}</label>
              <input
                placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                type="password"
                className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses("changepassword")}`}
                name="changepassword"
                // {...formik.getFieldProps("changepassword")}
              />
              {/* {formik.touched.changepassword && formik.errors.changepassword ? (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">{formik.errors.changepassword}</div>
                </div>
              ) : null} */}
            </div>
            {/* end: Confirm Password */}
            <div className="pb-lg-0 pb-5">
              <button onClick={newPasswordHandle} disabled={btnDisabled} type="submit" className="btn btn-primary font-weight-bolder font-size-h6 px-8 py-4 my-3 mr-4">
                <span>{t("new_password:confirm")}</span>
                {loading && <span className="ml-3 spinner spinner-white"></span>}
              </button>
            </div>
          {/* </form> */}
        </div>
      )}
    </>
  );
}


// export default NewPassword;
export default withTranslation()(NewPassword);
