import React from 'react'

import VideosList from '../../Widgets/VideosList/videoslist'

const VideoView = () => (
  <div>
    <VideosList
      type="card"
      title={false}
      loadmore={true}
      start={0}
      amount={6}
    />
  </div>
)

export default VideoView
