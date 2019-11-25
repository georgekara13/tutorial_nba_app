import React from 'react'

import TeamInfo from '../../Elements/teaminfo'

const Header = (props) => {

  const showTeam = (team) => {
    return team ? ( <TeamInfo team={team} />)
                : null
  }

  return (
    <div>
      {showTeam(props.teamData)}
    </div>
  )
}

export default Header
