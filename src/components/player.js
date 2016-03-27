import React, { Component } from 'react';
import { PlayButton, Progress } from 'react-soundplayer/components';

class Player extends Component {
  play() {
    let { soundCloudAudio, playing } = this.props;

    if (playing) {
      soundCloudAudio.pause();
    } else {
      soundCloudAudio.play();
    }
  }

  render() {
    const {
      songUrl,
      playing,
      soundCloudAudio,
      currentTime,
      duration
    } = this.props;
    const value = currentTime / duration * 100 || 0;

    return (
      <div className='player-wrapper'>
        <PlayButton
          className='player'
          playing={playing}
          onTogglePlay={this.play.bind(this)}
        />
        <Progress
          className='player-progress'
          innerClassName='player-progress-inner'
          value={value}
          soundCloudAudio={soundCloudAudio}
        />
      </div>
    );
  }
}

export default Player;
