/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "helpers";
import { Brand } from "components/brand/Brand";

export function Aside(props) {
  const { t } = props;
  return (
    <>
      {/* begin::Aside */}
      <div id="kt_aside" className="aside aside-left d-flex aside-fixed">
        {/* begin::Primary */}
        <div className="aside-primary d-flex flex-column align-items-center flex-row-auto bg-white">
          <Brand />
          {/* begin::Nav Wrapper */}
          {/* Remove " flex-column-fluid "::To solve aside footer bottom padding */}
          <div className="aside-nav d-flex flex-column align-items-center py-5 scroll scroll-pull">
            {/* begin::Nav */}
            <ul className="list-unstyled flex-column" role="tablist">
              {/* begin::Item */}
              <MyNavLink 
                svg="/media/svg/icons/Layout/Layout-4-blocks.svg"
                txt={t('global_aside:dashboard')}
                link="/dashboard"
              />
              <div className="aside-separator" />
              <MyNavLink 
                svg="/media/svg/icons/Home/Building.svg"
                txt={t('global_aside:administration')}
                link="/administration"
              />
              <MyNavLink 
                svg="/media/svg/icons/Shopping/Dollar.svg"
                txt={t('global_aside:finance')}
                link="/finance"
              />
              <MyNavLink 
                svg="/media/svg/icons/Files/User-folder.svg"
                txt={t('global_aside:social')}
                link="/social"
              />
              <MyNavLink 
                svg="/media/svg/icons/Files/File.svg"
                txt={t('global_aside:production')}
                link="/production"
              />
              <MyNavLink 
                svg="/media/svg/icons/Home/Library.svg"
                txt={t('global_aside:knowledge')}
                link="/knowledge"
              />
              <MyNavLink 
                svg="/media/svg/icons/Home/Chair2.svg"
                txt={t('global_aside:facilities')}
                link="/facilities"
              />
              {/* end::Item */}
            </ul>
            {/* end::Nav */}
          </div>
          {/* end::Nav Wrapper */}
        </div>
        {/* end::Primary */}
      </div>
      {/* end::Aside */}
    </>
  );
}

function MyNavLink({ link, svg, txt }) {
  return (
    <li
      className="nav-item mb-3"
      data-toggle="tooltip"
      data-placement="rigth"
      data-container="body"
      data-boundary="window"
      title="Latest Project"
    >
      <OverlayTrigger placement="right" overlay={ <Tooltip id="latest-project">{txt}</Tooltip> } >
        <NavLink
          to={`${link}`}
          activeClassName="active"
          className="nav-link btn btn-icon btn-clean btn-lg"
        >
          <span className="svg-icon svg-icon-lg">
            <SVG
              src={toAbsoluteUrl(svg)}
            />
          </span>
        </NavLink>
      </OverlayTrigger>
    </li>
  );
}
