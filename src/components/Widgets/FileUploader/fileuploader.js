import React, { Component } from 'react'
import { firebase } from '../../../firebase/firebase'
import FileUploader from 'react-firebase-file-uploader'

class Uploader extends Component {

  state = {
    name: '',
    isUploading: false,
    progress: 0,
    fileUrl: ''
  }

  handleUploadStart = () => {
    this.setState({
      isUploading: true,
      progress:0
    })
  }

  handleUploadError = (error) => {
    this.setState({
      isUploading: false
    })

    alert(error)
  }

  handleUploadSuccess = (filename) => {

    //pass filename to parent component through props
    this.props.filename(filename)

    this.setState({
      name: filename,
      progress: 100,
      isUploading: false
    })

    firebase.storage().ref('images')
    .child(filename)
    .getDownloadURL()
    .then((fileUrl) => {
      this.setState({
        fileUrl
      })
    })
  }

  handleProgress = (progress) => {
    this.setState({
      progress
    })
  }

  render() {
    return (
      <div>
        <FileUploader
          accept="image/*"
          name="image"
          randomizeFilename
          storageRef={firebase.storage().ref('images')}
          onUploadStart={this.handleUploadStart}
          onUploadError={this.handleUploadError}
          onUploadSuccess={this.handleUploadSuccess}
          onProgress={this.handleProgress}
        />

        { this.state.isUploading ? <p>Progress: {this.state.progress}</p>
                                 : null }

        { this.state.fileUrl ? <img style = {{width: '300px'}} src={this.state.fileUrl} alt="uploaded-content"/>
                             : null }

      </div>
    )
  }

}

export default Uploader
