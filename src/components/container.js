import React from 'react'
import {connect} from 'react-redux'
import {compose, bindActionCreators} from 'redux'
import * as operationsActions from '../modules/operations/actions'
import ActivityIndicator from './activity-indicator'
import Header from './header'
import Footer from './footer'
import Posts from './posts'

import {
  firebaseConnect,
  isLoaded,
} from 'react-redux-firebase'


const Container = ({
  dispatch,
  operations,
  posts,
} = {}) => {
  const currentPlayingId = operations.playing
  const endedList = operations.ended
  const actions = bindActionCreators(operationsActions, dispatch)
  const hasPosts = isLoaded(posts)

  const meta = {
    currentPlayingId,
    endedList,
  }

  return (
    <section className='container'>
      <Header/>

      {
        hasPosts ? (
          <Posts
            actions={actions}
            meta={meta}
            posts={posts}
          />
        ) : (
          <ActivityIndicator/>
        )
      }

      <Footer/>
    </section>
  )
}

Container.defaultProps = {
  operations: {},
}

export default compose(
  firebaseConnect(['posts']),
  connect((state) => ({
    operations: state.operations,
    posts: state.firebase.getIn(['data','posts']),
  }))
)(Container)
