import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SVG from "react-inlinesvg";
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import {pushUserData} from 'redux/actions';
import {NotificationManager} from 'react-notifications'

import { CountriesFunc, RegisterFunc, CreateFunc, GoogleSignupFunc, CheckFunc } from 'configs/commun'

import { toAbsoluteUrl } from "helpers";

function RegisterTpe(props) {
  const  {t, history, pushUserData} = props
  const [loading, setLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [listCountries, setListCountries] = useState([]);
  const [loadCountries, setLoadCountries] = useState(true);
  const [terms, setTerms] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [errors, setErrors] = useState({});
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');

  useEffect(() => {
    //Call Countries List
    FuncCountries();
  }, [])

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

  //Get Countries List
  const FuncCountries = async () => {
    const res = await CountriesFunc();
    if(res.error) {
      console.log(res.error)
    } else {
      setListCountries(res.data.countries);
      setLoadCountries(false);
    }
  }

  const registerHandle = async () => {
    try {

      // Select Country first
      if(!selectedCountry) {
        setErrors({ ...errors, error_country: t('register:error_country') });
        return;
      }

      // Verify if email text is empty
      if (fullname.trim().length < 3) {
        setErrors({ ...errors, fullname: t('register:error_fullname') });
        return;
      }
      
      // Verify if email text is empty
      if (email.length === 0) {
        setErrors({ ...errors, email: t('register:error_email_obligatoire') });
        return;
      }
      
      // Verify if email text is invalid
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      // const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(email)) {
        setErrors({ ...errors, email: t('register:error_email_invalid') });
        return;
      }

      // Password is empty or not respect pattern
      const pw = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      if (!pw.test(password)) {
        setErrors({ ...errors, password: t('register:error_password_obligatoire') });
        return;
      }

      // Password missmatch
      if (confirm_password !== password) {
        setErrors({ ...errors, confirm_password: t('register:error_password_missmatch') });
        return;
      }

      // Terms not checked
      if(!terms) {
        setErrors({ ...errors, terms_error: t('register:error_terms')})
        return;
      }
      // Check user
      const check = await CheckUser(email);
      if(check.user != null) {
        setErrors({ ...errors, email: t('register:error_email_exists') });
        setLoading(false);
        setBtnDisabled(false);
        return;
      }

    // Creating Account
      setLoading(true);
      setBtnDisabled(true);
      await CreateFunc(email, selectedCountry._id);
      const res = await RegisterFunc(fullname, email, password, selectedCountry.name);
      const { user, token, error } = res.data;

      //Handle Response
      if (error) {
        NotificationManager.warning('', 'Oops une erreur s\'est produite merci de réssayer', 10000);
      } else {
        localStorage.setItem('TOKEN', token)
        localStorage.setItem('COUNTRY', user.country)
        pushUserData({user, token, country: user.country});
        history.push('/welcome');
        NotificationManager.success('', 'Vous avez créer votre compte! Bienvenue!', 10000);
      }
    } catch (error) {
      console.log(error)
    }
  };

 
  const getInputClasses = (fieldname) => {
    // if (errors[fieldname]) {
    //   return "is-invalid";
    // }
    // if (!errors[fieldname]) {
    //   return "is-valid";
    // }
    return "";
  };

  return (
    <>
    <p className="text-primary font-weight-bold font-size-h4 m-0">
    {t("register:choose_your_country")} !
    </p>
    {/*begin::Country*/}
    <ul className="nav nav-pills nav-primary row row-paddingless m-0 mb-3 pt-5" role="tablist">
      {/*begin::Items*/}
      {loadCountries && <div className="d-flex align-items-center justify-content-center p-10 col"><span className="ml-3 spinner spinner-black"></span></div>}
      {listCountries.map((country) => (
        <li key={country._id} onClick={() => { setSelectedCountry(country); setErrors({ ...errors, error_country: false }) }} className="nav-item d-flex col-sm flex-grow-1 flex-shrink-0 mr-3 mb-3 mb-lg-0">
          <div
            className={`nav-link border d-flex flex-grow-1 rounded flex-column align-items-center ${
              selectedCountry !== null && country._id === selectedCountry._id ? " active" : ""
            }`}
          >
            <span className="nav-icon py-2 w-auto">
              <img className="w-35px h-35px w-lg-40px h-lg-40px rounded-circle" src={`/media/svg/flags/${country.img}`} alt={country.name} />
            </span>
          </div>
        </li>
      ))}
      {/*end::Items*/}
    </ul>
    {errors.error_country && <div className="my-1 pl-5 alert-text font-weight-medium">{errors.error_country}</div>}
    {/*end::Country*/}

  {/*end::Title*/}

  <div className="form-group fv-plugins-icon-container">
      <input
        placeholder={`${t("register:full_name")}`}
        type="text"
        name="fullname"
        className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses("fullname")}`}
        onChange={(e) => { setFullname(e.target.value); setErrors({ ...errors, fullname: false }) }}
      />
      {errors.fullname && <div className="my-1 pl-5 alert-text font-weight-medium">{errors.fullname}</div>}
    </div>
    {/* end: Fullname */}

    {/* begin: Email */}
    <div className="form-group fv-plugins-icon-container">
      <input
        placeholder={`${t("register:email")}`}
        type="email"
        name="email"
        className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses("email")}`}
        onChange={(e) => { setEmail(e.target.value); setErrors({ ...errors, email: false }) }}
      />
      {errors.email && <div className="my-1 pl-5 alert-text font-weight-medium">{errors.email}</div>}
    </div>
    {/* end: Email */}

        {/* begin: phone */}
        <div className="form-group fv-plugins-icon-container">
      <input
        placeholder={`${t("login:phone")}`}
        type="text"
        name="phone"
        className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses("phone")}`}
        onChange={(e) => { setPhone(e.target.value); setErrors({ ...errors, phone: false }) }}
      />
      {errors.phone && <div className="my-1 pl-5 alert-text font-weight-medium">{errors.phone}</div>}
    </div>
    {/* end: phone */}

    {/* begin: Password */}
    <div className="form-group fv-plugins-icon-container">
      <input
        placeholder={`${t("register:password")}`}
        type="password"
        name="password"
        className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses("password")}`}
        onChange={(e) => { setPassword(e.target.value); setErrors({ ...errors, password: false }) }}
      />
      {errors.password && <div className="my-1 pl-5 alert-text font-weight-medium">{errors.password}</div>}
    </div>
    {/* end: Password */}

    {/* begin: Confirm Password */}
    <div className="form-group fv-plugins-icon-container">
      <input
        placeholder={`${t("register:confirm_the_password")}`}
        type="password"
        name="confirm_password"
        className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses("changepassword")}`}
        onChange={(e) => { setConfirmPassword(e.target.value); setErrors({ ...errors, confirm_password: false }) }}
      />
      {errors.confirm_password && <div className="my-1 pl-5 alert-text font-weight-medium">{errors.confirm_password}</div>}
    </div>
    {/* end: Confirm Password */}

    {/* begin: Terms and Conditions */}
    <div className="form-group">
      <label className="checkbox mb-0">
        <input type="checkbox" name="acceptTerms" checked={terms} onChange={ () => { setTerms(!terms); setErrors({ ...errors, terms_error: false}) }}/>
        <span style={{ marginRight: 4 }} />
        {t("register:i_accept_the")}{" "}
        <Link to="/terms" target="_blank" rel="noopener noreferrer" style={{ marginLeft: 4 }}>{t("register:terms_and_conditions")}</Link>
        .
      </label>
      {errors.terms_error && <div className="my-1 pl-5 alert-text font-weight-medium">{errors.terms_error}</div>}
    </div>
    {/* end: Terms and Conditions */}
    
    {/* begin: Submit */}
    <div className="form-group d-flex flex-wrap pb-lg-0 pb-3">
      <button onClick={registerHandle} disabled={btnDisabled} type="submit" className="btn btn-myColor font-weight-bolder font-size-h6 px-8 py-4 my-3 mr-4">
        <span>{t("register:submit")}</span>
        {loading && <span className="ml-3 spinner spinner-white"></span>}
      </button>

      <Link to="/auth/sign-in">
        <button type="button" className="btn btn-light font-weight-bolder font-size-h6 px-8 py-4 my-3">{t("register:cancel")}</button>
      </Link>
    </div>
    {/* end: Submit */}
    </>
  );
}

export default withRouter(withTranslation()(connect(null, {pushUserData})(RegisterTpe)));
