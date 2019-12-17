import React, {useState, useEffect} from 'react';
import './App.css';

import videoService from './services/videoService';

class IframeContainer extends React.Component<{}, {showIframe: Boolean}> {
  constructor(props:any) {
    super(props);
    this.state = {
      showIframe: false
    };
  }
  
  componentDidMount() {
    this.setState({showIframe: true});
    simulateClick.current.click();
  }
  
  render() {
    const { showIframe } = this.state;
    const simulateClick = React.useRef(null);
    return (
      <div>
        { showIframe && 
          <iframe id="iframe" ref={simulateClick} width="640" height="360" src="https://mega.nz/embed#!EAFAgAIb!LlN5T-Omtn656m8HhA0AqyIxYmVj1BRPB9lHGOHC6eo"></iframe>
        }
      </div>
    );
  }
}

const App: React.FC = () => {
  const [videos, setvideos] = useState(null);
  useEffect(() => {
    if(!videos) {
      getVideos();
    }
  });

  const getVideos = async () => {
    let res = await videoService.getAll();
    console.log(res);
    setvideos(res);
  }
  const renderVideo = (video: any) => {
    return (
      <li key={video._id} className="list__item video">
        <h3 className="video__name">{video.name}</h3>
        <p className="video__link">{video.link}</p>
        <IframeContainer />
      </li>
    );
  };

  return (
    <div className="App">
      <ul className="list">
        {(videos && videos.length > 0) ? (
          videos.map((video: any) => renderVideo(video))
        ) : (
          <p>No videos found</p>
        )}
      </ul>
    </div>
  );
}

export default App;
