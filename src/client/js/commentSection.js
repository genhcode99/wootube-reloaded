const { default: fetch } = require("node-fetch");
const { async } = require("regenerator-runtime");
const { default: Video } = require("../../models/Video");


//--------------------< import >--------------------
const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const textarea = form.querySelector("textarea");
const video__comment = document.querySelector(".video__comment")
const deleteComment = document.querySelector(".delete-comment");


//--------------------< Create Fake Comment >--------------------
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
//--------------------< Delete Fake Comment >--------------------
const deleteFakeComment = (deletedCommentId) => {
  // const fakeComment = document.querySelectorAll(`[data-id="${deletedCommentId}]"`);
  // fakeComment.remove();
  location.reload();
};

//--------------------< Create Comment >--------------------
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


//--------------------< Delete Comment >--------------------
const handleDeleteComment = async () => {
  const userId = deleteComment.dataset.id;
  const commentId = video__comment.dataset.id;
  const response = await fetch(`/api/comment/${commentId}`,{
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({userId})
  });
  if(response.status === 200){
    const {deletedCommentId} = await response.json();
    location.reload();
  }
};

//--------------------< Event Listening >--------------------
form.addEventListener("submit", handleSubmit);
deleteComment.addEventListener("click", handleDeleteComment);

