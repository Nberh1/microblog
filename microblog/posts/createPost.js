"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const createPostForm = document.getElementById("createPostForm");
  const logoutButton = document.getElementById("logoutButton");

  logoutButton.addEventListener("click", function () {
    logout();
  });

  const loginData = getLoginData();

  createPostForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const postContent = document.getElementById("postContent").value;

    const postData = {
      text: postContent,
    };

    fetch(`${apiBaseURL}/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loginData.token}`,
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Post created successfully!");
        window.location.assign("posts.html"); // redirect to posts page
      })
      .catch((error) => console.error("Error creating post:", error));
  });
});

function logout() {
  fetch(`${apiBaseURL}/auth/logout`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      window.localStorage.removeItem("login-data"); // remove login data from LocalStorage
      window.location.assign("../index.html"); // redirect back to landing page
    })
    .catch((error) => console.error("Error logging out:", error));
}
