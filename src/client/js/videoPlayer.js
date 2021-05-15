//-----< Import to World >----
const video = document.querySelector("video")
const time = document.getElementById("time");



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