import React from 'react'
import Slick from 'react-slick'
import {Link} from 'react-router-dom'
import style from './slider.module.css'

const SliderTemplates = (props) => {

  let template = null

  //configuration for slick slider. Dont forget to include the stylesheets in index.html
  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slideToShow: 1,
    slidesToScroll: 1,
    ...props.settings  //optional settings passed by home component
  }

  switch(props.type){
    case ('featured'):
      template = props.data.map((item,i) => {
        return(
          <div key={i}>
            <div className={style.featured_item}>
              <div className ={style.featured_image} style = {{
                background: `url(../images/articles/${item.image})`
              }}/>
              <Link to={`/articles/${item.id}`}>
                <div className={style.featured_item_title}>{item.title}</div>
              </Link>
            </div>
          </div>
        )
      })
      break
    default:
      template = null

  }

  return (
    <Slick {...settings}>
      {template}
    </Slick>
  )
}

export default SliderTemplates
