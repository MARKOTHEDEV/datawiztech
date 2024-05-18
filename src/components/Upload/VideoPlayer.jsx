import React, { useState } from "react";
import ReactPlayer from "react-player";
import "./VideoPlayer.css";
import playpause from "../../assets/images/frame-404-p57.png"

function CustomControlsVideoPlayer() {
  const [playing, setPlaying] = useState(false);
  if(playing){
    
  }

  return (
    <div className="react-player-component position-relative">
      <ReactPlayer
        url="<https://www.youtube.com/watch?v=aL27fX5kv9U>"
        playing={playing}
        className="w-100 h-100"
      />
      {/* <button onClick={() => setPlaying(!playing)}>
        {playing ? "Pause" : "Play"}
      </button> */}
      <div className={`play-btn-container ${playing?"active":""}`}  onClick={() => setPlaying(!playing)}>
        <img class="playpausebtn" src={playpause} alt=".."/>
      </div>
    </div>
  );
}

export default CustomControlsVideoPlayer;
