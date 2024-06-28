"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const postsContainer = document.getElementById("postsContainer");
  const logoutButton = document.getElementById("logoutButton");
  const loginData = getLoginData();

  logoutButton.addEventListener("click", function () {
    logout();
  });

  fetch(`${apiBaseURL}/api/posts`, {
    headers: {
      Authorization: `Bearer ${loginData.token}`,
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
        const postElement = createPostElement(post);
        postsContainer.appendChild(postElement);
      });
    })
    .catch((error) => {
      console.error("Error fetching posts:", error);
    });

  function createPostElement(post) {
    const postElement = document.createElement("div");
    postElement.className = "post mb-3";
    postElement.innerHTML = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${post.username}</h5>
          <p class="card-text">${post.text}</p>
          <p class="card-text"><small class="text-muted">${new Date(
            post.createdAt
          ).toLocaleString()}</small></p>
          <button class="btn btn-primary like-button" data-post-id="${
            post.id
          }">Like</button>
        </div>
      </div>
    `;

    // Attach event listener for like button
    const likeButton = postElement.querySelector(".like-button");
    likeButton.addEventListener("click", function () {
      likePost(post.id);
    });

    return postElement;
  }

  function likePost(postId) {
    fetch(`${apiBaseURL}/api/posts/${postId}/like`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${loginData.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Update UI to reflect like (if needed)
      })
      .catch((error) => {
        console.error("Error liking post:", error);
      });
  }
});
