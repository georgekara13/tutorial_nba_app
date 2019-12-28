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

import PrivateRoute from './components/AuthRoutes/privateroute'
import PublicRoute from './components/AuthRoutes/publicroute'

const Routes = (props) => {
    return (
      //pass user session info to Layout HOC
      <Layout user={props.user}>
        <Switch>
          <PublicRoute {...props} restricted={false} path="/" exact component={Home} />
          <PublicRoute {...props} restricted={false} path="/articles/:id" exact component={NewsArticle} />
          <PublicRoute {...props} restricted={false} path="/articles" exact component={NewsView} />
          <PublicRoute {...props} restricted={false} path="/videos/:id" exact component={VideoArticle} />
          <PublicRoute {...props} restricted={false} path="/videos" exact component={VideoView} />
          <PublicRoute {...props} restricted={true} path="/sign-in" exact component={Signin} />
          <PrivateRoute {...props} path="/dashboard" exact component={Dashboard} />
        </Switch>
      </Layout>
    )
}

export default Routes
