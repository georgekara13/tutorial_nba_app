import React from 'react'

import NewsSlider from '../../Widgets/NewsSlider/slider'
import NewsList from '../../Widgets/NewsList/newslist'

const NewsView = () => (
  <div>
    <NewsSlider type='featured' start='0' end='4'
      settings={{
        dots: false
      }}
    />
    <NewsList
      type='newsview'
      loadmore={true}
      start={3}
      amount={3}
    />
  </div>
)

//TODO add back to .. button => misc component
export default NewsView
