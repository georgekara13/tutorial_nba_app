import React from 'react'
import { CURRENT_YEAR } from '../../helperfunctions'
import style from './footer.module.css'

//components
import Logo from '../Misc/logo'

const Footer = () => {

  return (
    <div className={style.footer}>
      <Logo style={style} />
      <div className={style.right}>
        @NBA {CURRENT_YEAR} All rights reserved
      </div>
    </div>
  )
}

export default Footer
