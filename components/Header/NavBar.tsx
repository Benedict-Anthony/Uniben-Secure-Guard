"use client";
import { auth } from "@/firebase";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { IoMdMenu } from "react-icons/io";
import { IoTrendingUp } from "react-icons/io5";
import { MdOutlineReport } from "react-icons/md";
import { MdOutlineHome } from "react-icons/md";
import { MdArticle } from "react-icons/md";
import { MdAdminPanelSettings } from "react-icons/md";

const NavBar = () => {
  const [user] = useAuthState(auth);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);
  return (
    <div className="drawer relative z-10 w-[60%] md:w-[40%]">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
          <IoMdMenu />
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul
          className="menu w-[60%] md:w-[40%] h-full bg-base-200 text-base-content"
          suppressHydrationWarning
        >
          <li>
            <Link href={"/"}>
              <MdOutlineHome color="green" size={25} />
              Home
            </Link>
          </li>
          <li>
            <Link href={"/category"}>
              <MdOutlineReport color="red" size={25} />
              Make a reports
            </Link>
          </li>
          <li className="">
            <Link href={"/trends"}>
              <IoTrendingUp color="blue" size={25} />
              Trends
            </Link>
          </li>

          {currentUser && (
            <Fragment>
              <li className="" suppressHydrationWarning>
                <Link href={"/admin"}>
                  <MdAdminPanelSettings color="green" size={25} />
                  Admin
                </Link>
              </li>
              <li className="" suppressHydrationWarning>
                <Link href={"/admin/article"}>
                  <MdArticle color="blue" size={25} />
                  New Article
                </Link>
              </li>
            </Fragment>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
