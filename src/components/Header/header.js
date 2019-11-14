import React from 'react'
import FontAwesome from 'react-fontawesome'
import style from './header.module.css' //CSS MODULES SHOULD FOLLOW THIS NAME CONVENTION <NAME>.module.css

//components
import SideNavigation from './SideNav/sidenav'
import Logo from '../Misc/logo'

const Header = (props) => {

  const navBars = () => (
    <div className={style.bars}>
      <FontAwesome name="bars" onClick={props.onOpenNav}/>
    </div>
  )

  return(
    <header className={style.header}>
      <SideNavigation {...props}/>
      <div className={style.headeropt}>
        {navBars()}
        <Logo style={style} />
      </div>
    </header>
  )
}

export default Header
