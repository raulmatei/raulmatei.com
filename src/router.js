import React from 'react'
import {Router} from 'react-router'
import {Provider} from 'react-redux'
import routes from './routes'
import {AppContainer} from 'react-hot-loader'

export function initializeRouter(props, store) {
  return (
    <AppContainer>
      <Provider store={store}>
        <Router {...props}>
          {routes}
        </Router>
      </Provider>
    </AppContainer>
  )
}

initializeRouter.displayName = 'RouterInitializer'