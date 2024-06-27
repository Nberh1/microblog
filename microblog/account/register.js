document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("signup-form");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    // Validate form fields here
    const username = document.getElementById("username").value;
    const fullName = document.getElementById("fullName").value;
    const password = document.getElementById("password").value;

    if (
      username.trim() === "" ||
      fullName.trim() === "" ||
      password.trim() === ""
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    // If validation passes, submit the form
    saveNewData(username, fullName, password);
  });

  function saveNewData(username, fullName, password) {
    const newUser = {
      username: username,
      fullName: fullName,
      password: password,
    };

    const requestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    };

    fetch(
      "http://microbloglite.us-east-2.elasticbeanstalk.com/api/users",
      requestInit
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        // Handle success scenario here (e.g., show a success message)
        alert("Registration successful!");
        form.reset(); // Clear the form after successful registration
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error scenario here (e.g., show an error message)
        alert("Registration failed. Please try again later.");
      });
  }
});
