import React from 'react'
import style from '../articles.module.css'
import Moment from 'moment'

const formatDate = (date) => {
  return Moment(date).format(' MM/DD/YYYY')
}

const PostData = (props) => (
  <div className={style.article_post_data}>
    <div>
      Date:
      <span>{formatDate(props.data.date)}</span>
    </div>
    <div>
      Author:
      <span>{props.data.author}</span>
    </div>
  </div>
)

export default PostData
