import * as React from 'react';
import './css/Home.css';
import { Box } from '@mui/system';

function Home() {
  return (
    <>
      <Box
        sx={{ borderRadius: '16px', backgroundColor: '#1E374B', width: 290 }}
        padding={0.004}
        mx="auto"
      >
        <h3 style={{ color: 'white' }} align="center">
          Hello from Bandla system 👀
        </h3>
      </Box>
      <div className="image-container">
        <img
          src={process.env.PUBLIC_URL + '/logo.png'}
          alt="Bandla image"
          width="335"
        />
      </div>
      <h3 align="center">Jamoamizga Web-dizayner kerak🔎</h3>
      <h3 align="center">В нашу команду нужен Веб-дизайнер🔎</h3>
      <h3 align="center">Our team needs a Web-designer🔎</h3>
    </>
  );
}

export default Home;
