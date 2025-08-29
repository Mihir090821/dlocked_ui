import { CircularProgress, Box } from "@mui/material";

const AppLoader = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="100vh"
    sx={{ background: "#0D0D1A" }}
  >
    <CircularProgress sx={{ color: "#6C5CE7" }} />
  </Box>
);

export default AppLoader;
