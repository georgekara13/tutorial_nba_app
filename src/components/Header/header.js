import React from 'react'
import { Link } from 'react-router-dom'
import FontAwesome from 'react-fontawesome'

import style from './header.module.css' //CSS MODULES SHOULD FOLLOW THIS NAME CONVENTION <NAME>.module.css

const Header = () => {

  const navBars = () => (
    <div className={style.bars}>
      <FontAwesome name="bars"/>
    </div>
  )

  const logo = () => (
      <Link to="/" className={style.logo}>
        <img alt="nba logo" src="/images/nba_logo.png"/>
      </Link>
  )

  return(
    <header className={style.header}>
      <div className={style.headeropt}>
        {navBars()}
        {logo()}
      </div>
    </header>
  )
}

export default Header
