import React from "react";

import { Box, Typography } from "@mui/material";
import withAppProviders from "./withAppProviders";
import AppRoutes from "./layouts/AppRoutes";
import { BrowserRouter } from "react-router-dom";
import LoginProvider from "./page/SignUp/components/LoginProvider";
import MainLayout from "./core/MainLayout";

const App = () => {
  return (
    <Box data-testid="pos-ui-app">
      <MainLayout>
        <BrowserRouter>
          <LoginProvider>
            <Box>
              <AppRoutes />
            </Box>
          </LoginProvider>
        </BrowserRouter>
      </MainLayout>
    </Box>
  );
};

export default withAppProviders(App)();
