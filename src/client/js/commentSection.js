const { default: fetch } = require("node-fetch");
const { async } = require("regenerator-runtime");
const { default: Video } = require("../../models/Video");


//--------------------< import >--------------------
const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const textarea = form.querySelector("textarea");
const deleteComment = document.getElementById("delete-comment");


const addFakeComment = ( text, id ) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment"
  const icon = document.createElement("i")
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText=` ${text}`
  const span2 = document.createElement("span")
  span2.innerText="❌"
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  videoComments.prepend(newComment);
}


//--------------------< Function >--------------------
const handleSubmit = async (event) => {
  event.preventDefault();
  const videoId = videoContainer.dataset.id;
  const text = textarea.value;
  if(text === ""){
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`,{
    method: "POST",
    headers:{
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text })
  });
  
  if(response.status === 201){
    const { newCommentId } = await response.json();
    addFakeComment(text, newCommentId);
    textarea.value = "";
  }
};


//--------------------< Event Listening >--------------------
form.addEventListener("submit", handleSubmit);


