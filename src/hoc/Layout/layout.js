import React, { Component } from 'react'
import './layout.css'

//components
import Header from '../../components/Header/header'

class Layout extends Component {

  state = {

  }

  render() {
    return (
      <div>
          <Header />
          {this.props.children}
          footer
      </div>
    )
  }

}

export default Layout
