import React, { Component } from 'react';
import style from '../../articles.module.css'
import { firebase, firebaseDB, firebaseLoopContent, firebaseTeams } from '../../../../firebase/firebase'

//components
import Header from './header'

class NewsArticles extends Component {

  state = {
    article: [],
    team: [],
    imageURL: ''
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
        //downside setting state twice -> rendering twice
        this.getImageURL(article.image)
      })
    })
  }

  getImageURL = (filename) => {
      firebase.storage().ref('images')
      .child(filename).getDownloadURL()
      .then ( url => {
        this.setState({
          imageURL: url
        })
      })
      .catch ( e => {
        this.setState({
          imageURL: `/images/articles/${this.state.article.image}`
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
                 background: `url('${this.state.imageURL}')`
               }}
          ></div>
          <div className={style.article_text} dangerouslySetInnerHTML={{__html:article.body}} />
        </div>
      </div>
    );
  }

}

export default NewsArticles
