import React, { useMemo } from "react";
import {
  Paper,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Grid from "@mui/material/Grid2";
import { appColors } from "../../../theme/appColors";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../store/hooks";
import { useNotifier } from "../../../core/Notifier";
import { useFormik } from "formik";
import { setEnableAuth } from "../../SignUp/components/AuthSlice";
import { theme } from "../../../theme";
import FieldHeader from "../../../components/FieldHeader";
import { useSelector } from "react-redux";
import { selectEnableAuth } from "../../SignUp/components/AuthSelector";

// interface RightContentProps {
//   handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
// }

const RightContent = () => {
  const navigate = useNavigate();
  const authEnable = useSelector(selectEnableAuth);
  console.log("authEnable store:", authEnable);
  const handleSignUpClick = () => {
    navigate("/signup");
  };

  const dispatch = useAppDispatch();
  const { showErrorMessage } = useNotifier();
  const { showMessage } = useNotifier();
  //Form validation

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      let existingUsers = [];
      try {
        if (!validateEmail(values.email || "")) {
          showErrorMessage("Please enter valid email ");
          return;
        }
        if (!validatePassword(values.password || "")) {
          showErrorMessage("Password should be  8 letter ");
          return;
        }

        const existingUsersString = localStorage.getItem("userDetails1");

        existingUsers = existingUsersString
          ? JSON.parse(existingUsersString)
          : [];
        const user = existingUsers.find(
          (user: { email: string; password: string }) =>
            user.email === values.email && user.password === values.password
        );

        if (!user) {
          showErrorMessage("Invalid email or password");
          return;
        }
        if (user) {
          showMessage("Login successfully");
          dispatch(setEnableAuth());
          console.log("User authorized:", user);
          return;
        }

        // navigate("/dashboard");
      } catch (error) {
        console.error(
          "Failed to parse existingUsers from localStorage:",
          error
        );
        showErrorMessage("Please check you username or password");
      }
    },
  });

  const formValid = useMemo(() => {
    return formik.values.password === "" || formik.values.email === ""
      ? false
      : true;
  }, [formik]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box
        component={Paper}
        square
        sx={{
          height: "95%",
          width: "100%",
          display: "flex",
          borderRadius: "15px",
          backgroundColor: appColors.butterSignUp,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "6.2rem",
          px: 4,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: appColors.black[100] }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography
          variant="h1"
          sx={{
            fontWeight: 450,
            fontSize: "3.5rem",
            color: appColors.black[100],
          }}
        >
          Sign in
        </Typography>
        <Box sx={{ mt: 1 }}>
          <FieldHeader title={"Email"} />
          <TextField
            autoComplete="off"
            placeholder={"Enter your email"}
            size="small"
            {...formik.getFieldProps("email")}
            InputProps={{ inputProps: { min: 0 } }}
            sx={{ height: `${theme.spacing(5)}`, width: "100%" }}
          />
          <FieldHeader title={"Password"} />
          <TextField
            autoComplete="off"
            placeholder={"Enter your password"}
            size="small"
            {...formik.getFieldProps("password")}
            InputProps={{ inputProps: { min: 0 } }}
            sx={{ height: `${theme.spacing(5)}`, width: "100%" }}
            type="password"
          />
          <Button
            disabled={!formValid}
            fullWidth
            sx={{ mt: 3, mb: 2, color: appColors.white }}
            type="submit"
            variant="contained"
          >
            Login
          </Button>
          <Grid container justifyContent="center">
            <Grid size="auto" sx={{ display: "flex", alignItems: "center" }}>
              <Link
                variant="body2"
                onClick={handleSignUpClick}
                sx={{ cursor: "pointer" }}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </form>
  );
};

export default RightContent;
