import React, {Component} from 'react'
import {PlayButton, Progress, Timer} from 'react-soundplayer/components'
import { withCustomAudio } from 'react-soundplayer/addons';

class Player extends Component {
  play() {
    let {
      playing,
      soundCloudAudio,
    } = this.props

    if (playing) {
      soundCloudAudio.pause()
    } else {
      soundCloudAudio.play()
    }
  }

  render() {
    const {
      songUrl,
      playing,
      currentTime,
      duration,
      alreadyPlayed
    } = this.props

    const value = alreadyPlayed ? 100 : (currentTime / duration * 100 || 0)

    return (
      <div className='player-wrapper'>
        {
          playing ?
            <Timer
              className='player-time'
              duration={duration}
              currentTime={currentTime}
            /> : null
        }

        <PlayButton
          className='player'
          playing={playing}
          onTogglePlay={this.play.bind(this)}
        />

        <Progress
          className='player-progress'
          innerClassName='player-progress-inner'
          value={value}
          style={{}}
          innerStyle={{}}
        />
      </div>
    )
  }
}

export default withCustomAudio(Player)
