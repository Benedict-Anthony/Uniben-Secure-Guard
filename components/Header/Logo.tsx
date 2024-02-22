import React from "react";
import logo from "@/assets/images/logo.png";
import Link from "next/link";
import Image from "next/image";
const Logo = () => {
  return (
    <div className="navbar-center">
      <Link href={"/"} className="btn btn-ghost text-xl w-[5rem] ">
        <Image
          src={logo}
          width={20}
          height={20}
          alt="logo"
          className="w-full"
        />
      </Link>
    </div>
  );
};

export default Logo;
