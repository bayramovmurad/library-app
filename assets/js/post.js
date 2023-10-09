
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


//-------------------Format Time-----------//

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


//-------------------Buttons-----------//
shareBtn.addEventListener("click", function () {
  const commentText = postInput.value.trim();
  if (commentText !== "") {
    const currentTime = new Date();
    const newCommentList = createComment(commentText, currentTime);
    commentsContainer.appendChild(newCommentList);
    postInput.value = "";
  }
});

postInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    shareBtn.click();
  }
});



//-------------------API Method-----------//
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

window.onload = async function () {
  const posts = await getPosts();
  renderPosts(posts);
};

function renderPosts(posts) {
  const commentsList = commentsContainer.querySelector("ul"); 

  commentsList.innerHTML = '';
  posts
    .filter((el) => el.id > 100)
    .reverse()
    .forEach((el) => {
      const commentItem = createComment(el.text, el.time);
      commentsList.appendChild(commentItem);
    });
}


