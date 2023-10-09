const postInput = document.getElementById("postInput");
const shareBtn = document.getElementById("shareBtn");
const commentsList = document.getElementById("commentsList");
const apiUrl = "https://blog-api-t6u0.onrender.com/posts/";

//-------------------API Method-----------//

async function getPosts() {
  try {
    let response = await fetch(apiUrl, {
      method: "GET",
    });
    let data = await response.json();
    return data;
  } catch (error) {
    console.log("Error: " + error);
  }
}

// POST function
async function postComment(form) {
  try {
    let response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    let data = await response.json();
    return data;
  } catch (error) {
    console.log("Error: " + error);
  }
}

window.onload = async function () {
  console.log("Page loaded"); 
  try {
    const posts = await getPosts();
    console.log("Posts retrieved:", posts); 
    renderComments(posts); 
  } catch (error) {
    console.error("Error on page load:", error); 
  }
};


function createComment(text, time) {
  const commentItem = document.createElement("li");
  commentItem.classList.add("userComment");

  const pAuthor = document.createElement("p");
  pAuthor.textContent = "Anonymous";

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

shareBtn.addEventListener("click", async function () {
  const commentText = postInput.value.trim();
  if (commentText !== "") {
    const currentTime = new Date();
    const newComment = createComment(commentText, currentTime);
    commentsList.appendChild(newComment); 
    postInput.value = "";

    
    await postComment({ text: commentText, timestamp: currentTime });
  }
});

postInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    shareBtn.click();
  }
});

async function renderComments(posts) {

  commentsList.innerHTML = "";

  
  const comments = await getPosts();

  comments
    .filter((item) => item.id > 100) 
    .reverse() 
    .forEach((item) => {
      const newComment = createComment(item.text, item.timestamp);
      commentsList.appendChild(newComment);
    });
}
