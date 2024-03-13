import * as React from 'react'
import './css/WrongPath.css'
import { Button } from '@mui/material'

function WrongPath() {
  return (
    <div className="wrong_path_area">
      <div className="image-container">
        <img
          src={process.env.PUBLIC_URL + '/logo.png'}
          alt="Bandla image"
          width="335"
        />
      </div>
      <h1>Bosh sahifaga qayting</h1>
      <a href="/">
        <Button style={{ backgroundColor: '#1976d2', color: '#fff' }}>
          Bosh sahifa
        </Button>
      </a>
    </div>
  )
}

export default WrongPath
