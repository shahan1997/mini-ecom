import React from "react";
import { Typography, Box, Divider } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { appColors } from "../../../theme/appColors";

export function LeftContent() {
  return (
    <Box
      sx={{
        height: "95%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        padding: "2rem",

        borderRadius: "8px",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontWeight: 450,
          fontSize: "3.5rem",
          color: appColors.black[100],
          p: 0,
          m: 0,
          mt: { xs: -1, sm: -3, md: -3.5 },
        }}
      >
        Home
      </Typography>
      <Grid
        sx={{
          display: "flex",
          alignItems: "center",
          //   justifyContent: "right",
          flexWrap: "wrap",
          justifyContent: "flex-start", // Adjusted alignment
          p: 0,
          m: 0,
          mt: { xs: -1, sm: -3, md: -3.5 },
        }}
      >
        <Divider
          sx={{
            width: { xs: "100px", sm: "150px", md: "200px" },
            mr: 2,
            height: "4px",
            color: appColors.black[100],
            backgroundColor: appColors.black[100],
          }}
        />
        <Typography
          variant="h1"
          sx={{
            fontWeight: 450,
            fontSize: "3.5rem",
            color: appColors.black[100],
            marginLeft: 1,
          }}
        >
          Elegance
        </Typography>
      </Grid>
      <Typography
        variant="h1"
        sx={{
          fontWeight: 450,
          fontSize: "3.5rem",
          color: appColors.black[100],
          p: 0,
          m: 0,
          pb: 2,
          mt: { xs: -1, sm: -3, md: -3.5 },
        }}
      >
        Starts Here,
      </Typography>
      <Box
        component="img"
        src={require("../../../assets/images/signup.jpg")}
        alt="Example"
        sx={{
          width: "100%",
          height: "auto",
          maxWidth: { xs: "300px", sm: "400px", md: "600px" },
          maxHeight: { xs: "200px", sm: "300px", md: "400px" },
          borderRadius: "15px",

          clipPath:
            "polygon(30% 0, 100% 0, 100% 60%, 100% 100%, 0 100%, 0 61%, 0 34%)",
        }}
      />
    </Box>
  );
}
