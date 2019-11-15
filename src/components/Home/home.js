import React from 'react'

//components
import NewsSlider from '../Widgets/NewsSlider/slider'

//optionally pass settings to slider component
const Home = () => (
  <div>
    <NewsSlider type='featured' start='0' end='4'
    settings={{
      dots: false
    }}/>
  </div>
)

export default Home
