import React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import { Box } from '@mui/material'
import Divider from '@mui/material/Divider'

function Footer() {
  console.log(window.location)

  return (
    <>
      <Divider />
      <Box p={1}>
        <Container>
          <Grid container style={{ display: 'flex', alignItems: 'center' }}>
            <Grid item xs={6} align="left" style={{ whiteSpace: 'nowrap' }}>
              <Typography variant="body2" color="text.secondary">
                &copy;
                <Link color="inherit" href="/">
                  Bandla
                </Link>{' '}
                {new Date().getFullYear()}
                {'. All rights reserved'}
              </Typography>
            </Grid>
            <Grid item xs={6} align="right">
              <Link href="https://www.instagram.com/bandlauz" color="inherit">
                <i className="fa-brands fa-instagram fa-2x"></i>
              </Link>{' '}
              <Link href="https://t.me/bandlauz" color="inherit">
                <i className="fa-brands fa-telegram fa-2x"></i>
              </Link>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default Footer;
