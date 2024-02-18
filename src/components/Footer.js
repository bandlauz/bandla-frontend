import React from 'react'
import "./Footer.css"
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";

function Footer() {
  return (
    <Box component="footer"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        p: 1
      }}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={4} align="left">
            <img src={process.env.PUBLIC_URL + "/logo-black.png"}
              alt="Bandla image"
              height={30} />
          </Grid>
          <Grid item xs={4} align="center">
            <Typography variant="body2" color="text.secondary">
              &copy;
              <Link color="inherit" href="https://bandla.uz/">
                Bandla
              </Link>{" "}
              {new Date().getFullYear()}
              {". All rights reserved"}
            </Typography>
          </Grid>
          <Grid item xs={4} align="right">
            <Link href="https://www.instagram.com/bandlauz" color="inherit">
              <i className="fa-brands fa-instagram fa-2x"></i>
            </Link>
            {" "}
            <Link href="https://t.me/bandlauz" color="inherit">
              <i className="fa-brands fa-telegram fa-2x"></i>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
export default Footer;