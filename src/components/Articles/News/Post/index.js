import React, { Component } from 'react';
import axios from 'axios'
import { DB_URL } from '../../../../helperfunctions'
import style from '../../articles.module.css'


//components
import Header from './header'
import Body from './body'

class NewsArticles extends Component {

  state = {
    article: [],
    team: []
  }

  componentDidMount(){
    axios.get(`${DB_URL}articles?id=${this.props.match.params.id}`)
         .then( response => {
           let article = response.data[0]

           axios.get(`${DB_URL}teams?id=${article.team}`)
                .then ( response => {
                  this.setState({
                    article,
                    team: response.data
                  })
                })
         })
  }

  render() {
    const article = this.state.article
    const team    = this.state.team

    return (
      <div className={style.articlewrapper}>
        <Header teamData={team[0]} date={article.date} author={article.author}/>
        <Body />
      </div>
    );
  }

}

export default NewsArticles
