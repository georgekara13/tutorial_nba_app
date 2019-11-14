import React from 'react'
import { Link } from 'react-router-dom'

const Logo = (props) => (
  <Link to="/" className={props.style.logo}>
    <img alt="nba logo" src="/images/nba_logo.png"/>
  </Link>
)

export default Logo
