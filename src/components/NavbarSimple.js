import React from 'react'
import { Box } from "@mui/material";
import Divider from '@mui/material/Divider';
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

function NavbarSimple() {
    return (
        <Box
            sx={{
                marginBottom: 1,
                p: 1
            }}>
            <Container>
                <Grid container>
                    <Grid item xs={4} align="left">
                        <Link color="inherit" href="https://bandla.uz">
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
            <Divider />
        </Box>);
}
export default NavbarSimple;