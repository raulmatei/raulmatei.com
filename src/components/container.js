import React from 'react'
import {format, distanceInWords} from 'date-fns'
import {connect} from 'react-redux'
import Player from './player'
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
          posts.map((post) => {
            const id = post.id
            const title = post.title
            const songUrl = post.meta.url
            const composer = post.meta.composer
            const composerDetails = post.meta.composerDetails
            const performer = post.meta.performer
            const recordedAt = post.meta.recordedAt

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
          })
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
  posts: [],
}

export default connect((state) => ({
  operations: state.operations,
  posts: state.posts.data,
}))(Container)
