import React, { Component } from 'react'
import style from './signin.module.css'
import SignInTemplate from './signintemplate.json'
import { firebase } from '../../firebase/firebase'

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

  submitButton = () => (
    this.state.loading ? 'loading...'
                       : <div>
                            <button onClick={(event) => this.submitForm(event,false)}>Sign up</button>
                            <button onClick={(event) => this.submitForm(event,true)}>Sign in</button>
                         </div>
  )

  submitForm = (event,type) => {

    event.preventDefault()

    if ( type !== null ){
      let dataToSubmit = {}
      let formIsValid  = true

      //capture email, password input values from state
      for(let key in this.state.formdata){
        dataToSubmit[key] = this.state.formdata[key].value
      }

      //check if data is valid
      for (let key in this.state.formdata){
        formIsValid = this.state.formdata[key].valid && formIsValid
      }

      if (formIsValid){
        this.setState({
          loading: true,
          registerError: ''
        })

        if (type){
          firebase.auth()
          .signInWithEmailAndPassword(dataToSubmit.email, dataToSubmit.password)
          .then(() => {
            this.props.history.push('/')  //redirect user to home
          })
          .catch(err => {
            this.setState({
              loading: false,
              registerError: err.message
            })
          })
        }
        else {
          firebase.auth()
          .createUserWithEmailAndPassword(dataToSubmit.email, dataToSubmit.password)
          .then(() => {
            this.props.history.push('/')  //redirect user to home
          })
          .catch(err => {
            this.setState({
              loading: false,
              registerError: err.message
            })
          })
        }
      }
    }
  }

  showRegisterError = () => (
    this.state.registerError !== '' ? <div className={style.error}>{this.state.registerError}</div>
                                    : ''
  )

  render() {
    return (
      <div className={style.logContainer}>
        <form onSubmit={(event) => this.submitForm(event,null)}>
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

          {this.submitButton()}
          {this.showRegisterError()}
        </form>
      </div>
    )
  }

}

export default Signin
