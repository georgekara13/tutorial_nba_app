import React, { Component } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Link } from 'react-router-dom'
import style from './newslist.module.css'
import { firebaseTeams, firebaseArticles, firebaseLoopContent } from '../../../firebase/firebase'

//component
import Button from '../../Misc/Button/button'
import CardInfo from '../../Misc/CardInfo/cardinfo'

class NewsList extends Component {

  state = {
    teams: [],
    items: [],
    start: this.props.start,
    end: this.props.start + this.props.amount,
    amount: this.props.amount
  }

  componentDidMount(){
    this.request(this.state.start, this.state.end)
  }

  loadMore = () => {
    const end = this.state.end + this.state.amount
    this.request(this.state.end + 1, end)
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

    firebaseArticles.orderByChild("id").startAt(start).endAt(end).once('value')
    .then((snapshot) => {
      const articles = firebaseLoopContent(snapshot)
      this.setState({
        items: [...this.state.items,...articles],
        start,
        end
      })
    })
    .catch( (e) => {
      console.log(e)
    })

  }

  renderNews = (type) => {
    let template = null
    switch (type){
      case ('card'):
        template = this.state.items.map( (item, i) => (
          <CSSTransition
            classNames={{
              enter: style.newslist_wrapper,
              enterActive: style.newslist_wrapper_enter
            }}
            timeout={500}
            key={i}
          >
            <div>
              <div className={style.newslist_item}>
                <Link to={`/articles/${item.id}`}>
                  <CardInfo teams={this.state.teams} teamid={item.team} date={item.date}/>
                  <h2>{item.title}</h2>
                </Link>
              </div>
            </div>
          </CSSTransition>
        ))
        break
        //TODO fix css
        case ('newsview'):
          template = this.state.items.map( (item, i) => (
            <CSSTransition
              classNames={{
                enter: style.newslist_wrapper,
                enterActive: style.newslist_wrapper_enter
              }}
              timeout={500}
              key={i}
            >
              <div>
                <div className={style.flex_wrapper}>
                  <Link to={`/articles/${item.id}`}>
                    <CardInfo teams={this.state.teams} teamid={item.team} date={item.date}/>
                    <div>
                      <img src= {`Images/articles/${item.image}`} alt={item.id}/>
                      <h2>{item.title}</h2>
                    </div>
                  </Link>
                </div>
              </div>
            </CSSTransition>
          ))
          break
      default:
        template = null
    }
    return template
  }

  render() {
    return (
      <div>
        <TransitionGroup
          component="div"
          className="list"
        >
          {this.renderNews(this.props.type)}
        </TransitionGroup>

        <Button
          type='loadmore'
          loadMore={() => this.loadMore()}
          content= 'Load More News'
        />
      </div>
    )
  }

}

export default NewsList
