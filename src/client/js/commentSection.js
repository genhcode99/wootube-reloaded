const { default: fetch } = require("node-fetch");
const { async } = require("regenerator-runtime");
const { default: Video } = require("../../models/Video");

//--------------------< import >--------------------
const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const textarea = form.querySelector("textarea");

const addFakeComment = (text) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.className = "video__comment"
  const icon = document.createElement("i")
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText=` ${text}`
  newComment.appendChild(icon);
  newComment.appendChild(span);
  videoComments.prepend(newComment);
}


//--------------------< Function >--------------------
const handleSubmit = async (event) => {
  event.preventDefault();
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if(text === ""){
    return;
  }
  const { status } = await fetch(`/api/videos/${videoId}/comment`,{
    method: "POST",
    headers:{
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text })
  });
  
  textarea.value = "";
  if(status === 201){
    addFakeComment(text);
  }
};

//--------------------< Event Listening >--------------------
form.addEventListener("submit", handleSubmit);

