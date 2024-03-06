import React from 'react'
import Divider from '@mui/material/Divider';
import './css/Footer.css';

function Footer() {
  return (
    <>
      <Divider />
      <div className='footer'>
        <div className='ellipsis_txt'>
          &copy;{' '}
          <a href='https://bandla.uz/'>Bandla</a>{' '}
          {new Date().getFullYear()}.
          Barcha huquqlar himoyalangan.
        </div>
        <div className='icons'>
          <a className='icon' href='https://www.instagram.com/bandlauz' target='_blank'>
            <i className="fa-brands fa-instagram fa-2x"></i>
          </a>
          <a className='icon' href='https://t.me/bandlauz' target='_blank'>
            <i className="fa-brands fa-telegram fa-2x"></i>
          </a>
        </div>
      </div>
    </>
  )
}

export default Footer;