import React from 'react'
import style from '../videoslist.module.css'

import VideoCard from '../videocard'


const VideosRelated = (props) => (
  <div className={style.related_wrapper}>
  <VideoCard
    data={props.videos}
    teams={props.teams}
  />
  </div>
)

export default VideosRelated
