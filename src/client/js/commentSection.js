//--------------------< import >--------------------
const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const textarea = form.querySelector("textarea");
const button = form.querySelector("button");


//--------------------< Function >--------------------
const handleSubmit = (event) => {
  event.preventDefault();
  const text = textarea.value;
  const video = videoContainer.dataset.id;
  
}


//--------------------< Event Listening >--------------------
form.addEventListener("submit", handleSubmit);
