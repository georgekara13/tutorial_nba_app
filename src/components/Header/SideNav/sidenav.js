import React from 'react'
import SideNav from 'react-simple-sidenav'

//components
import SideNavItems from './sidenavitems'

const SideNavigation = (props) => {

    return (
      <div>
        <SideNav
          showNav={props.showNav}
          onHideNav = {props.onHideNav}
          navStyle = {{
            background: '#242424',
            maxWidth: '220px'
          }}
        >
          <SideNavItems />
        </SideNav>
      </div>
    )
}

export default SideNavigation
