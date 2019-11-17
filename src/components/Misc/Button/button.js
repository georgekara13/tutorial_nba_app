import React from 'react'
import { Link } from 'react-router-dom'
import style from './button.module.css'

const Button = (props) => {
  let template = null

  switch (props.type){
    case 'loadmore':
      template = (
        <div onClick={props.loadMore} className={style.blue_btn}>{props.content}</div>
      )
      break
    default:
      template = null
  }

  return template
}

export default Button
