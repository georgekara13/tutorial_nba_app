import React from 'react'

//components
import NewsSlider from '../Widgets/NewsSlider/slider'
import NewsList from '../Widgets/NewsList/newslist'
import VideosList from '../Widgets/VideosList/videoslist'

//optionally pass settings to slider component
const Home = () => (
  <div>
    <NewsSlider type='featured' start='0' end='4'
      settings={{
        dots: false
      }}
    />
    <NewsList
      type='card'
      loadmore={true}
      start={3}
      amount={3}
    />
    <VideosList
      type="card"
      title={true}
      loadmore={false}
      start={0}
      amount={3}
    />
  </div>
)

export default Home
