import React from 'react'
import FontAwesome from 'react-fontawesome'
import Moment from 'moment'

import style from './cardinfo.module.css'

const CardInfo = (props) => {

  /*4.followed up by step (3) we run an array.find() on an empty array,
  return an empty object property
  thus the memory leak happens. With a single if statement we prevent that.
  We don't care on what's happening with the first render, prior to the didmount lifecycle anyway*/
  const getTeamName = (teams,teamid) => {
    let data = teams.find((team) => {
      return team.teamId === teamid
    })

    if ( data ){
      return data.name
    }
  }

  const formatDate = (date) => {
    return Moment(date).format(' MM/DD/YYYY')
  }

  return (
    <div className={style.cardinfo}>
      <span className={style.teamname}>{getTeamName(props.teams, props.teamid)}</span>
      <span className={style.date}>
        <FontAwesome name="clock" />
        {formatDate(props.date)}
      </span>
    </div>
  )
}
export default CardInfo
