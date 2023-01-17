import React from "react";
import { injectIntl } from "react-intl";
import $ from 'jquery';
// import SVG from "react-inlinesvg";
// import { toAbsoluteUrl } from "helpers";
// import { BreadCrumbs } from "./BreadCrumbs";

// const items = [
//   {
//     title: "page 1",
//     pathname: "pathTo Page 1",
//   },
// ];

// export function SubHeader({ intl, headerTitle }) {
function SubHeader({ intl, headerTitle }) {

  const showSideBar = () => {
    $('#kt_profile_aside').addClass('offcanvas-mobile-on');
    $('#kt_profile_aside').after('<div class="offcanvas-mobile-overlay"></div>');
  };

  return (
    <div id="kt_subheader" className="subheader py-3 py-lg-8">
      <div className="container d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
        {/* Info */}
        <div className="d-flex align-items-center flex-wrap mr-1">
          {/* begin::Mobile Toggle */}
          <button onClick={showSideBar} className="burger-icon burger-icon-left mr-4 d-inline-block d-lg-none">
            <span />
          </button>
          {/* end::Mobile Toggle */}
          {/* begin::Heading */}
          <div className="d-flex align-items-baseline mr-5">
            {/* begin::Title */}
            <h2 className="subheader-title text-dark font-weight-bold my-2 mr-3">
              {/* {headerTitle} */}
              {intl.formatMessage({
                id: headerTitle,
              })}
            </h2>
            {/* end::Title */}

            {/* <BreadCrumbs items={items} /> */}
          </div>
          {/* end::Heading */}
        </div>
        {/* Info */}

        {/* Toolbar Right */}
        {/* <div className="d-flex align-items-center">
          <button
            type="button"
            className="btn btn-primary btn-fixed-height font-weight-bold px-2 px-lg-5 mr-2"
          >
            <span className="svg-icon svg-icon-success svg-icon-lg">
              <SVG
                src={toAbsoluteUrl(
                  "/media/svg/icons/Communication/Add-user.svg"
                )}
              />
            </span>
            {` `}New Member
          </button>
          
          <button
            className="btn btn-success btn-icon font-weight-bold"
            data-toggle="modal"
            data-target="#kt_chat_modal"
          >
            <span className="svg-icon svg-icon-lg">
              <SVG
                src={toAbsoluteUrl(
                  "/media/svg/icons/Communication/Group-chat.svg"
                )}
              />
            </span>
          </button>
        </div> */}
      </div>
    </div>
  );
}
export default injectIntl(SubHeader);
