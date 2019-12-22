import React from 'react'
import style from './formfields.module.css'

const FormFields = ({formdata, change, id}) => {

  const showErrorMsg = () => {
    let errorMsg = null

    if(formdata.validation && !formdata.valid){
      errorMsg = (
        <div className = {style.labelError}>
          {formdata.validationMessage}
        </div>
      )
    }
    return errorMsg
  }

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
            {showErrorMsg()}
          </div>
        )
        break
      case('select'):
        formtemplate = (
          <div>
            <select value ={formdata.value}
              name={formdata.config.name}
              onBlur={(event) => change({event,id,blur:true})}
              onChange={(event) => change({event,id,blur:false})}
            >
              {formdata.config.options.map((item,i) => (
                <option key={i} value={item.id}>{item.name}</option>
              ))}
            </select>
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
