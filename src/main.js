import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import configureStore from './configureStore'
import './styles/application.less'

export function initialize(Component, options = {}) {
  const store = configureStore()

  render((
      <Provider store={store}>
        <Component {...options}/>
      </Provider>
  ), document.getElementById('root'))
}
