import React from 'react'
import {distanceInWords} from 'date-fns'
import Player from './player'
import {soundCloudClientId as clientId} from '../config'

export default ({actions, meta, posts} = {}) => (
  <ul className='posts'>
    {
      posts.map((post) => {
        const id = post.get('id')
        const title = post.get('title')
        const songUrl = post.getIn(['meta', 'url'])
        const composer = post.getIn(['meta', 'composer'])
        const composerDetails = post.getIn(['meta', 'composerDetails'])
        const performer = post.getIn(['meta', 'performer'])
        const recordedAt = post.getIn(['meta', 'recordedAt'])
        const date = distanceInWords(new Date(recordedAt), Date.now())
        const isCurrentPlayingSong = meta.currentPlayingId === id
        const songAlreadyPlayed = meta.endedList.includes(id)

        return (
          <li className='post' key={id}>
            <div className='post-left'>
              <Player
                clientId={clientId}
                resolveUrl={songUrl}
                onStartTrack={() => actions.play(id)}
                onPauseTrack={() => actions.pause(id)}
                onStopTrack={() => actions.end(id)}
                isPlaying={isCurrentPlayingSong}
                alreadyPlayed={songAlreadyPlayed}
              />
            </div>

            <div className='post-right'>
              <h3>{title}</h3>
              <span>Composer: {composer} {composerDetails}</span>
              <span>Performer: {performer}</span>
              <em>Recorded {date} ago</em>
            </div>
          </li>
        )
      })
    }
  </ul>
)
