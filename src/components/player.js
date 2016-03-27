import React, { Component } from 'react';
import { PlayButton, Progress } from 'react-soundplayer/components';

class Player extends Component {
  state = { playing: false };

  // TODO: add audio player module
  play() {
    let { soundCloudAudio, playing } = this.props;

    if (playing) {
      soundCloudAudio.pause();
      this.state.playing = false;
    } else {
      soundCloudAudio.play();
      this.state.playing = true;
    }

    this.setState(this.state);
  }

  render() {
    const { songUrl } = this.props;

    return (
      <div className='player-wrapper'>
        <PlayButton
          className='player'
          playing={this.state.playing}
          onTogglePlay={this.play.bind(this)}
        />
        <Progress
          className='player-progress'
          innerClassName='player-progress-inner'
        />
      </div>
    );
  }
}

export default Player;
