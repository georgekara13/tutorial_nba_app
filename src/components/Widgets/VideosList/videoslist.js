import React, { Component } from 'react'
import style from './videoslist.module.css'
import axios from 'axios'

//components
import { DB_URL } from '../../../helperfunctions'
import Button from '../../Misc/Button/button'
import VideoCard from './videocard'

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
      this.request(this.state.end, end)
  }

  componentDidMount(){
    this.request(this.state.start, this.state.end)
  }

  request = (start, end) => {
    if ( !this.state.teams.length ){
      axios.get(`${DB_URL}teams`)
           .then( response => {
             this.setState({
               teams: response.data
             })
           })
    }

    axios.get(`${DB_URL}videos?_start=${start}&_end=${end}`)
         .then ( response => {
           this.setState({
             videos: [...this.state.videos, ...response.data],
             start,
             end
           })
         })
  }

  showButton = (loadmore) => {
    return loadmore ? <Button type="loadmore" loadmore={() => this.loadMore() } content="Load More videos"/>
                    : <Button type="linkto" content="More Videos" linkTo="/videos" />
  }

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
