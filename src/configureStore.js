import reducers from './reducers'
import {reactReduxFirebase} from 'react-redux-firebase'

import {
  firebase,
  reduxFirebase,
} from './config'

import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from 'redux'

const environment = process.env.NODE_ENV

export default function configureStore() {
  const middlewares = []

  if (environment === 'development') {
    const createLogger = require('redux-logger').createLogger

    middlewares.push(createLogger({
      collapsed: true,
    }))
  }

  const storeMiddlewares = compose(
    reactReduxFirebase(firebase, reduxFirebase),
    applyMiddleware(...middlewares)
  )

  return createStore(combineReducers(reducers), storeMiddlewares)
}
