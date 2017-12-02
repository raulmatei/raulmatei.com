import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {AppContainer} from 'react-hot-loader'
import configureStore from './configureStore'
import './styles/application.less'

export function initialize(Component, options = {}) {
  const store = configureStore()

  render((
    <AppContainer>
      <Provider store={store}>
        <Component {...options}/>
      </Provider>
    </AppContainer>
  ), document.getElementById('root'))
}
