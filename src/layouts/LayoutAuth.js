import React, { Component } from "react";
import "assets/sass/pages/login/login-1.scss";
import SVG from "react-inlinesvg";
import "assets/sass/pages/login/login-4.scss";
import { toAbsoluteUrl } from "helpers";
import { AuthAside } from "components/aside/AuthAside";
import { default as AnimateLoading } from "components/controls/AnimateLoading";

class LayoutAuth extends Component {

  constructor (props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    this.setState({loading: false});
  }

  render() {
    const { loading } = this.state;

    if (loading) {
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

    const { children, svg, showLogo, routeName } = this.props;
    return (
      <>
        <div className="d-flex flex-column flex-root">
        <AnimateLoading />
  
          {/*begin::Login*/}
          <div className="login login-1 login-signin-on d-flex flex-column flex-lg-row flex-column-fluid bg-white" id="kt_login">
            {/*begin::Aside in the left*/}
            {routeName !== "activate-step" ?
              <AuthAside svgLink="/media/svg/illustrations/login-visual-1.svg" />
            : <></>}
            {/*begin::Aside in the left*/}
            {/*begin::Content*/}
            <div className="login-contenty d-flex flex-column justify-content-center position-relative overflow-hidden p-7 mx-auto">
              {/*begin::Content body*/}
              <div className="d-flex flex-column">{children}</div>
              {/*end::Content body*/}
            </div>
            {/*end::Content*/}
            {/* begin::Aside */}
            {routeName === "activate-step" ?
            <div className="login-aside order-1 order-lg-2 d-flex flex-column">
              {/*begin::Aside Top*/}
              {showLogo && (
                <div className="d-none d-lg-block d-xl-block">
                  <div className="d-flex flex-column-auto flex-column py-lg-20 py-10">
                    {/*begin::Aside Logo*/}
                    {/* <div className="text-center mb-10"> */}
                    <div className="text-center">
                      {/* <img alt="Auth" className={`max-h-100px`} src={toAbsoluteUrl("/media/logos/chronos-logo-black.png")} /> */}
                      <SVG className="max-h-100px h-85px" src={toAbsoluteUrl("/media/logos/chronos-logo-black.svg")} />
                    </div>
                  </div>
                </div>
              )}
              {/*end::Aside Top*/}
              {/*begin::Aside Bottom*/}
              <div
                className={`aside-img d-flex flex-row-fluid bgi-no-repeat ${svg.indexOf("people.svg") >= 0 ? "bgi-position-y-top" : "bgi-position-y-center"} bgi-position-y-top bgi-position-x-center`}
                style={{
                  backgroundImage: `url('${toAbsoluteUrl(svg)}')`,
                }}
              />
              {/*end::Aside Bottom*/}
            </div>
            :<></>}
            {/* end::Aside */}
          </div>
          {/*end::Login*/}
        </div>
      </>
    );
  }
}

export default LayoutAuth;
