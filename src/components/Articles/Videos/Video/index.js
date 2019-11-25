import React, { Component } from 'react'
import axios from 'axios'
import { DB_URL } from '../../../../helperfunctions'
import style from '../../articles.module.css'
import style2 from '../../../Widgets/VideosList/videoslist.module.css'

import Header from './header'
import VideosRelated from '../../../Widgets/VideosList/VideosRelated/videosrelated'


class VideoArticle extends Component {

  state= {
    video: [],
    team: [],
    teams: [],
    related: []
  }

  componentDidMount(){
    axios.get(`${DB_URL}videos?id=${this.props.match.params.id}`)
         .then( response => {
           let video = response.data[0]

           axios.get(`${DB_URL}teams?id=${video.team}`)
                .then ( response => {
                  this.setState({
                    video,
                    team: response.data
                  })
                  this.getRelated()
                })
         })
  }

  getRelated = () => {
    axios.get(`${DB_URL}teams`)
         .then( response => {
           let teams = response.data
           axios.get(`${DB_URL}videos?q=${this.state.team[0].city}&_limit=3`)
                .then( response => {
                  this.setState({
                    teams,
                    related: response.data
                  })
                })
         })
  }

  render() {

    const video = this.state.video
    const team  = this.state.team

    console.log(this.state.related)
    return (
      <div>
        <Header teamData = {team[0]} />
        <div className={style.video_wrapper}>
          <h1>{video.title}</h1>
          {/*should be in a different component*/}
          <iframe title="videoplayer"
                  width="100%"
                  height="300px"
                  src={`https://www.youtube.com/embed/${video.url}`}
          >
          </iframe>
        </div>
        <div className={style2.videoslist_wrapper}>
          <h3><strong>Related</strong> Videos</h3>
        </div>
        <VideosRelated videos={this.state.related} teams={this.state.teams}/>
      </div>
    )
  }

}

export default VideoArticle
