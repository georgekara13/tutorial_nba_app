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

    newElement.value        = element.event.target.value
    newFormData[element.id] = newElement

    this.setState({
      formdata: newFormData
    })

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
