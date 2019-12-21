import React from 'react'
import style from './formfields.module.css'

const FormFields = ({formdata, change, id}) => {

  const renderTemplate = () => {

    let formtemplate = null

    switch (formdata.element){
      case('input'):
        formtemplate = (
          <div>
            <input
              {...formdata.config}
              value={formdata.value}
              onBlur={(event) => change({event,id,blur:true})}
              onChange={(event) => change({event,id,blur:false})}
            />
          </div>
        )
        break
      default:
        formtemplate = null
    }

    return formtemplate
  }

  return (
    <div>
      {renderTemplate()}
    </div>
  )
}

export default FormFields
