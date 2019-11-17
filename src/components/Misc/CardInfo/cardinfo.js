import React from 'react'
import FontAwesome from 'react-fontawesome'
import style from './cardinfo.module.css'

const CardInfo = (props) => {

  const getTeamName = (teams,teamid) => {
    let data = teams.find((team) => {
      return team.id === teamid
    })

    return data.name
  }

  return (
    <div className={style.cardinfo}>
      <span className={style.teamname}>{getTeamName(props.teams, props.teamid)}</span>
      <span className={style.date}>
        <FontAwesome name="clock" />
        {props.date}
      </span>
    </div>
  )
}
export default CardInfo
