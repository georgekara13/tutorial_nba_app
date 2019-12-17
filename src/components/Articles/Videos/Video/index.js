import React, { Component } from 'react'
import style from '../../articles.module.css'
import style2 from '../../../Widgets/VideosList/videoslist.module.css'
import { firebaseDB, firebaseLoopContent, firebaseTeams, firebaseVideos } from '../../../../firebase/firebase'

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
    firebaseDB.ref(`videos/${this.props.match.params.id}`).once('value')
    .then((snapshot) => {
      let video = snapshot.val()
      //order team entries by id in team snapshot
      // and then find matching id entry from article snapshot
      firebaseTeams.orderByChild('teamId').equalTo(video.team).once('value')
      .then((snapshot) => {
        const team = firebaseLoopContent(snapshot)
        this.setState({
          video,
          team
        })
        this.getRelated()
      })
    })
  }

  getRelated = () => {
    firebaseTeams.once('value')
    .then((snapshot) => {
      const teams = firebaseLoopContent(snapshot)
      firebaseVideos.orderByChild('team').equalTo(this.state.video.team)
      .limitToFirst(3).once('value')
      .then((snapshot) => {
        const related = firebaseLoopContent(snapshot)
        this.setState({
          teams,
          related
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
