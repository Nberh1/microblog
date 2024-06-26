// "use strict"
// document.addEventListener("DOMContentLoaded", function () {
//   const likeBtn = document.querySelector(".like-btn");
//   let isLiked = false;

//   likeBtn.addEventListener("click", function () {
//     isLiked = !isLiked;
//     if (isLiked) {
//       likeBtn.innerHTML = '<i class="fas fa-heart fa-lg"></i>';
//       likeBtn.classList.add("text-danger");
//     } else {
//       likeBtn.innerHTML = '<i class="far fa-heart fa-lg"></i>';
//       likeBtn.classList.remove("text-danger");
//     }
//   });
// });

// document.addEventListener("DOMContentLoaded", function () {
//   const commentForm = document.querySelector("form");
//   const commentInput = document.querySelector(".comment-input");
//   const commentsSection = document.querySelector(".comments");

//   commentForm.addEventListener("submit", function (event) {
//     event.preventDefault();
//     const commentText = commentInput.value.trim();
//     if (commentText !== "") {
//       const commentMarkup = `<p><strong>username:</strong> ${commentText}</p>`;
//       commentsSection.innerHTML += commentMarkup;
//       commentInput.value = "";
//     }
//   });
// });

// No need for "use strict" in modern JavaScript, it's enabled by default in ES6 modules and scripts.

// Define the token (replace with your actual token)
"use strict";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik5hdGhhbmllbEBnbWFpbC5jb20iLCJpYXQiOjE3MTkzNzQ5NDQsImV4cCI6MTcxOTQ2MTM0NH0.r7aHpsmmuv32PvWlKlmoVoWSn6nBwpgMuKitbEyOWHg";

document.addEventListener("DOMContentLoaded", function () {
  const postsContainer = document.getElementById("postsContainer");
  const logoutButton = document.getElementById("logoutButton");

  logoutButton.addEventListener("click", function () {
    logout();
  });

  fetch(`${apiBaseURL}/api/posts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((posts) => {
      posts.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.className = "post";
        postElement.innerHTML = `
          <div class="card mb-3">
            <div class="card-body">
              <h5 class="card-title">${post.username}</h5>
              <p class="card-text">${post.text}</p>
              <p class="card-text"><small class="text-muted">${new Date(
                post.createdAt
              ).toLocaleString()}</small></p>
            </div>
          </div>
        `;
        postsContainer.appendChild(postElement);
      });
    })
    .catch((error) => {
      console.error("Error fetching posts:", error);
    });
});

