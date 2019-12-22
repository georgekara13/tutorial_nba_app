import React, { Component } from 'react'
import ReactLoading from 'react-loading';
import FormFields from '../Widgets/FormFields/formfields'
import config from './config.json'
import style from './dashboard.module.css'

import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'

class Dahboard extends Component {

  state = {
    editorState: EditorState.createEmpty(),
    ...config
}
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

    if(element.validation.required){
      const valid   = element.value.trim() !== ''
      const message = `${!valid ? 'This field is required' : ''}`
      error         = !valid ? [valid, message] : error
    }

    return error
  }

  submitForm = (event) => {
    event.preventDefault()

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

    console.log(dataToSubmit)

    if (formIsValid){
      console.log('is valid')
    }
    else{
      this.setState({
        postError: 'Something went wrong'
      })
    }
  }

  submitButton = () => (
    this.state.loading ? <ReactLoading type={'spin'} color={'#03a9f4'} height={167} width={75} />
                       : <div>
                            <button type="submit">Add post</button>
                         </div>
  )

  showPostError = () => (
    this.state.postError !== '' ? <div className={style.error}>{this.state.postError}</div>
                                    : ''
  )

  onEditorStateChange = (editorState) => {

    let contentState = editorState.getCurrentContent()
    let rawState     = convertToRaw(contentState)

    //convert json contents of wysiwyg editor to raw html
    let html = stateToHTML(contentState)

    this.setState({
      editorState
    })
  }

  render() {
    return (
      <div className={style.postContainer}>
        <form onSubmit={this.submitForm}>
          <h2>Add post</h2>

          Author
          <FormFields
            id={'author'}
            formdata={this.state.formdata.author}
            change={(element) => this.updateForm(element)}
          />

          Post title
          <FormFields
            id={'title'}
            formdata={this.state.formdata.title}
            change={(element) => this.updateForm(element)}
          />

          <Editor
            editorState = {this.state.editorState}
            wrapperClassName = "myEditor-wrapper"
            editorClassName = "myEditor-editor"
            onEditorStateChange = {this.onEditorStateChange}
          />

          {this.submitButton()}
          {this.showPostError()}
        </form>
      </div>
    )
  }

}

export default Dahboard
