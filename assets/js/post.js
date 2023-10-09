const postInput = document.getElementById("postInput");
const shareBtn = document.getElementById("shareBtn");
const commentsContainer = document.getElementById("commentsContainer");
const apiUrl = "https://blog-api-t6u0.onrender.com/posts/";



function createComment(text, time) {
    const commentItem = document.createElement("li");
    commentItem.classList.add("userComment");

    const pAuthor = document.createElement("p");
    pAuthor.textContent = "Anonym";

    const spanTime = document.createElement("span");
    spanTime.textContent = formatTimeToDisplay(time);

    const pText = document.createElement("p");
    pText.textContent = text;

    commentItem.appendChild(pAuthor);
    commentItem.appendChild(spanTime);
    commentItem.appendChild(pText);

    return commentItem;
}


//---------------------Local Storage--------------//

function saveCommentsToLocalStorage(comments) {
  localStorage.setItem("comments", JSON.stringify(comments));
}

function getCommentsFromLocalStorage() {
  const storedComments = localStorage.getItem("comments");
  return storedComments ? JSON.parse(storedComments) : [];
}

//---------------------Time Format--------------//
function formatTimeToDisplay(date) {
  const currentTime = new Date();
  const currentDate = new Date(date);

  if (currentTime.toDateString() === currentDate.toDateString()) {
    return `${currentDate.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    })} today`;
  } else {
    return `${currentDate.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    })} on ${currentDate.toLocaleDateString()}`;
  }
}

window.onload = function () {
  const comments = getCommentsFromLocalStorage();
  comments.forEach((comment) => {
    const newCommentList = createComment(comment.text, comment.time);
    commentsContainer.appendChild(newCommentList);
  });
};


//---------------------Buttons--------------//

shareBtn.addEventListener("click", function () {
  const commentText = postInput.value.trim();
  if (commentText !== "") {
    const currentTime = new Date();
    const newCommentList = createComment(commentText, currentTime);
    commentsContainer.appendChild(newCommentList);
    postInput.value = "";

    const comments = getCommentsFromLocalStorage();
    comments.push({ text: commentText, time: currentTime });
    saveCommentsToLocalStorage(comments);
  }
});

postInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    shareBtn.click();
  }
});




//---------------------API METHOD--------------//
async function getPosts() {
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error: " + error);
  }
}

async function createPost(form) {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error: " + error);
  }
}


