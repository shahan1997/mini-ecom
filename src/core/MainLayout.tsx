import React, { useEffect } from "react";
import { MainLayoutProps } from "./layout.interface";
import { useAppDispatch } from "../store/hooks";
import { setEnableAuth } from "../page/SignUp/components/AuthSlice";

/**
 * Main layout which will load the content with the children
 * @param children - Component
 */
const MainLayout = ({ children }: MainLayoutProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const isAuthorized = localStorage.getItem("isAuthorized") === "true"; // Or check for token
    console.log("User authorized at starts :", isAuthorized);
    if (isAuthorized) {
      dispatch(setEnableAuth()); // Dispatch to set authorized state
    } else {
      // Handle unauthorized state if needed (e.g., redirect to login or show an unauthorized page)
      console.log("User is not authorized");
    }
  }, [dispatch]);
  return (
    <>
      {children}
      {/* {!data && <>{children}</>}
      {!data && <UnAuthorised data-testid="unautorised-fallback" />} */}
    </>
  );
};

export default React.memo(MainLayout);
