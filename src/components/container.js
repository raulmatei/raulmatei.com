import React from 'react'
import {format, distanceInWords} from 'date-fns'
import {connect} from 'react-redux'
import {compose} from 'redux'
import Player from './player'
import {
  firebaseConnect,
  isLoaded,
} from 'react-redux-firebase'

import {
  play,
  pause,
  end,
} from '../modules/operations/actions'
import { SoundPlayerContainer  } from 'react-soundplayer/addons'

const clientId = 'd5f59cb45845f472b0ae966c6dd23bd7'
const COPYRIGHT = `\u00A9 2008 – ${format(Date.now(), 'YYYY')} Raul Matei`

const Container = (props) => {
  const {
    operations,
    posts,
  } = props

  const currentPlayingId = operations.playing
  const endedList = operations.ended

  return (
    <section className='container'>
      <h1>Out of this world</h1>
      <ul className='posts'>
        {
          isLoaded(posts) ?
            posts.map((post) => {
              const id = post.get('id')
              const title = post.get('title')
              const songUrl = post.getIn(['meta', 'url'])
              const composer = post.getIn(['meta', 'composer'])
              const composerDetails = post.getIn(['meta', 'composerDetails'])
              const performer = post.getIn(['meta', 'performer'])
              const recordedAt = post.getIn(['meta', 'recordedAt'])

              const date = distanceInWords(new Date(recordedAt), Date.now())

              const isCurrentPlayingSong = currentPlayingId === id
              const songAlreadyPlayed = endedList.includes(id)

              return (
                <li className='post' key={id}>
                  <div className='post-left'>
                    <Player
                      clientId={clientId}
                      resolveUrl={songUrl}
                      onStartTrack={() => play(id)}
                      onPauseTrack={() => pause(id)}
                      onStopTrack={() => end(id)}
                      isPlaying={isCurrentPlayingSong}
                      alreadyPlayed={songAlreadyPlayed}
                    />
                  </div>
                  <div className='post-right'>
                    <h3>{title}</h3>
                    <span>Composer: {composer} {composerDetails}</span>
                    <span>Performer: {performer}</span>
                    <span>Recorded {date}</span>
                  </div>
                </li>
              )
            }) : (
              <div className='sk-wave'>
                <div className='sk-rect sk-rect1'/>
                <div className='sk-rect sk-rect2'/>
                <div className='sk-rect sk-rect3'/>
                <div className='sk-rect sk-rect4'/>
                <div className='sk-rect sk-rect5'/>
              </div>
            )
        }
      </ul>

      <footer>
        {COPYRIGHT}
      </footer>
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
