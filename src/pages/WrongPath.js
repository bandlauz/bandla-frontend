import * as React from 'react'
import './css/WrongPath.css'
import { Button } from '@mui/material'

function WrongPath() {
  return (
    <div className="wrong_path_area content-body">
      <div className="image-container">
        <h1 style={{color: 'red', marginBottom: '5px'}}>Sahifa topilmadi :(</h1>
      </div>
      <h3>Bosh sahifaga qayting</h3>
      <a href="/">
        <Button style={{ backgroundColor: '#1976d2', color: '#fff' }}>
          Bosh sahifa
        </Button>
      </a>
    </div>
  )
}

export default WrongPath
