   "use strict";
   document.addEventListener("DOMContentLoaded", () => {
     const registerButton = document.querySelector("#registerButton");

     registerButton.addEventListener("click", (event) => {
       event.preventDefault();

       let usernameCreated = document.querySelector("#username").value;
       let passwordCreated = document.querySelector("#password").value;
       let fullNameCreated = document.querySelector("#fullName").value;

       if (!usernameCreated || !passwordCreated || !fullNameCreated) {
         alert("All fields are required.");
         return;
       }

       let createNewUser = {
         fullName: fullNameCreated,
         username: usernameCreated,
         password: passwordCreated,
       };

       let requestInit = {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(createNewUser),
       };

       function saveNewData() {
         fetch(
           "http://microbloglite.us-east-2.elasticbeanstalk.com/api/users",
           requestInit
         )
           .then((response) => {
             if (response.ok) {
               window.location.href = "login.html";
             } else {
               return response.json().then((data) => {
                 throw new Error(data.message || "Registration failed");
               });
             }
           })
           .catch((error) => {
             alert("Registration failed: " + error.message);
           });
       }

       saveNewData();
     });
   });