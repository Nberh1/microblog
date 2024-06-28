"use strict";

const baseURL = "http://microbloglite.us-east-2.elasticbeanstalk.com";

const loginData = getLoginData();
async function loadProfile() {
  const userResponse = await fetch(
    `${baseURL}/api/users/${loginData.username}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${loginData.token}`,
        "Content-Type": "application/json",
      },
    }
  );

  const userData = await userResponse.json();

  displayProfile(userData);
}

function displayProfile(userData) {
  const usernameElement = document.querySelector("#username");
  const fullnameElement = document.querySelector("#fullname");
  const bioElement = document.querySelector("#bio");
  usernameElement.textContent = `Username: ${userData.username}`;
  fullnameElement.textContent = `Full Name: ${userData.fullName || ""}`;
  bioElement.textContent = `Bio: ${userData.Bio || ""}`;
}

loadProfile()

// Function to enable bio editing
function editBio() {
  // Hide current bio paragraph
  document.getElementById('bio').style.display = 'none';
  
  // Show bio edit section
  document.getElementById('bioEditSection').style.display = 'block';
  
  // Populate textarea with current bio text
  document.getElementById('newBio').value = document.getElementById('bio').innerText.trim();
}

// Function to save edited bio
function saveBio() {
  // Get new bio text from textarea
  var newBioText = document.getElementById('newBio').value;
  
  // Update bio paragraph with new text
  document.getElementById('bio').innerText = newBioText;
  
  // Hide bio edit section
  document.getElementById('bioEditSection').style.display = 'none';
  
  // Show updated bio paragraph
  document.getElementById('bio').style.display = 'block';
}

// Function to cancel bio edit
function cancelEdit() {
  // Hide bio edit section
  document.getElementById('bioEditSection').style.display = 'none';
  
  // Show current bio paragraph
  document.getElementById('bio').style.display = 'block';
}

