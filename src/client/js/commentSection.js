const { default: fetch } = require("node-fetch");
const { async } = require("regenerator-runtime");

//--------------------< import >--------------------
const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const textarea = form.querySelector("textarea");


//--------------------< Function >--------------------
const handleSubmit = async (event) => {
  event.preventDefault();
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if(text === ""){
    return;
  }
  await fetch(`/api/videos/${videoId}/comment`,{
    method: "POST",
    headers:{
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text })
  });
  textarea.value = "";
};

//--------------------< Event Listening >--------------------
form.addEventListener("submit", handleSubmit);

