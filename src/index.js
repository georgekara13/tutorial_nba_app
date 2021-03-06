import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { firebase } from './firebase/firebase'
import Routes from './routes'

//pass user session as props to all routes
const App = (props) => (
  <BrowserRouter>
    <Routes {...props}/>
  </BrowserRouter>
)

firebase.auth().onAuthStateChanged((user) => {
  ReactDOM.render(<App user={user}/>, document.getElementById('root'))
})
