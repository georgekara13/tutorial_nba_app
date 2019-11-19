import React from 'react'
import { Link } from 'react-router-dom'
import style from './videoslist.module.css'

//components
import CardInfo from '../../Misc/CardInfo/cardinfo'

const VideoCard = (props) => {
  return props.data.map((item,i) => (
      <Link to={`/videos/${item.id}`} key={i}>
        <div className={style.videolistitem_wrapper}>
          <div className={style.left}
            style = {{
              background: `url(/images/videos/${item.image})`
            }}
          ><div></div>
          </div>
          <div className={style.right}>
            <CardInfo teams={props.teams} teamid={item.team} date={item.date}/>
            <h2>{item.title}</h2>
          </div>
        </div>
      </Link>
  ))
}

export default VideoCard