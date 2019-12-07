import * as firebase from 'firebase'

import FirebaseConfig from './firebase.json'

firebase.initializeApp(FirebaseConfig)

const firebaseDB       = firebase.database()
const firebaseArticles = firebaseDB.ref('articles')
const firebaseTeams    = firebaseDB.ref('teams')
const firebaseVideos   = firebaseDB.ref('videos')

const firebaseLoopContent = (snapshot) => {
  const data = []
  snapshot.forEach((child) => {
    data.push({
      ...child.val(),
      id: child.key
    })
  })

  return data
}

export {
  firebase,
  firebaseDB,
  firebaseArticles,
  firebaseVideos,
  firebaseTeams,
  firebaseLoopContent
}
