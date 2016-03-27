import React from 'react';
import frux from 'frux';
import moment from 'moment';
import Player from './player';
import { SoundPlayerContainer  } from 'react-soundplayer/addons';

const clientId = 'd5f59cb45845f472b0ae966c6dd23bd7';
const COPYRIGHT = `\u00A9 2008 – ${moment().format('YYYY')} Raul Matei`;

const Container = (props) => {
  const { posts } = props;

  return (
    <section className='container'>
      <h1>Out of this world</h1>
      <ul className='posts'>
        {
          posts.map((post) => {
            const id = post.get('id');
            const title = post.get('title');
            const songUrl = post.getIn(['meta', 'url']);
            const composer = post.getIn(['meta', 'composer']);
            const composerDetails = post.getIn(['meta', 'composerDetails']);
            const performer = post.getIn(['meta', 'performer']);
            const recorderAt = post.getIn(['meta', 'recorderAt']);

            const date = moment(recorderAt, 'YYYYMMDD').fromNow();

            return (
              <li className='post' key={id}>
                <div className='post-left'>
                  <SoundPlayerContainer
                    clientId={clientId}
                    resolveUrl={songUrl}
                  >
                    <Player/>
                  </SoundPlayerContainer>
                </div>
                <div className='post-right'>
                  <h3>{title}</h3>
                  <span>Composer: {composer} {composerDetails}</span>
                  <span>Performer: {performer}</span>
                  <span>Recorded {date}</span>
                </div>
              </li>
            );
          })
        }
      </ul>
      <footer>{COPYRIGHT}</footer>
    </section>
  );
};

Container.displayName = 'Container';

Container.defaultProps = {
  posts: []
};

Container.getDataBindings = (getters) => ({
  posts: getters.posts.postsData
});

export default frux.connect(Container);