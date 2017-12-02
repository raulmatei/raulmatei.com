import 'react-hot-loader/patch';
import 'babel-polyfill'
import * as main from './src/main'
import Container from './src/components/container'

main.initialize(Container)

if (module.hot) {
  module.hot.accept('./src/components/container', () => {
    main.initialize(Container)
  })
}
