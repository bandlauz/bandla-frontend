import * as React from "react";
import './Home.css';
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
function Home() {
    return (
        <div class="p-3 mb-2">
            <div style={{ display: 'flex', justifyContent: 'end' }}>
                <Link to="/login" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" style={{ backgroundColor: 'rgba(127,0,127,0.81)' }} sx={{ m: 2 }}>
                        Войти
                    </Button>
                </Link>
            </div>
            <Box sx={{ borderRadius: '16px', backgroundColor: 'rgba(0,255,236,0.69)', width: 1 / 4 }}
                padding={1} margin={1} mx="auto">
                <Typography align="center" variant="h5" color="common.white">Hello from Bandla system 👀</Typography>
            </Box>
            <div className="image-container">
                <img src="https://github.com/bandlauz/.github/assets/109890132/8aa4d947-9b71-45ed-b923-bce64d06df08"
                    alt="Bandla image" />
            </div>
            <Typography variant="h5" align="center" color="common.white">Jamoamizga Web-dizayner kerak🔎</Typography>
            <Typography variant="h5" align="center" color="common.white" >В нашу команду нужен Веб-дизайнер🔎</Typography>
            <Typography variant="h5" align="center" color="common.white">Our team needs a Web-designer🔎</Typography>
        </div>);
}

export default Home;