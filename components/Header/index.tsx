import React, { Fragment } from "react";
import Logo from "./Logo";
import NavBar from "./NavBar";
import Notification from "./Notification";
import Marquee from "./Marquee";

const Header = () => {
  return (
    <Fragment>
      <header className="navbar bg-base-100 shadow-lg">
        <NavBar />
        <Logo />
        <Notification />
      </header>
      {/* <Marquee /> */}
    </Fragment>
  );
};

export default Header;
