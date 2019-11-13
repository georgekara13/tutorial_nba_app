import React from 'react'
import { Link } from 'react-router-dom'
import FontAwesome from 'react-fontawesome'
import style from './sidenav.module.css'
import items from './itemsconfig'

//TODO consume css class from itemconfig
const SideNavItems = () => {

  const showItems = () => {
      return items.map((item,i) => {
          console.log(item.type);
          return (
            <div key={i} className={style.option}>
              <Link to={item.link}><FontAwesome name={item.icon}/>{item.text}</Link>
            </div>
          )
      })
  }

  return(
    <div>
      {showItems()}
    </div>
  )
}

export default SideNavItems
