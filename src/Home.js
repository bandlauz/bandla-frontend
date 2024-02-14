import * as React from "react";
import './Home.css';
import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
function Home() {
    return (
        <div>
            <div style={{ display: "flex", justifyContent: "end" }}>
                <Link to="/login" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" style={{ backgroundColor: 'rgb(0,109,199)' }} sx={{ m: 2, top: "0px", right: "0px" }}>
                        Войти
                    </Button>
                </Link>
            </div>
            <Box sx={{ borderRadius: '16px', backgroundColor: '#1E374B', width: 290 }}
                padding={0.004} margin={1} mx="auto">
                <h3 style={{ color: "white" }} align="center">Hello from Bandla system 👀</h3>
            </Box>
            <div className="image-container">
                <img src="https://github.com/bandlauz/.github/assets/109890132/8aa4d947-9b71-45ed-b923-bce64d06df08"
                    alt="Bandla image"
                    width="370"
                    height="270" />
            </div>
            <h3 align="center">Jamoamizga Web-dizayner kerak🔎</h3>
            <h3 align="center">В нашу команду нужен Веб-дизайнер🔎</h3>
            <h3 align="center">Our team needs a Web-designer🔎</h3>
        </div>);
}

export default Home;