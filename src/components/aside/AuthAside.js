import React from "react";
import { Link } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "helpers";

export function AuthAside({ bgColor = "#131313", showLogo = true, svgLink }) {
  //console.log(bgColor, showLogo, svgLink);
  const showLogoLogic = () => {
    if (showLogo === false) {
      return "d-sm-none d-md-block opacity-1";
    }
    return "";
  };
  return (
    <>
      {/* begin::Aside */}
      <div className="login-aside d-flex flex-column flex-row-auto" style={{ background: bgColor }}>
        {/*begin::Aside Top*/}
        <div className={`d-flex flex-column-auto flex-column py-lg-20 py-10`}>
          {/*begin::Aside header*/}
          {/* <Link to="/" className="text-center mb-10"> */}
            {/* <img alt="Auth Chronos Logo" className={`max-h-100px ${showLogoLogic()}`} src={toAbsoluteUrl("/media/logos/chronos-logo-white.png")} /> */}
            {/* <div className={`authLogo max-h-100px ${showLogoLogic()}`}>
              <SVG src={toAbsoluteUrl("/media/logos/chronos-logo-white.svg")} />
            </div> */}
            {/* <SVG className={`h-85px max-h-100px ${showLogoLogic()}`} src={toAbsoluteUrl("/media/logos/chronos-logo-white.svg")} />
          </Link> */}
          {/*end::Aside header*/}
        </div>
        {/*end::Aside Top*/}
        {/*begin::Aside Bottom*/}
        <div
          className="aside-img d-flex flex-row-fluid bgi-no-repeat bgi-position-y-top bgi-position-x-center"
          style={{
            backgroundImage: `url('${toAbsoluteUrl(svgLink)}')`,
          }}
        />
        {/*end::Aside Bottom*/}
      </div>
      {/* end::Aside */}
    </>
  );
}
