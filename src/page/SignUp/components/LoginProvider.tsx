import React, { useMemo } from "react";

import { selectEnableAuth } from "./AuthSelector";
import { useSelector } from "react-redux";
import SignIn from "../../SignIn";
import { MainLayoutProps } from "../../../core/layout.interface";
import { useLocation } from "react-router-dom";
import SignUp from "..";

const LoginProvider = ({ children }: MainLayoutProps) => {
  const authEnable = useSelector(selectEnableAuth);
  const location = useLocation();
  console.log("authEnable at LoginProviderauthEnable :", authEnable);
  const renderComponent = useMemo(() => {
    if (authEnable) {
      return children;
    }

    if (location.pathname === "/signup") {
      return <SignUp />;
    }

    return <SignIn />;
  }, [authEnable, children, location.pathname]);

  return <>{renderComponent}</>;
};

export default React.memo(LoginProvider);
