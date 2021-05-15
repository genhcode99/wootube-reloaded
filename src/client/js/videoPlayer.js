//-----< Import to World >----
const video = document.querySelector("video")
const time = document.getElementById("time");

//-----< Play and Pause >-----
const playBtn = document.getElementById("play");

const handlePlayClick = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtn.innerText = video.paused ? "Play" : "Pause";
};

playBtn.addEventListener("click", handlePlayClick);


//-----< Sound >-----
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
// # mute
const handleMute = (e) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtn.innerText = video.muted ? "Unmute" : "Mute";
  volumeRange.value = video.muted ? 0 : 0.5;
};

muteBtn.addEventListener("click", handleMute);

// # volume controll