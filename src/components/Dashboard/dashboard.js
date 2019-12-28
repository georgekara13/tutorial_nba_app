import React, { Component } from 'react'
import ReactLoading from 'react-loading';
import FormFields from '../Widgets/FormFields/formfields'
import config from './config.json'
import style from './dashboard.module.css'
import { firebase, firebaseTeams, firebaseArticles } from '../../firebase/firebase'

import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'

import Uploader from '../Widgets/FileUploader/fileuploader'

class Dahboard extends Component {

  state = {
    editorState: EditorState.createEmpty(),
    ...config
  }

  componentDidMount(){
    this.loadTeams()
  }

  loadTeams = () => {
    firebaseTeams.once('value')
    .then((snapshot) => {
      let teams = []
      snapshot.forEach((childSnapshot) => {
        teams.push({
          id: childSnapshot.val().teamId,
          name: childSnapshot.val().city
        })
      })
      const newFormData = {...this.state.formdata}
      const newElement  = {...newFormData['team']}

      newElement.config.options = teams
      newFormData['team'] = newElement

      this.setState({
        formdata: newFormData
      })
    })
  }

  updateForm = (element, content = "") => {
    const newFormData = {
      ...this.state.formdata
    }

    const newElement = {
      ...newFormData[element.id]
    }

    if(content === ""){
      //capture input from textfield
      newElement.value = element.event.target.value
    }
    else {
      newElement.value = content
    }

    //split tags input into array elements
    if (element.id === 'tags'){
      newElement.value = newElement.value.split(',')
    }

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
      this.setState({
        loading: true,
        postError: ''
      })

      firebaseArticles.orderByChild('id').limitToLast(1).once('value')
      .then( snapshot => {
        let articleId = 0
        snapshot.forEach(childSnapshot => {
          articleId = childSnapshot.val().id
        })

        dataToSubmit['date'] = firebase.database.ServerValue.TIMESTAMP
        dataToSubmit['id']   = articleId + 1
        dataToSubmit['team'] = parseInt(dataToSubmit['team'])

        firebaseArticles.push(dataToSubmit)
        .then(article => {
          //redirect user to article after submitting data
          this.props.history.push(`/articles/${article.key}`)
        })
        .catch( error => {
          this.setState({
            postError: error.message
          })
        })
      })
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

    this.updateForm({id: 'body'},html)

    this.setState({
      editorState
    })
  }

  //get filename from Uploader component
  storeFileName = (filename) => {
    this.updateForm({id: 'image'},filename)
  }

  render() {
    return (
      <div className={style.postContainer}>
        <form onSubmit={this.submitForm}>
          <h2>Add post</h2>

          <Uploader
            filename={ (filename) => this.storeFileName(filename) }
          />

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

          Tags
          <FormFields
            id={'tags'}
            formdata={this.state.formdata.tags}
            change={(element) => this.updateForm(element)}
          />

          Team
          <FormFields
            id={'team'}
            formdata={this.state.formdata.team}
            change={(element) => this.updateForm(element)}
          />

          {this.submitButton()}
          {this.showPostError()}
        </form>
      </div>
    )
  }

}

export default Dahboard
