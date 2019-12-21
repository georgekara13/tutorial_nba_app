import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

//components
import Home from './components/Home/home'
import Layout from './hoc/Layout/layout'
import NewsArticle from './components/Articles/News/Post/index'
import VideoArticle from './components/Articles/Videos/Video/index'
import NewsView from './components/Articles/News/newsview'
import VideoView from './components/Articles/Videos/videoview.js'
import Signin from './components/Signin/signin'

class Routes extends Component {

  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/articles/:id" exact component={NewsArticle} />
          <Route path="/articles" exact component={NewsView} />
          <Route path="/videos/:id" exact component={VideoArticle} />
          <Route path="/videos" exact component={VideoView} />
          <Route path="/sign-in" exact component={Signin} />
        </Switch>
      </Layout>
    )
  }

}

export default Routes
