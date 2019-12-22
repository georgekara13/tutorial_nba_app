import React from 'react'
import { Link, withRouter } from 'react-router-dom' //get router history withRouter
import { firebase } from '../../../firebase/firebase'

import FontAwesome from 'react-fontawesome'
import style from './sidenav.module.css'
import items from './itemsconfig'

//TODO consume css class from itemconfig
const SideNavItems = (props) => {

  //for all other items
  const element = (item, i) => (
    <div key={i} className={style.option}>
      <Link to={item.link}><FontAwesome name={item.icon}/>{item.text}</Link>
    </div>
  )

  //for login/logout items
  const restricted = (item, i) => {
    let template = null

    if (props.user === null && item.login){
      template = element(item,i)
    }

    if (props.user !== null && !item.login){
      if(item.link === '/sign-out'){
          template = (
            <div key={i} className={style.option}
            onClick={() => {
              firebase.auth().signOut()
              .then(() => {
                props.history.push("/")
              })
              .catch((error) => {alert(error)})
            }}>
              <FontAwesome name={item.icon}/>{item.text}
            </div>
          )
      }else{
        template = element(item,i)
      }
    }

    return template

  }

  const showItems = () => {
      return items.map((item,i) => {
          return item.login !== '' ? restricted(item,i)
                                   : element(item,i)
      })
  }

  return(
    <div>
      {showItems()}
    </div>
  )
}

export default withRouter(SideNavItems)
