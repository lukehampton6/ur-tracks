async function signupFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector("#username-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (username && email && password) {
    const response = await fetch("/api/users/signup", {
      method: "post",
      body: JSON.stringify({
        user_email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      console.log("success");
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector("#signup-button")
  .addEventListener("click", signupFormHandler);

async function loginFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();
  console.log(email, password);
  var user_email = email;
  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "post",
      body: JSON.stringify({
        user_email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector("#login-button")
  .addEventListener("click", loginFormHandler);
