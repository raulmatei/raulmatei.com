import operations from '../modules/operations'
import {firebaseStateReducer} from 'react-redux-firebase'

export default {
  firebase: firebaseStateReducer,
  operations,
}
