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
import RegisterCpu from "./register-cpu";
import RegisterTpe from "./register-tpe";
import RegisterAe from "./register-ae";

function Register(props) {
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
  const [select, setSelect] = useState("TPE");

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
    <div className="login-form login-signin" style={{ display: "block" }}>
      {/*begin::Title*/}
      <div className="pb-5 pt-lg-0 pt-5">
        <h3 className="font-weight-bolder text-dark font-size-h2 font-size-h1-lg">
        {t("register:sign_up")}
        </h3>
        <div class="d-flex justify-content-around border-bottom mt-5">
          {/* <div className={`w-100 text-center ${select === "CPU" && "border-bottom border-3 border-bottom-myColor text-myColor"}`} onClick={() => setSelect("CPU")} style={{ cursor: "pointer" }}>
            <h5 className="font-weight-bolder text-orange font-size-h1-lg">CPU</h5>
          </div> */}
          {/* <div className={`w-100 text-center ${select === "TPE" && "border-bottom border-3 border-bottom-myColor text-myColor"}`} onClick={() => setSelect("TPE")} style={{ cursor: "pointer" }}>
            <h5 className="font-weight-bolder text-orange font-size-h1-lg">TPE</h5>
          </div> */}
          {/* <div className={`w-100 text-center ${select === "AE" && "border-bottom border-3 border-bottom-myColor text-myColor"}`} onClick={() => setSelect("AE")} style={{ cursor: "pointer" }}>
            <h5 className="font-weight-bolder text-orange font-size-h1-lg">AE</h5>
          </div> */}
        </div>
      </div>
    {select=="CPU" && <RegisterCpu />}
    {select=="TPE" && <RegisterTpe />}
    {select=="AE" && <RegisterAe />}
    </div>
  );
}

export default withRouter(withTranslation()(connect(null, {pushUserData})(Register)));
