import React from 'react'
import { Route, Switch } from 'react-router-dom'

//components
import Home from './components/Home/home'
import Layout from './hoc/Layout/layout'
import NewsArticle from './components/Articles/News/Post/index'
import VideoArticle from './components/Articles/Videos/Video/index'
import NewsView from './components/Articles/News/newsview'
import VideoView from './components/Articles/Videos/videoview.js'
import Signin from './components/Signin/signin'
import Dashboard from './components/Dashboard/dashboard'

const Routes = (props) => {
    return (
      //pass user session info to Layout HOC
      <Layout user={props.user}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/articles/:id" exact component={NewsArticle} />
          <Route path="/articles" exact component={NewsView} />
          <Route path="/videos/:id" exact component={VideoArticle} />
          <Route path="/videos" exact component={VideoView} />
          <Route path="/sign-in" exact component={Signin} />
          <Route path="/dashboard" exact component={Dashboard} />
        </Switch>
      </Layout>
    )
}

export default Routes
