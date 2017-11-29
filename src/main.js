import {compose, applyMiddleware, combineReducers, createStore} from 'redux'
import React from 'react'
import {render} from 'react-dom'
import {browserHistory} from 'react-router'
import {initializeRouter} from './router'
import reducers from './reducers'
import data from './resources/posts.json'
import {loadPosts} from './modules/posts/actions'
import './styles/application.less'

const environment = process.env.NODE_ENV

const middlewares = [

]

if (environment === 'development') {
  const createLogger = require('redux-logger').createLogger

  middlewares.push(createLogger({
    collapsed: true,
  }))
}

const storeMiddlewares = compose(applyMiddleware(...middlewares))
const store = createStore(combineReducers(reducers), storeMiddlewares)

export function initialize(options) {
  const history = browserHistory
  const router = initializeRouter({history}, store)

  store.dispatch(loadPosts(data))
  render(router, document.getElementById('root'))
}
