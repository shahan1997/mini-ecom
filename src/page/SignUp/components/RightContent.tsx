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
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import Grid from "@mui/material/Grid2";
import { appColors } from "../../../theme/appColors";
import { useNavigate } from "react-router-dom";
import { theme } from "../../../theme";
import FieldHeader from "../../../components/FieldHeader";
import { useFormik } from "formik";
import { useNotifier } from "../../../core/Notifier";
import { setEnableAuth } from "./AuthSlice";
import { useAppDispatch } from "../../../store/hooks";

// interface RightContentProps {
//   handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
// }

const RightContent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { showErrorMessage } = useNotifier();
  //Form validation
  const validateName = (value: string) => {
    return /\S/.test(value);
  };
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      let existingUsers = [];
      try {
        if (!validateName(values.name || "")) {
          showErrorMessage("Please enter only letters ");
          return;
        }
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
        const emailExists = existingUsers.some(
          (user: { email: string }) => user.email === values.email
        );
        if (emailExists) {
          showErrorMessage("Email is already registered");
          return;
        }

        const userData = {
          name: values.name,
          email: values.email,
          password: values.password,
        };
        console.log("existingUsers", existingUsers);
        existingUsers.push(userData);

        console.log("SignUp userData", userData);
        localStorage.setItem("userDetails1", JSON.stringify(existingUsers));

        console.log("existingUsers userData", existingUsers);
        dispatch(setEnableAuth());
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
    return formik.values.name === "" ||
      formik.values.password === "" ||
      formik.values.email === ""
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
          padding: "5rem",
          px: 4,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: appColors.black[100] }}>
          <VpnKeyIcon />
        </Avatar>
        <Typography
          variant="h1"
          sx={{
            fontWeight: 450,
            fontSize: "3.5rem",
            color: appColors.black[100],
          }}
        >
          Sign up
        </Typography>
        <Box sx={{ mt: 1 }}>
          <FieldHeader title={"Name"} />
          <TextField
            autoComplete="off"
            placeholder={"Enter your name"}
            size="small"
            {...formik.getFieldProps("name")}
            InputProps={{ inputProps: { min: 0 } }}
            sx={{ height: `${theme.spacing(5)}`, width: "100%" }}
          />

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
        </Box>
      </Box>
    </form>
  );
};

export default RightContent;
