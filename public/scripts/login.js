document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#login-form");
  const loginError = document.querySelector("#login-error");

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    loginError.classList.add("hide");

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const result = await fetchAPI("auth/login", "POST", {
      name: username,
      password: password,
    });

    if (result.ok) {
      window.location.href = "/mypage";
    } else {
      loginError.classList.remove("hide");
    }
  });
});
