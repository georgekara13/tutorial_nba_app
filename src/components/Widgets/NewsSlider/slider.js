import React, { Component } from 'react'
import axios from 'axios'

//components
import SliderTemplates from './slidertemplates'
import { DB_URL } from '../../../helperfunctions'

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
    axios.get(`${DB_URL}articles?_start=${this.props.start}&_end=${this.props.end}`) //fetch first 3 results
         .then( response => {
           this.setState({
             news: response.data
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
