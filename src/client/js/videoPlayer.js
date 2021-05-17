//-----< Import to World >----
const video = document.querySelector("video")


//-----< Play and Pause >-----
// # import
const playBtn = document.getElementById("play");

// # play and pause
const handlePlayClick = (event) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtn.innerText = video.paused ? "Play" : "Pause";
};

playBtn.addEventListener("click", handlePlayClick);



//-----< Sound >-----
// # import
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
let volumeValue = 0.5;
video.volume = volumeValue;

// # mute
const handleMute = (event) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtn.innerText = video.muted ? "Unmute" : "Mute";
  volumeRange.value = video.muted ? 0 : volumeValue;
};

muteBtn.addEventListener("click", handleMute);

// # volume controll
const handleVolumeChange = (event) => {
  const value = event.target.value;

  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = "Mute";
  }
  volumeValue = value;
  video.volume = value;
};

volumeRange.addEventListener("input", handleVolumeChange);

//-----< Video TimeLine >-----
// # import
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen")
const videoContainer = document.getElementById("videoContainer");

// # timeLine
const formatTime = (seconds) => new Date(seconds * 1000).toISOString().substr(11, 8);
const handleLoadedmetadata = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  //Math.floor : 소수점 아래를 버림 한다. Math.ceil : 소수점 아래를 올림 한다.
  timeline.max = video.duration;
};
const handleTimeUpdate = () => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};
const handleTimelineChange = (event) => {
  const value = event.target.value;
  video.currentTime = value;
};

video.addEventListener("loadedmetadata", handleLoadedmetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
timeline.addEventListener("input", handleTimelineChange);

// # full screen
const handleFullscreen = () => {
  const fullScreen = document.fullscreenElement;
  if (fullScreen) {
    document.exitFullscreen();
    fullScreenBtn.innerText = "Enter Full Screen"
  } else {
    videoContainer.requestFullscreen();
    fullScreenBtn.innerText = "Exit Full Screen";
  }
};

fullScreenBtn.addEventListener("click", handleFullscreen);

//--------------------