import React from 'react'
import { Box } from "@mui/material";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

function NavbarSimple() {
    return (
        <Box
            className='b_line'
            sx={{
                marginBottom: 1,
                p: 1
            }}>
            <Container>
                <Grid container>
                    <Grid item xs={4} align="left">
                        <Link className='d_flex_y_ce' color="inherit" href="https://bandla.uz">
                            <img src={process.env.PUBLIC_URL + "/logo-black.png"}
                                alt="Bandla image"
                                height={35}
                            />
                        </Link>
                    </Grid>
                    <Grid item xs={8}>
                    </Grid>
                </Grid>
            </Container>
        </Box>);
}
export default NavbarSimple;