import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

import videoService from './services/videoService';

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
