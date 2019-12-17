import React, { Component } from 'react';
import style from '../../articles.module.css'
import { firebaseDB, firebaseLoopContent, firebaseTeams } from '../../../../firebase/firebase'

//components
import Header from './header'

class NewsArticles extends Component {

  state = {
    article: [],
    team: []
  }

  componentDidMount(){
    firebaseDB.ref(`articles/${this.props.match.params.id}`).once('value')
    .then((snapshot) => {
      let article = snapshot.val()
      //order team entries by id in team snapshot
      // and then find matching id entry from article snapshot
      firebaseTeams.orderByChild('teamId').equalTo(article.team).once('value')
      .then((snapshot) => {
        const team = firebaseLoopContent(snapshot)
        this.setState({
          article,
          team
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

        <div className={style.article_body}>
          <h1>{article.title}</h1>
          <div className={style.article_image}
               style={{
                 background: `url('/images/articles/${article.image}')`
               }}
          ></div>
          <div className={style.article_text}>{article.body}</div>
        </div>
      </div>
    );
  }

}

export default NewsArticles
