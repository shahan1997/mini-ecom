import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import RightContent from "./components/RightContent";
import { LeftContent } from "./components/LeftContent";

const SignUp = () => {
  return (
    <Container
      component="main"
      sx={{
        // height: "100vh",
        display: "flex",
        //py: 3,
      }}
    >
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 5 }} sx={{ mt: 3 }}>
          <RightContent />
        </Grid>
        <Grid size={{ xs: 12, md: 7 }}>
          <LeftContent />
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignUp;
