import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Loader } from "../components/Loader";
import { useSelector } from "react-redux";
import { selectEnableAuth } from "../page/SignUp/components/AuthSelector";

const SignIn = React.lazy(() => import("../page/SignIn"));
const SignUp = React.lazy(() => import("../page/SignUp"));
const Dashboard = React.lazy(() => import("../page/Dashboard"));
const ShoppingCart = React.lazy(() => import("../page/ShoppingCard"));

/**
 * AppRoutes will load the app routes.
 * @returns
 */

const AppRoutes = () => {
  const authEnable = useSelector(selectEnableAuth);
  return (
    <Routes>
      {/* 
        The Product component is lazily loaded using Suspense.
        You can add other routes similarly if needed.
      */}
      {/* Default route - Redirect to /product */}
      <Route element={<Navigate replace to="/dashboard" />} path="" />
      {/* <Route path="/" element={<Navigate to="/signin" />} /> */}
      <Route
        path="/signin"
        element={
          <Suspense fallback={<Loader />}>
            <SignIn />
          </Suspense>
        }
      />
      <Route
        path="/signup"
        element={
          authEnable ? (
            <Navigate replace to="/dashboard" />
          ) : (
            <Suspense fallback={<Loader />}>
              <SignUp />
            </Suspense>
          )
        }
      />
      <Route
        path="/dashboard"
        element={
          <Suspense fallback={<Loader />}>
            <Dashboard />
          </Suspense>
        }
      />
      <Route
        path="/shoppingCart"
        element={
          <Suspense fallback={<Loader />}>
            <ShoppingCart />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
