import React, { Component } from 'react'
import style from './videoslist.module.css'
import { firebaseTeams, firebaseVideos, firebaseLoopContent } from '../../../firebase/firebase'


//components
import Button from '../../Misc/Button/button'
import VideoCard from './videocard'

/*memory leak how to: follow comments*/
class VideosList extends Component {

  state = {
    teams: [],
    videos: [],
    start: this.props.start,
    end: this.props.start + this.props.amount,
    amount: this.props.amount
  }

  showTitle = (title) => {
      return title ? <h3><strong>NBA</strong> Videos</h3>
                   : null
  }

  /*2. before component did mount lifecycle runs,
  this will run and will pass an empty state.teams array as props to videocard component*/
  showVideos = (type) => {
    let template = null

    switch( this.props.type ){
      case('card'):
        template = <VideoCard data={this.state.videos} teams={this.state.teams} />
        break
      default:
        template = null
    }

    return template
  }

  loadMore = () => {
      let end = this.state.end + this.state.amount
      this.request(this.state.end + 1, end)
  }

  componentDidMount(){
    this.request(this.state.start, this.state.end)
  }

  request = (start, end) => {
    if ( !this.state.teams.length ){
      firebaseTeams.once('value')
      .then((snapshot) => {
        const teams = firebaseLoopContent(snapshot)
        this.setState({
          teams
        })
      })
    }

    firebaseVideos.orderByChild("id").startAt(start).endAt(end).once('value')
    .then((snapshot) => {
      const videos = firebaseLoopContent(snapshot)
      this.setState({
        videos: [...this.state.videos,...videos],
        start,
        end
      })
    })
    .catch( (e) => {
      console.log(e)
    })
  }

  showButton = (loadmore) => {
    return loadmore ? <Button type="loadmore" loadMore={() => this.loadMore() } content="Load More videos"/>
                    : <Button type="linkto" content="More Videos" linkTo="/videos" />
  }

  //1.This will run first, before lifecycle. Start of memory leak
  //TODO Refactor to transitiongroup - check newslist.js
  render() {
    return (
      <div className={style.videoslist_wrapper}>
        { this.showTitle(this.props.title) }
        { this.showVideos(this.props.type) }
        { this.showButton(this.props.loadmore) }
      </div>
    )
  }

}

export default VideosList
