import { Typography } from '@mui/material'
import React from 'react'
import NavBar from './Navbar'

export default function Header() {
  return (
    <div id='idHeader' style={{ backgroundColor: "yellow" }}>
      <Typography>MassoPro</Typography>
      <NavBar/>
    </div>
  )
}
