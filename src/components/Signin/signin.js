import React, { Component } from 'react'
import style from './signin.module.css'
import SignInTemplate from './signintemplate.json'

import FormFields from '../Widgets/FormFields/formfields'

class Signin extends Component {

  state = SignInTemplate

  updateForm = (element) => {
    const newFormData = {
      ...this.state.formdata
    }

    const newElement = {
      ...newFormData[element.id]
    }

    //capture input from textfield
    newElement.value = element.event.target.value

    //validate fields on blur
    if (element.blur){
      let validData                = this.validate(newElement)
      newElement.valid             = validData[0]
      newElement.validationMessage = validData[1]
    }

    newElement.touched      = element.blur
    newFormData[element.id] = newElement

    this.setState({
      formdata: newFormData
    })

  }

  //validate input data
  validate = (element) => {
    let error = [true, '']

    //TODO move to signintemplate as rules per element
    if(element.validation.email){
      const rx      = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-z]{2,3}/
      const valid   = rx.test(element.value)
      const message = `${!valid ? 'Not a valid email' : ''}`
      error         = !valid ? [valid, message] : error
    }

    if(element.validation.password){
      const valid   = element.value.length >= 5
      const message = `${!valid ? 'Must be greater than 5' : ''}`
      error         = !valid ? [valid, message] : error
    }

    if(element.validation.required){
      const valid   = element.value.trim() !== ''
      const message = `${!valid ? 'This field is required' : ''}`
      error         = !valid ? [valid, message] : error
    }

    return error
  }

  render() {
    return (
      <div className={style.logContainer}>
        <form>
          <h2>Sign in</h2>
          <FormFields
            id={'email'}
            formdata={this.state.formdata.email}
            change={(element) => this.updateForm(element)}
          />
          <FormFields
            id={'password'}
            formdata={this.state.formdata.password}
            change={(element) => this.updateForm(element)}
          />
        </form>
      </div>
    )
  }

}

export default Signin
