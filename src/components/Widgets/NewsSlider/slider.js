import React, { Component } from 'react'
import { firebaseArticles, firebaseLoopContent } from '../../../firebase/firebase'

//components
import SliderTemplates from './slidertemplates'

class NewsSlider extends Component {

  state = {
    news: []
  }

  /*ComponentWillMount not safe anymore
  There is a common misconception that fetching in componentWillMount lets you avoid
  the first empty rendering state. In practice this was never true because React has always executed
  render immediately after componentWillMount. If the data is not available by the time componentWillMount
  fires, the first render will still show a loading state regardless of where you initiate the fetch.
  This is why moving the fetch to componentDidMount has no perceptible effect in the vast majority of cases.
  see more https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html
  */
  componentDidMount(){
    /*in fact the component renders empty, and in a blink of an eye it will rerender with the
    data received from async axios request, as it's setting the state.
    Remember on setState = rerender view
    */
    firebaseArticles.limitToFirst(3).once('value')
                    .then((snapshot) => {
                      const news = firebaseLoopContent(snapshot)
                      this.setState({
                        news
                      })
                    })
  }

  render() {
    return (
      <SliderTemplates data={this.state.news} type={this.props.type} settings={this.props.settings}/>
    )
  }

}

export default NewsSlider
