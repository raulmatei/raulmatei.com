import {compose, applyMiddleware, combineReducers, createStore} from 'redux'
import React from 'react'
import {render} from 'react-dom'
import {browserHistory} from 'react-router'
import {initializeRouter} from './router'
import reducers from './reducers'
import {reactReduxFirebase} from 'react-redux-firebase'
import './styles/application.less'

const environment = process.env.NODE_ENV

const firebaseConfig = {
  apiKey: 'AIzaSyCi6gidjQJUM-2-ue4QHKWwIiK3lQVlVW8',
  authDomain: 'raulmatei.firebaseapp.com',
  databaseURL: 'https://raulmatei.firebaseio.com',
  messagingSenderId: '651742458949',
  projectId: "project-7110385915804345168",
  storageBucket: 'project-7110385915804345168.appspot.com',
}

const reduxFirebaseConfig = { posts: 'posts' }
const middlewares = []

if (environment === 'development') {
  const createLogger = require('redux-logger').createLogger

  middlewares.push(createLogger({
    collapsed: true,
  }))
}

const storeMiddlewares = compose(
  reactReduxFirebase(firebaseConfig, reduxFirebaseConfig),
  applyMiddleware(...middlewares)
)

const store = createStore(combineReducers(reducers), storeMiddlewares)

export function initialize(options) {
  const history = browserHistory
  const router = initializeRouter({history}, store)

  render(router, document.getElementById('root'))
}
